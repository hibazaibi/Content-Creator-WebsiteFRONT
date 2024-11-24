import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
interface Users2{
  id:number;
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
  role: string; // Match the `Role` enum in your backend
  image?: File; // Optional if not always sent
  imageid:string;
  filetype:string;
}
@Component({
  selector: 'app-detailsuser',
  templateUrl: './detailsuser.component.html',
  styleUrls: ['./detailsuser.component.css']
})
export class DetailsuserComponent implements OnInit {
  user3: Users2 | null = null;  // Declare user3 as either Users2 or null
  imageUrl: string | null = null;  // For storing the image URL
  useridtoupdate!: number;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Get the user ID from the route params
    this.useridtoupdate = this.route.snapshot.params['id'];

    // Fetch user details by ID
    this.userService.getuserdetailsbyid(this.useridtoupdate).subscribe({
      next: (data) => {
        console.log("User Details by ID:", data);

        // Fetch user by email
        this.userService.getuserbymail2(data.email).subscribe({
          next: (userData) => {
            console.log("Fetched user by email:", userData);

            // Assign userData to user3 and handle image fetching
            this.user3 = userData;

            if (this.user3?.imageid) {
              // If user has an image, fetch it
              this.imageUrl = `data:${this.user3.filetype};base64,`;
              this.userService.getImage(this.user3.imageid).subscribe((imageData) => {
                const byteArray = Array.from(new Uint8Array(imageData));
                this.imageUrl += btoa(
                  byteArray.reduce((data, byte) => data + String.fromCharCode(byte), '')
                );
              });
            } else {
              console.warn("No image available for user.");
            }
          },
          error: (error) => {
            console.error("Error fetching user by email:", error);
            this.user3 = null; // Set user3 to null if there's an error
          },
        });
      },
      error: (error) => {
        console.error("Error fetching user by ID:", error);
        this.user3 = null; // Set user3 to null if there's an error
      },
    });
  }
}

