import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-logout',
  template: ''
})
export class LogoutComponent {

  constructor(private authService: AuthService, private router: Router,private route: ActivatedRoute) {
    this.logout();
  }

  async logout() {
    this.authService.logout().subscribe();
    localStorage.clear();
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
