import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Users} from "../../users";
import {OffreData, OffreService} from "../offre.service";
import {UserService} from "../../user.service";
import {UserAuthService} from "../../user-auth.service";



@Component({
  selector: 'app-offrelist',
  templateUrl: './offrelist.component.html',
  styleUrls: ['./offrelist.component.css']
})
export class OffrelistComponent implements OnInit {
  public offreData: OffreData[] = [];
  public selectedOffre!: OffreData;
  public email!: string;
  public user!: Users;
  public useridoffre: number = 0;
public iscreateur!: boolean ;
  public isAdmin!: boolean ;

  constructor(
    private offreService: OffreService,
    private userService: UserService,
    private router: Router,
private userauthserv: UserAuthService

  ) {}

  ngOnInit(): void {
    this.isAdmin=this.userauthserv.isAdmin();
this.iscreateur=this.userauthserv.isCreator();
    this.email = localStorage.getItem('email')!;
    if (this.email) {
      this.userService.getuserbymail(this.email).subscribe(
        (response: Users) => {
          this.user = response;
          this.useridoffre = this.user.id;
          if (response.role === "ADMIN") {
            this.getAllOffers(); // Fetch all offers for admin
          } else if (response.role === "CREATOR") {
            this.getOffresByCreatorId(localStorage.getItem('id')!);}
          else {
            this.getOffresByUserId(localStorage.getItem('id')!);}

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

  public getAllOffers(): void {
    this.offreService.getOffre().subscribe(
      (response: OffreData[]) => {
        this.offreData = response;
        console.log('All offers:', this.offreData);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching all offers:', error);
        alert('Error fetching all offers. Please try again.');
      }
    );
  }
  public getOffresByUserId(userId: string): void {
    this.offreService.getOffreByUserIdOffre(userId).subscribe(
      (response: OffreData[]) => {
        this.offreData = response;
        console.log(this.offreData)
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching offers:', error);
        alert('Error fetching offers. Please try again.');
      }
    );
  }
  public getOffresByCreatorId(idcreateur: string): void {
    this.offreService.getOffreBycreatorid(idcreateur).subscribe(
      (response: OffreData[]) => {
        this.offreData = response;
        console.log(this.offreData)
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

  detailsOffre(idoffre: number) {
    console.log(idoffre);
    this.router.navigate(['/offredetails', idoffre]);
  }
  EvOffre(idoffre: number) {
    console.log(idoffre);
    this.router.navigate(['/evaluation', idoffre]);
  }
}

