import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "../../offre.service";

@Component({
  selector: 'app-offredetails',
  templateUrl: './offredetails.component.html',
  styleUrls: ['./offredetails.component.css']
})
export class OffredetailsComponent implements OnInit {
  offerId!: number;
  offerDetails: any = {};
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private offreService: OffreService
  ) {}

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')!;
    this.loadOfferDetails();
  }

  loadOfferDetails() {
    this.offreService.getOffreById(this.offerId).subscribe({
      next: (data) => {
        this.offerDetails = data;
      },
      error: (err) => {
        this.errorMessage = 'Error loading offer details. Please try again.';
        console.error(err);
      },
    });
  }

  acceptOffer() {
    this.offreService.acceptOffer(this.offerId).subscribe({
      next: () => {
        alert('Offer accepted successfully!');
        this.router.navigate(['/offrelist']); // Redirect to offers list
      },
      error: (err) => {
        alert('Failed to accept offer. Please try again.');
        console.error(err);
      },
    });
  }

  declineOffer() {
    this.offreService.declineOffer(this.offerId).subscribe({
      next: () => {
        alert('Offer declined successfully!');
        this.router.navigate(['/offrelist']); // Redirect to offers list
      },
      error: (err) => {
        alert('Failed to decline offer. Please try again.');
        console.error(err);
      },
    });
  }
}
