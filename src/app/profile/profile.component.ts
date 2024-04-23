import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userProfile: any;
  selectedFile: File | null = null;


  constructor(private route: ActivatedRoute,private profileService: ProfileService,private toastr: ToastrService, private sanitizer: DomSanitizer) {
  }

   ngOnInit() {

    this.profileService.getUserProfile().subscribe(
      (profile: any) => {
        this.userProfile = profile;
        localStorage.setItem("idUser", profile.id);

      },
      (error: any) => {
        console.error('Error fetching user profile:', error);
      }
    );

  }

  onImageSelected(event: any) {
      this.selectedFile = event.target.files[0] as File;
      if (!this.selectedFile) {
        console.log('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      this.profileService.updateUserProfileImage(formData).subscribe(
        (updatedProfile: any) => {
          console.log('Profile updated successfully:', updatedProfile);
          this.toastr.success('', 'Profile updated successfully !');
          // Optionally, update the userProfile object with the updatedProfile
          this.userProfile = updatedProfile;
        },
        (error: any) => {
          console.error('Error updating user profile:', error);
        }
      );


  }
  editProfile() {
    const updateProfileDetails = {
      id : this.userProfile.id,
      firstName: this.userProfile.firstName,
      lastName: this.userProfile.lastName,
      email: this.userProfile.email,
      phoneNumber: this.userProfile.phoneNumber,
      birthday: this.userProfile.birthday,
      role: this.userProfile.role,
      profileImage:this.userProfile.profileImage
    };

    this.profileService.updateUserProfile(updateProfileDetails).subscribe(
      (updatedProfile: any) => {
        console.log('Profile updated successfully:', updatedProfile);
        this.toastr.success('', 'Profile updated successfully !');
        // Optionally, update the userProfile object with the updatedProfile
        this.userProfile = updatedProfile;
      },
      (error: any) => {
        console.error('Error updating user profile:', error);
      }
    );

  }
}
