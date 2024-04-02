import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {CResetPasswordResponse,CResetPasswordRequest} from "../models/cReset.model";
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-confirmforgotpassword',
  templateUrl: './confirmforgotpassword.component.html',
  styleUrls: ['./confirmforgotpassword.component.scss']
})
export class ConfirmforgotpasswordComponent implements OnInit{
  credentials = { email: '',resetToken:''};
  errorMessage: string = '';
  user: any;

  constructor(private authService: AuthService,
              private router: Router,private toastr: ToastrService,private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    const jwtToken=this.route.snapshot.params['resetToken'];
    const helper = new JwtHelperService();
    if(!helper.isTokenExpired(jwtToken)) {
      localStorage.setItem('resetToken', jwtToken);
    }

    const storedToken=localStorage.getItem('resetToken')
    if (jwtToken) {
      const decodedToken = helper.decodeToken(jwtToken);
      this.credentials.email = decodedToken.sub;
      this.credentials.resetToken = decodedToken.resetToken;
    } else if(storedToken) {
      const decodedToken = helper.decodeToken(storedToken);
      this.credentials.email = decodedToken.sub;
      this.credentials.resetToken = decodedToken.resetToken;
    }

    this.router.navigate(["/forgot-password/confirm"], {
      relativeTo: this.route,
      replaceUrl: true
    }).then(() => {
      console.log('Navigation completed.');
    }).catch(err => {
      console.error('Navigation error:', err);
    });
  }
  onSubmit(): void {
    const cResetPasswordRequest: CResetPasswordRequest = {
      resetToken : this.credentials.resetToken,
      email: this.credentials.email
    };
    this.authService.CforgetPassword(cResetPasswordRequest).subscribe(
      (user) => {
        this.toastr.success('', 'Password updated successfully !');
      },
      (error) => {
        console.log(error);
      }
    );


  }
}
