import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, Role } from '../models/User.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
private url = 'http://localhost:8088'
  constructor(private http:HttpClient) { }
  Register(user:User):Observable<User>{
    console.log(user.profileImage);
    return this.http.post<User>(`${this.url}/signUp/register`,user)
  }

  getall():Observable<User[]>{
    return this.http.get<User[]>(`${this.url}/admin/getAllUsers`)
  }

  getByUserId(userId:number):Observable<User>{
    return this.http.get<User>(`${this.url}/admin/getUserById/${userId}`)
  }

  deletUser(userId:number):Observable<void>{

    return this.http.delete<void>(`${this.url}/admin/deleteUser/${userId}`);
  }
  updateUser(userId: number, updateUser: User): Observable<User> {
    return this.http.put<User>(`${this.url}/admin/updateUser/${userId}`, updateUser);
  }

}
