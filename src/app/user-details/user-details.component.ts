import {Component, OnInit} from '@angular/core';
import {Role, User} from "../models/User.model";
import {UserService} from "../services/user.service";
import { ActivatedRoute, Router } from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {ProfileDto} from "../models/profile-dto.model";
import {Observable} from "rxjs";
import {HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;

  constructor(private userService: UserService, private toastr: ToastrService,private route: ActivatedRoute, private router: Router) {}

  deleteUser(userId: number | null | undefined): void {
    if (userId !== undefined && userId !== null) {

      this.userService.deletUser(userId).subscribe(()=>
        this.router.navigate(['admin/list-users'])
      );
    }
  };
  editProfile(userId: number | null | undefined) {
    if (userId !== undefined && userId !== null) {
      const updateUserProfileDetails: User = {
        firstName: this.user?.firstName || '',
        lastName: this.user?.lastName || '',
        password: this.user?.password || '', // Assuming password is a string
        email: this.user?.email || '',
        phoneNumber: this.user?.phoneNumber || -1, // Assuming phoneNumber is a number
        birthday: this.user?.birthday || new Date(), // Assuming birthday is a Date object
        role: this.user?.role || Role.USER, // Assuming role is of type Role
        profileImage: this.user?.profileImage || null, // Assuming profileImage is a Blob
        enabled: this.user?.enabled || false, // Assuming enabled is a boolean
      };

      this.userService.updateUser(userId,updateUserProfileDetails).subscribe(
        (updatedProfile: any) => {
          console.log('Profile updated successfully:', updatedProfile);
          this.toastr.success('', 'Profile updated successfully !');
          // Optionally, update the userProfile object with the updatedProfile
          this.user = updatedProfile;
        },
        (error: any) => {
          console.error('Error updating user profile:', error);
        }
      );
    }

  }
  ngOnInit(): void {
    const userId = this.route.snapshot.params['userId'];
    console.log(userId);
    this.userService.getByUserId(userId).subscribe(
      (user) => {
        this.user = user;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
