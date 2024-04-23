import {Component, OnInit} from '@angular/core';
import { AuthService } from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import { AuthenticationRequest } from "../models/auth.model";
import { NgForm } from "@angular/forms";
import { JWT_OPTIONS, JwtHelperService } from "@auth0/angular-jwt";
import {ProfileService} from "../services/profile.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [{ provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService]
})
export class LoginComponent implements OnInit{
  credentials = { email: '', password: '' };
  errorMessage: string = '';
  user: any;

  constructor(private authService: AuthService,
              private jwtHelper: JwtHelperService,
    private router: Router,private route: ActivatedRoute,private http: HttpClient) { }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const token = params.get('token');
      console.log(token)
      if (token) {
        localStorage.setItem('token', token);
      }
    });
    const storedToken = localStorage.getItem('token');
    const helper = new JwtHelperService();

    if (storedToken && !helper.isTokenExpired(storedToken)) {
      this.router.navigate(["/DanceScape/profile"], {
        relativeTo: this.route,
        replaceUrl: true
      }).then(() => {
        console.log('Navigation completed.');
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    }
  }
  onSubmit(): void {
    const authenticationRequest: AuthenticationRequest = {
      email: this.credentials.email,
      password: this.credentials.password
    };
    this.authService.authenticate(authenticationRequest).subscribe(
      (response: any) => {
        // Handle successful authentication
        // For example, store token and role in local storage
        localStorage.setItem('token', response.token);

        const decodedToken = this.jwtHelper.decodeToken(response.token);
        localStorage.setItem('tokenDetails', JSON.stringify(decodedToken));


        console.log('token details ', this.jwtHelper.decodeToken(response.token))



        if (response.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/DanceScape/profile']);
        }
      },
      (error) => {
        console.error('Authentication error:', error);
        if (error && error.error && error.error.messageResponse) {
          this.errorMessage = error.error.messageResponse;
        } else {
          this.errorMessage = 'An error occurred during authentication';
        }
      }
    );
  }


}
