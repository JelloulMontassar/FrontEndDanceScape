  import {Component, OnDestroy, OnInit} from '@angular/core';
  import { UserService } from '../services/user.service';
  import { User, Role } from '../models/User.model';
  import { ActivatedRoute, Router } from '@angular/router';
  import { RoleToStringPipe } from '../role-to-string.pipe';

  import {Subject} from "rxjs";


  @Component({
    selector: 'app-list-user',
    templateUrl: './list-user.component.html',
    styleUrls: ['./list-user.component.scss']
  })
  export class ListUserComponent implements OnInit , OnDestroy{
    dtOptions: DataTables.Settings = {};
    dtTrigger: Subject<any> = new Subject<any>();
    users: User[] = [];
    displayedColumns: string[] = ['firstName', 'lastName', 'birthday', 'email', 'role', 'status'];
    userId: number | undefined;

    constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
    }


    ngOnInit(): void {
      this.dtOptions = {
        pagingType: 'full_numbers',
        lengthMenu:[2]
      };
      this.getAll();
    }

    getAll(): void {
      this.userService.getall().subscribe(
        (users) => {
          this.users = users;
          this.dtTrigger.next(null);
        },
        (error) => {
          console.log(error);
        }
      );
    }


    viewUserDetails(userId: number | null | undefined): void {
      if (userId !== undefined && userId !== null) {
        this.userService.getByUserId(userId).subscribe(
          (user) => {
            // Navigate to a route where you can display the user details in a form
            this.router.navigate(['admin/update-user', userId]);
          },
          (error) => {
            console.log(error);
          }
        );
      }
    }


    deleteUser(userId: number | null | undefined): void {
      if (userId !== undefined && userId !== null) {

        this.userService.deletUser(userId).subscribe(
          () => this.getAll()
        );
      }
    };

    ngOnDestroy(): void {
      this.dtTrigger.unsubscribe();
    }
  }




