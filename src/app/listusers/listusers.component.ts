
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Users } from '../users';
import { UserService } from '../user.service';
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {UserAuthService} from "../user-auth.service";

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {
  public users: Users[] = [];
  public filteredUsers: Users[] = [];
  public searchKey: string = '';
  public isadmin: boolean = false;
  constructor(
    private userService: UserService,
    private router: Router,private sanitizer: DomSanitizer ,
    private userAuthService: UserAuthService,

  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  public getAllUsers(): void {
    this.userService.getAllUsers().subscribe(
      (response: Users[]) => {
        this.users = response;
        this.filteredUsers = response;
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
      (response) => {
        console.log('Backend response:', response);
        alert('User activated successfully');
        this.getAllUsers();
      },
      (error: HttpErrorResponse) => {
        console.error('Error activating user:', error.message);
      }
    );
  }

  public applySearch(): void {
    const lowerKey = this.searchKey.toLowerCase();
    this.filteredUsers = this.users.filter(
      user =>
        user.nom.toLowerCase().includes(lowerKey) ||
        user.prenom.toLowerCase().includes(lowerKey) ||
        user.email.toLowerCase().includes(lowerKey)
    );
  }
  getImageUrl(user: Users): SafeUrl | null {
    if (user.image) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:${user.image.fileType};base64,${user.image.data}`);
    }
    return null;
  }
}


