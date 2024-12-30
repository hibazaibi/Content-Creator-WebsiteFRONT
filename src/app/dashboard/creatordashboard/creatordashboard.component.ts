import { Component, OnInit } from '@angular/core';
import {Users} from "../../users";
import {DashboardService} from "../dashboard.service";
import {UserService} from "../../user.service";
import {UserAuthService} from "../../user-auth.service";
import {Router} from "@angular/router";
import {Chart, registerables} from "chart.js";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-creatordashboard',
  templateUrl: './creatordashboard.component.html',
  styleUrls: ['./creatordashboard.component.css']
})
export class CreatordashboardComponent implements OnInit {
  public totalOffers: number = 0;
  public totalEarnings: number = 0;
  public averageBudget: number = 0;
  public averageRating: number = 0;
  public feedbacks: string[] = [];
  public improvementSuggestions: string = '';
  public creatorId!: number;
  public email!: string;
  public user!: Users;
  public chart!: any;

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService,
    private userAuthService: UserAuthService,
    private router: Router
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.email = localStorage.getItem('email')!;
    if (this.email) {
      this.userService.getuserbymail(this.email).subscribe(
        (response: Users) => {
          this.user = response;
          this.creatorId = response.id;
          this.loadDashboardData();
        },
        (error: HttpErrorResponse) => {
          console.error('Failed to fetch user details:', error);
          alert('Error fetching user details. Please try again.');
          this.router.navigate(['/login']);
        }
      );
    } else {
      alert('No email found in local storage. Please log in.');
      this.router.navigate(['/login']);
    }
  }

  private loadDashboardData(): void {
    this.loadTotalOffers();
    this.loadTotalEarnings();
    this.loadAverageBudget();
    this.loadAverageRating();
    this.loadFeedback();    this.loadImprovementSuggestions();
    this.chartOffersByStatus();
  }

  private loadTotalOffers(): void {
    this.dashboardService.getTotalOffersForCreator(this.creatorId).subscribe(
      (data: number) => {
        this.totalOffers = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching total offers:', error);
        alert('An unexpected error occurred while fetching total offers. Please try again.');
      }
    );
  }

  private loadTotalEarnings(): void {
    this.dashboardService.getTotalEarningsForCreator(this.creatorId).subscribe(
      (data: number) => {
        this.totalEarnings = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching total earnings:', error);
        alert('An unexpected error occurred while fetching total earnings. Please try again.');
      }
    );
  }

  private loadAverageBudget(): void {
    this.dashboardService.getAverageBudgetForCreator(this.creatorId).subscribe(
      (data: number) => {
        this.averageBudget = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching average budget:', error);
        alert('An unexpected error occurred while fetching the average budget. Please try again.');
      }
    );
  }

  private loadAverageRating(): void {
    this.dashboardService.getCreatorAverageRating(this.creatorId).subscribe(
      (data: number) => {
        this.averageRating = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching average rating:', error);
        alert('An unexpected error occurred while fetching the average rating. Please try again.');
      }
    );
  }

  private loadFeedback(): void {
    this.dashboardService.getFeedbackForCreator(this.creatorId).subscribe(
      (data: string[]) => {  // Expecting an array of feedback strings
        this.feedbacks = data;  // Set the feedbacks array
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching feedback:', error);
        alert('An unexpected error occurred while fetching feedback. Please try again.');
      }
    );
  }
  private loadImprovementSuggestions(): void {
    this.dashboardService.getImprovementSuggestionsForCreator(this.creatorId).subscribe(
      (data: { suggestion: string }) => {  // Expecting an object with a 'suggestion' property
        this.improvementSuggestions = data.suggestion;  // Set the suggestion string
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching improvement suggestions:', error);
        alert('An unexpected error occurred while fetching improvement suggestions. Please try again.');
      }
    );
  }
  chartOffersByStatus(): void {
    this.dashboardService.getOfferStatusCountsForCreator(this.creatorId).subscribe(
      (data) => {
        const labels = Object.keys(data);
        const values = Object.values(data);

        this.chart = new Chart('OffersByStatusChart', {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Offers by Status',
                data: values,
                backgroundColor: [
                  'rgb(16,72,195)',
                  'rgb(110,159,64)',
                  'rgb(232,101,248)',
                  'rgb(211,177,63)',
                  'rgb(184,19,19)'
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true
              }
            }
          }
        });
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching offer status data:', error);
        alert('An unexpected error occurred while fetching the offer status data. Please try again.');
      }
    );
  }
}
