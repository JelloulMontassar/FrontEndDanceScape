import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Relationship } from '../models/Relationship.model';

@Injectable({
  providedIn: 'root'
})
export class RelationshipService {
  private baseUrl = 'http://localhost:8088/relationships';

  constructor(private http: HttpClient) {}

  getPendingFriendRequests(receiverId: string | undefined): Observable<Relationship[]> {
    return this.http.get<Relationship[]>(`${this.baseUrl}/pending/${receiverId}`);
  }

  acceptFriendRequest(request: number,sender:number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/accept/${sender}/${request}`, null);
  }
}
