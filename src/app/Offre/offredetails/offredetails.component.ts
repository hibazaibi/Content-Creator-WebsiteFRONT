import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Users} from "../../users";
import {OffreService} from "../offre.service";
import {UserService} from "../../user.service";

interface OffreData {
  description: String;
  budget: number;
  OffreStatus: String;
  useridoffre: String;
  idcreateur: number;
  Deadline: Date;
  collaborationDetails: String;
  specialRequests: String;
}

@Component({
  selector: 'app-offredetails',
  templateUrl: './offredetails.component.html',
  styleUrls: ['./offredetails.component.css']
})
export class OffredetailsComponent implements OnInit {
  public offreData: OffreData[] = []; // List of offers for the logged-in creator
  public selectedOffre!: OffreData; // Selected offer for deletion or update
  public email!: string; // Email of the logged-in user
  public user!: Users; // Logged-in user details
  public useridoffre: number = 0; // ID of the creator logged in

  constructor(
    private offreService: OffreService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get email from localStorage and fetch user details
    this.email = localStorage.getItem('email')!;
    if (this.email) {
      this.userService.getuserbymail(this.email).subscribe(
        (response: Users) => {
          this.user = response;
          this.useridoffre = this.user.id; // Set creator ID
          this.getOffresByCreatorId(this.useridoffre); // Fetch offers for the creator
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to fetch user details:', error);
          alert('Error fetching user details. Please try again.');
        }
      );
    } else {
      alert('No email found in local storage. Please log in.');
      this.router.navigate(['/login']); // Redirect to login if email is not found
    }
  }

  // Fetch offers by creator ID
  public getOffresByCreatorId(useridoffre: number): void {
    this.offreService.getOffreByUserIdOffre(useridoffre).subscribe(
      (response: OffreData[]) => {
        this.offreData = response;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching offers:', error);
        alert('Error fetching offers. Please try again.');
      }
    );
  }

  // Delete an offer
  public deleteOffre(idoffre: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette offre?')) {
      this.offreService.deleteOffre(idoffre).subscribe(
        () => {
          alert('Offre supprimée avec succès.');
          this.offreData = this.offreData.filter(offre => offre.idcreateur !== idoffre); // Update local list
        },
        (error: HttpErrorResponse) => {
          console.error('Error deleting offer:', error);
          alert('Failed to delete offer. Please try again.');
        }
      );
    }
  }

  // Navigate to update offer page
  public updateOffre(idoffre: number): void {
    this.router.navigate(['/updateautre', idoffre]);
  }
}

