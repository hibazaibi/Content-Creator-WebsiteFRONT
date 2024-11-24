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
  public offreData: OffreData[] = [];
  public selectedOffre!: OffreData;
  public email!: string;
  public user!: Users;
  public useridoffre: number = 0;

  constructor(
    private offreService: OffreService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.email = localStorage.getItem('email')!;
    if (this.email) {
      this.userService.getuserbymail(this.email).subscribe(
        (response: Users) => {
          this.user = response;
          this.useridoffre = this.user.id;
          this.getOffresByCreatorId(this.useridoffre);
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to fetch user details:', error);
          alert('Error fetching user details. Please try again.');
        }
      );
    } else {
      alert('No email found in local storage. Please log in.');
      this.router.navigate(['/login']);
    }
  }

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

  public updateOffre(idoffre: number): void {
    this.router.navigate(['/updateautre', idoffre]);
  }
}

