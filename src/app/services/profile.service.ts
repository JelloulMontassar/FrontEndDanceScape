// profile.service.ts
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProfileDto } from '../models/profile-dto.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8088/profile';
  private baseUrl1 = 'http://localhost:8088/user';
  private token = localStorage.getItem("token");

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<ProfileDto> {
    console.log(this.token)
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.get<ProfileDto>(`${this.baseUrl}/getProfile`, { headers });
  }
  updateUserProfileImage(formData:FormData){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.post<any>(`${this.baseUrl}/upload-image`,formData, { headers });
  }
  updateUserProfile(Profile : ProfileDto): Observable<ProfileDto> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.put<any>(`${this.baseUrl}/updateProfile`,Profile, { headers });
  }

  getOnlineUsers() {
    return this.http.get<any>(`${this.baseUrl1}/onlineUsers`);
  }
}

