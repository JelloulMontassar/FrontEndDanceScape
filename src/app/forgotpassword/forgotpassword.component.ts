import { Component } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ProfileService} from "../services/profile.service";
import {AuthenticationRequest} from "../models/auth.model";
import {ResetPasswordRequest} from "../models/reset.model";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent {
  credentials = { email: ''};
  errorMessage: string = '';
  user: any;

  constructor(private authService: AuthService,
              private router: Router,private toastr: ToastrService,
              ) { }

  onSubmit(): void {
    const resetPasswordRequest: ResetPasswordRequest = {
      email: this.credentials.email
    };
    this.authService.forgetPassword(resetPasswordRequest).subscribe(
      (user) => {
        this.toastr.success('', 'Password updated successfully !');
      },
      (error) => {
        console.log(error);
      }
    );


  }
}
