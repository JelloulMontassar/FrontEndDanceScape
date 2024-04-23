import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../services/auth.service";
import {WebSocketService} from "../../services/WebSocketService";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  profileId : string;
  notifications: any ;

  constructor(private toastr: ToastrService,private webSocketService: WebSocketService,private authService: AuthService,private router: Router,private route: ActivatedRoute) {
    this.profileId = localStorage.getItem("idUser") as string;
  }
  ngOnInit(): void {
    const storedToken = localStorage.getItem('token');
    const helper = new JwtHelperService();

    if (storedToken && !helper.isTokenExpired(storedToken)) {
      //
    } else {
      this.logout();
    }
    this.webSocketService.connect2(this.profileId)
    this.webSocketService.getUserNotifications().subscribe((message: any) => {
      this.notifications=message;
      console.log(message);
      this.toastr.info(this.notifications.message+" On "+this.notifications?.sendDate, this.notifications.status);


    });
  }

  async logout() {
    this.authService.logout().subscribe(response =>
      console.log(response)
    )
    this.router.navigate(["/login"], {
      relativeTo: this.route,
      replaceUrl: true
    }).then(() => {
      console.log('Navigation completed.');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }

}
