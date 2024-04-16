import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ProfileService} from "../services/profile.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-reclamation',
  templateUrl: './create-reclamation.component.html',
  styleUrls: ['./create-reclamation.component.scss']
})
export class CreateReclamationComponent implements OnInit{
  reclamation: any = {};
  userProfile: any;

  constructor(private toastr: ToastrService,private profileService: ProfileService,private http: HttpClient) { }
  ngOnInit(): void {
    this.profileService.getUserProfile().subscribe(
      (profile: any) => {
        this.userProfile = profile;
        localStorage.setItem("idUser",profile.id)

      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
  submitReclamation() {
    this.reclamation.reclamationDate = new Date().toISOString().split('T')[0];

    this.http.post<any>(`http://localhost:8088/reclamations/${this.userProfile.id}`, this.reclamation).subscribe(response => {
      console.log('Reclamation created:', response);
      this.toastr.success("Reclamation Sent Successfully");

    }, error => {
      console.error('Error creating reclamation:', error);
    });
  }
}
