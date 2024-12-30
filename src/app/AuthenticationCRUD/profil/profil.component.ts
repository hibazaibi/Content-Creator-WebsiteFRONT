import { Component, OnInit } from '@angular/core';
import {Users} from "../../users";
import {UserAuthService} from "../../user-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user3!: Users;
  public userFile: any = File;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const iduser = localStorage.getItem('id');
    if (iduser) {
      this.fetchUserDetails(iduser);
    }
  }

  private fetchUserDetails(id: string): void {
    this.userService.getuserdetailsbyid(Number(id)).subscribe(
      (data: Users) => {
        this.user3=data ;
      },
      (error: HttpErrorResponse) => {
        console.error("Error fetching user2 details:", error.message);
      }
    );


  }

  getImageUrl(user: Users): SafeUrl | null {
    if (user.image) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:${user.image.fileType};base64,${user.image.data}`);
    }
    return null;
  }

  updateUser(): void {
    this.user3.image2=this.userFile
    this.userService.updateuserr(this.user3.id, this.user3).subscribe(
      () => {
        console.log(this.user3);
        alert("Profile updated successfully.");
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        console.error("Error updating user:", error.message);
      }
    );
  }
  onSelectFile(event: any) {
    this.userFile = event.target.files[0];
    console.log(this.userFile);
  }
}
