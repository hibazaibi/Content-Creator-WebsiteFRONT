import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "../../offre.service";
import {UserAuthService} from "../../../user-auth.service";

@Component({
  selector: 'app-offredetails',
  templateUrl: './offredetails.component.html',
  styleUrls: ['./offredetails.component.css']
})
export class OffredetailsComponent implements OnInit {
  offerId!: number;
  offerDetails: any = {};
  errorMessage = '';
  public isLoading: boolean = true; // Loading state
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offreService: OffreService,
    public userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')!;
    this.loadOfferDetails();
  }

  loadOfferDetails() {
    this.offreService.getOffreById(this.offerId).subscribe({
      next: (data) => {
        this.offerDetails = data;
        console.log(data);
      },
      error: (err) => {
        this.errorMessage = 'Error loading offer details. Please try again.';
        console.error(err);
      },
    });
  }
  doneoffre() {
    this.isLoading = true; // Start loading
    this.offreService.done(this.offerId).subscribe({
      next: () => {
        alert('Offer Completed Successfully. !');
        this.gotolist();

        this.isLoading = false; // End loading
      },
      error: (err) => {
        alert('Failed to accept offer. Please try again.');
        this.gotolist();

        console.error(err);
        this.isLoading = false; // End loading on error
      },
    });
  }
  acceptOffer() {
    this.offreService.acceptOffer(this.offerId).subscribe({
      next: () => {
        alert('Offer accepted successfully!');
        this.gotolist();

      },
      error: (err) => {
        alert('Offer accepted successfully!');
        this.gotolist();

        console.error(err);
      },
    });
  }

  declineOffer() {
    this.offreService.declineOffer(this.offerId).subscribe({
      next: () => {
        alert('Offer declined successfully!');
        this.gotolist();

      },
      error: (err) => {
        alert('Offer declined successfully!');
        console.error(err);
      },
    });
  }
  gotolist() {
    this.router.navigate(['/offrelist']);
  }
  saveChanges() {
    this.isLoading = true;
    this.offreService.updateOffre(this.offerId, this.offerDetails).subscribe({
      next: () => {
        alert('Offer updated successfully!');
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Update error:', err);
        alert('Failed to update the offer. Please check the console for more details.');
        this.isLoading = false;
      },
    });


  }}
