import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Users} from "../../users";
import {OffreData, OffreService} from "../offre.service";
import {UserService} from "../../user.service";



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

  constructor(
    private offreService: OffreService,
    private userService: UserService,
    private router: Router,


  ) {}

  ngOnInit(): void {

    this.email = localStorage.getItem('email')!;
    if (this.email) {
      this.userService.getuserbymail(this.email).subscribe(
        (response: Users) => {
          this.user = response;
          this.useridoffre = this.user.id;
          this.getOffresByCreatorId(localStorage.getItem('id')!);
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

  public getOffresByCreatorId(useridoffre: string): void {
    this.offreService.getOffreBycreatorid(useridoffre).subscribe(
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

  public detailsOffre(idoffre: number): void {
    this.router.navigate(['/offredetails', idoffre]);
  }
}

