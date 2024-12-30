import { Component, OnInit } from '@angular/core';
import {evaluation, EvaluationService} from "./evaluation.service";
import {NgForm} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.css']
})
export class EvaluationComponent implements OnInit {
  private idoffre: any;
  stars: number[] = [1, 2, 3, 4, 5]; // Array for 5 stars
  currentRating: number = 0; // Holds the selected rating

  constructor(
    private evaluationService: EvaluationService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idoffre = this.route.snapshot.params['id'];
  }

  // Method to set the selected star rating
  setRating(rating: number): void {
    this.currentRating = rating;
  }

  // Submit the evaluation with the selected star rating and feedback
  submitEvaluation(evaluationForm: NgForm): void {
    if (this.currentRating === 0) {
      alert('Please select a rating before submitting.');
      return;
    }

    const evaluation1: evaluation = {
      rating: this.currentRating, // Use the star rating
      feedback: evaluationForm.value.feedback,
    };

    this.evaluationService.addEvaluation(this.idoffre, evaluation1).subscribe((response: any) => {
        console.log('Evaluation submitted successfully:', response);
        alert('Your evaluation has been successfully submitted!');
        this.gotolist();

      },
        (error) => {
          console.error('Error submitting evaluation:', error);
          alert('An error occurred while submitting your evaluation.');
          this.gotolist();

        }
    );
  }
  gotolist() {
    this.router.navigate(['/offrelist']);
  }
}
