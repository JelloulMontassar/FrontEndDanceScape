import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {WebSocketService} from "../../services/WebSocketService";
import {Message} from "../../models/Message";
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit{
  notificationCounter: number = 0;

  userProfile: any;
  notifications: any ;
  allNotifications:any;

  constructor(private http: HttpClient,private webSocketService: WebSocketService,private profileService: ProfileService,private authService: AuthService,private router: Router,private route: ActivatedRoute,private toastr: ToastrService) {
  }
  getAllNotification(){
    this.http.get<any[]>('http://localhost:8088/admin/notifications').subscribe(allNotifications => {
      this.allNotifications = allNotifications;
      this.notificationCounter += allNotifications.length;

    });
  }
  ngOnInit(): void {
    const storedToken = localStorage.getItem('token');
    const helper = new JwtHelperService();
    const role = localStorage.getItem('tokenDetails');
    if (role){
      const tokenData = JSON.parse(role);
      if (storedToken && !helper.isTokenExpired(storedToken)&&tokenData.role==="ADMIN") {
        //
      } else {
        this.logout();
      }
      this.profileService.getUserProfile().subscribe(
        (profile: any) => {
          this.userProfile = profile;

        },
        (error: any) => {
          console.error('Error fetching user profile:', error);
        }
      );
    }
    this.getAllNotification();
    this.webSocketService.connect()
    this.webSocketService.getNotifications().subscribe((message: any) => {
      this.notifications=message;
      console.log(message);
      this.toastr.info(this.notifications.message+" On "+this.notifications?.sendDate, this.notifications.status);
      this.notificationCounter += 1;
      this.http.get<any[]>('http://localhost:8088/admin/notifications').subscribe(allNotifications => {
        this.allNotifications = allNotifications;

      });

    });
  }
  async logout() {
    this.authService.logout();
    this.router.navigate(["/login"], {
      relativeTo: this.route,
      replaceUrl: true
    }).then(() => {
      console.log('Navigation completed.');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }

  openNotification(id:string) {
    console.log(id);
    this.http.post<any[]>(`http://localhost:8088/admin/notifications/${id}`,null).subscribe()

  }
}
