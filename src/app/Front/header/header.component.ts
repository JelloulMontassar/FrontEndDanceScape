import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {JwtHelperService} from "@auth0/angular-jwt";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(private authService: AuthService,private router: Router,private route: ActivatedRoute) {
  }
  ngOnInit(): void {
    const storedToken = localStorage.getItem('token');
    const helper = new JwtHelperService();

    if (storedToken && !helper.isTokenExpired(storedToken)) {
      //
    } else {
      this.logout();
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
