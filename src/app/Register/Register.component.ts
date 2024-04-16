import {Component} from '@angular/core';
import {UserService} from '../services/user.service';
import {Role, User} from '../models/User.model';
import {JwtHelperService} from "@auth0/angular-jwt";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-Register',
  templateUrl: './Register.component.html',
  styleUrls: ['./Register.component.scss']
})
export class RegisterComponent  {
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

  constructor(private userService: UserService,
  private router: Router,private route: ActivatedRoute) {}

  ngOnInit(): void {
    const storedToken = localStorage.getItem('token');
    const helper = new JwtHelperService();

    if (storedToken && !helper.isTokenExpired(storedToken)) {
      this.router.navigate(["/DanceScape/profile"], {
        relativeTo: this.route,
        replaceUrl: true
      }).then(() => {
        console.log('Navigation completed.');
      }).catch(err => {
        console.error('Navigation error:', err);
      });
    }
  }

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
