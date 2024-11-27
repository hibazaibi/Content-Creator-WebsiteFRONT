import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
import {Users} from "../../users";
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
  user3: Users | null = null;  // Declare user3 as either Users2 or null
  imageUrl: string | null = null;  // For storing the image URL
  useridtoupdate!: number;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.useridtoupdate = this.route.snapshot.params['id'];

    this.userService.getuserdetailsbyid(this.useridtoupdate).subscribe({
      next: (data) => {
        console.log("User Details by ID:", data);
        this.user3 = data;


      },
      error: (error) => {
        console.error("Error fetching user by ID:", error);
        this.user3 = null;
      },
    });
  }
}

