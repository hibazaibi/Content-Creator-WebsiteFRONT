
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Users } from '../users';
import { UserService } from '../user.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  public users: Users[] = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: Users[]) => {
        this.users = response;
        console.log(this.users);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }


  public deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(
        () => {
          this.getAllUsers();
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting user:', error.message);
        }
      );
    }
  }

  public activateUser(id: number): void {
    this.userService.activateUser(id).subscribe(
      () => {
        alert('User activated successfully');
        this.getAllUsers();
      },
      (error: HttpErrorResponse) => {
        console.error('Error activating user:', error.message);
      }
    );
  }
}

