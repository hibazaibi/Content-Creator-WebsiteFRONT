import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Users } from "../users";
import { HttpErrorResponse } from "@angular/common/http";
import { Location } from "@angular/common";
import { UserAuthService } from "../user-auth.service";
import { UserService } from "../user.service";

interface Image {
  id: string;
  fileName: string;
  fileType: string;
  data: string;
}

interface Users2 {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  numtel: number;
  dateNaissance: Date;
  lienInsta?: string;
  lienTikTok?: string;
  categoriesContenu?: string;
  nomEntreprise?: string;
  siteWebEntreprise?: string;
  secteurActivite?: string;
  bio?: string;
  imageid: string;
  filetype: string;
  role: string;
  image?: File;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user2!: Users;
  user3!: Users2;
  imageUrl: string | undefined;
  selectedImage!: File;

  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const email = localStorage.getItem('email');
    if (email) {
      this.fetchUserDetails(email);
    }
  }

  private fetchUserDetails(email: string): void {
    this.userService.getuserbymail(email).subscribe(
      (data: Users) => {
        this.user2 = data;
      },
      (error: HttpErrorResponse) => {
        console.error("Error fetching user2 details:", error.message);
      }
    );

    this.userService.getuserbymail2(email).subscribe(
      (data: Users2) => {
        this.user3 = data;
        this.loadImage(data.imageid, data.filetype);
      },
      (error: HttpErrorResponse) => {
        console.error("Error fetching user3 details:", error.message);
      }
    );
  }


  private loadImage(imageId: string, fileType: string): void {
    this.userService.getImage(imageId).subscribe(
      (data: ArrayBuffer) => {
        const byteArray = new Uint8Array(data);
        this.imageUrl = `data:${fileType};base64,${btoa(String.fromCharCode(...byteArray))}`;
      },
      (error: HttpErrorResponse) => {
        console.error("Error loading image:", error.message);
      }
    );
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
    }
  }

  updateUser(): void {
    this.user2.image = this.selectedImage;
    this.userService.updateuserr(this.user2.id, this.user2).subscribe(
      () => {
        alert("Profile updated successfully.");
        this.ngOnInit();
      },
      (error: HttpErrorResponse) => {
        console.error("Error updating user:", error.message);
      }
    );
  }

  back(): void {
    this.location.back();
  }
}