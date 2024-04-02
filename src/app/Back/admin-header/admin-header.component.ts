import {Component, OnInit} from '@angular/core';
import {ProfileService} from "../../services/profile.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit{
  userProfile: any;
  constructor(private profileService: ProfileService,private authService: AuthService,private router: Router,private route: ActivatedRoute) {
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
}
