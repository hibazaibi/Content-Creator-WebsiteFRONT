import { Component, OnInit } from '@angular/core';
import {DisputeService} from "./dispute.service";

@Component({
  selector: 'app-dispute',
  templateUrl: './dispute.component.html',
  styleUrls: ['./dispute.component.css']
})
export class DisputeComponent implements OnInit {
  disputes: any[] = [];
  newDispute = {
    offerId: null,
    userId: null,
    reason: '',
    details: '',
  };

  constructor(private disputeService: DisputeService) {}

  ngOnInit(): void {
    this.loadDisputes();
  }

  loadDisputes(): void {
    this.disputeService.getAllDisputes().subscribe({
      next: (data) => {
        this.disputes = data;
      },
      error: (err) => {
        console.error('Error fetching disputes:', err);
      }
    });
  }

  createDispute(): void {
    const payload = {
      offerId: this.newDispute.offerId,
      userId: this.newDispute.userId,
      reason: this.newDispute.reason,
      details: this.newDispute.details,
    };

    console.log('Payload being sent:', payload);

    this.disputeService.createDispute(payload).subscribe({
      next: (response) => {
        alert('Dispute created successfully!');
        this.loadDisputes(); // Refresh the disputes list
        this.resetNewDisputeForm();
      },
      error: (err) => {
        console.error('Error creating dispute:', err);
        alert('Failed to create dispute. Please try again.');
      }
    });
  }

  private resetNewDisputeForm(): void {
    this.newDispute = {
      offerId: null,
      userId: null,
      reason: '',
      details: '',
    };
  }
}
