import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User, Role } from '../models/User.model';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User = {
    enabled: false,
    userId: null,
    firstName: '',
    lastName: '',
    birthday: '',
    email: '',
    password: '',
    phoneNumber: -1,
    role: Role.USER,
    profileImage: null
  };


  registrationSuccess = false;
  roles: Role[] = Object.values(Role);

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  register(): void {
    if (!this.user.birthday) {
      console.error('Please select a birthday.');
      return;
    }

    // Convert the string date to NgbDateStruct
    // const dateParts: string[] = this.user.birthday.split('-');
    // const formattedDate: NgbDateStruct = {
    //   year: +dateParts[0],
    //   month: +dateParts[1],
    //   day: +dateParts[2]
    // };
    //
    //
    // const formattedDateString: string = `${formattedDate.year}-${formattedDate.month}-${formattedDate.day}`;
    //
    //
    // this.user.birthday = formattedDateString;

    this.userService.Register(this.user).subscribe(
      () => {
        console.log('User added', this.user);
        this.registrationSuccess = true;
      },
      (error) => {
        console.error('Error registering user:', error);
      }
    );
  }

  resetForm(): void {
    this.user = {
      enabled: false,
      userId: null,
      firstName: '',
      lastName: '',
      birthday: '',
      email: '',
      password: '',
      phoneNumber: -1,
      role: Role.USER,
      profileImage:null

    };
  }
  selectRole(role: Role): void {
    this.user.role = role;
  }
}
