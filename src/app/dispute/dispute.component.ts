import { Component, OnInit } from '@angular/core';
import {DisputeRequest, DisputeService} from "./dispute.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthService} from "../user-auth.service";

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.css']
})
export class DisputeComponent implements OnInit {
  offerId!: number; // Offer ID from URL
  reason: string = ''; // Reason for dispute
  detailsResolution: string = ''; // Details for dispute
  public isLoading: boolean = false; // Loading state
  errorMessage = ''; // Error message

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private disputeService: DisputeService,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit(): void {
    this.offerId = +this.route.snapshot.paramMap.get('id')!; // Get offerId from URL
  }

  // Method to create a dispute
  createDispute() {
    const userId = this.getLoggedInUserId(); // Get logged-in user's ID from localStorage
    if (!userId) {
      alert('You must be logged in to create a dispute.');
      return;
    }

    // Prepare the dispute request object
    const disputeRequest: DisputeRequest = {
      offerId: this.offerId,
      userId: userId,
      raison: this.reason,
      detailsresolution: this.detailsResolution,
    };

    this.isLoading = true; // Start loading

    // Call the service to create the dispute
    this.disputeService.createDispute(disputeRequest).subscribe({
      next: (dispute) => {
        alert('Dispute created successfully!');
        this.isLoading = false; // End loading
        this.router.navigate(['/offrelist']); // Redirect to offer list (or wherever you want)
      },
      error: (err) => {
        alert('Failed to create dispute. Please try again.');
        console.error(err);
        this.isLoading = false; // End loading on error
      },
    });
  }

  // Helper function to get logged-in user ID from localStorage
  private getLoggedInUserId(): number | null {
    const userId = localStorage.getItem('id'); // Assuming the userId is saved in localStorage
    return userId ? +userId : null; // Return userId or null if not found
  }
}
