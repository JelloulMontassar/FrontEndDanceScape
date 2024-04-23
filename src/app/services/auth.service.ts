import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ResetPasswordResponse,ResetPasswordRequest} from "../models/reset.model";
import {AuthenticationRequest, AuthenticationResponse} from "../models/auth.model";
import {CResetPasswordRequest, CResetPasswordResponse} from "../models/cReset.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient) { }

  // Method to authenticate user with credentials
  authenticate(credentials: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<any>('http://localhost:8088/user/auth', credentials);
  }
  forgetPassword(credentials: ResetPasswordRequest): Observable<ResetPasswordResponse> {
    return this.http.get<any>(`http://localhost:8088/user/forgot-password/${credentials.email}`);
  }
  CforgetPassword(credentials: CResetPasswordRequest): Observable<CResetPasswordResponse> {
    return this.http.post<any>(`http://localhost:8088/user/forgot-password/`,credentials);
  }

  // Method to fetch user data after successful authentication
  getUserData(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/user/auth'); // Replace '/api/user/data' with your backend endpoint to fetch user data
  }
  logout() {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get('http://localhost:8088/user/logout', { headers });
  }
}
