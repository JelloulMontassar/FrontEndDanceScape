import {Component, OnInit} from '@angular/core';
import {Relationship} from "../models/Relationship.model";
import {RelationshipService} from "../services/RelatioshipService.service";

@Component({
  selector: 'app-pending-friend-requests',
  templateUrl: './pending-friend-requests.component.html',
  styleUrls: ['./pending-friend-requests.component.scss']
})
export class PendingFriendRequestsComponent implements OnInit {
  pendingRequests: Relationship[] = [];
  receiverId : undefined | string ;
  constructor(private relationshipService: RelationshipService) {}

  ngOnInit(): void {
    const storedId = localStorage.getItem('idUser');
    this.receiverId = storedId === null ? undefined : storedId;

    if (this.receiverId !== undefined) {
      this.fetchPendingRequests();
    }
  }

  fetchPendingRequests(): void {
    this.relationshipService.getPendingFriendRequests(this.receiverId)
      .subscribe((requests: Relationship[]) => {
        this.pendingRequests = requests;
      });
  }

  acceptRequest(receiver: number, sender: number): void {
    this.relationshipService.acceptFriendRequest(receiver,sender)
      .subscribe(value => this.fetchPendingRequests());
  }
}
