import { Component, OnInit } from '@angular/core';
import {UserService} from "../../user.service";
import {DashboardService} from "../dashboard.service";
import {UserAuthService} from "../../user-auth.service";
import {Router} from "@angular/router";
import {Users} from "../../users";
import {HttpErrorResponse} from "@angular/common/http";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-clientdashboard',
  templateUrl: './clientdashboard.component.html',
  styleUrls: ['./clientdashboard.component.css']
})
export class ClientdashboardComponent implements OnInit {

  public totalBudget: number = 0;
  public clientId!: number;
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
          this.clientId = response.id;
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
    this.loadTotalBudget();
    this.chartOffersByStatus();
  }

  private loadTotalBudget(): void {
    this.dashboardService.getTotalBudgetForClient(this.clientId).subscribe(
      (data: number) => {
        this.totalBudget = data;
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching total budget:', error);
        if (error.status === 403) {
          alert('You do not have permission to view the total budget. Please contact support.');
        } else {
          alert('An unexpected error occurred while fetching the total budget. Please try again.');
        }
      }
    );
  }

  chartOffersByStatus(): void {
    this.dashboardService.getOfferStatusCountsForClient(this.clientId).subscribe(
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
        if (error.status === 403) {
          alert('You do not have permission to view the offer status data. Please contact support.');
        } else {
          alert('An unexpected error occurred while fetching the offer status data. Please try again.');
        }
      }
    );
  }

}
