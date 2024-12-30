import { Component,  OnInit} from '@angular/core';
import {DashboardService} from "./dashboard.service";
import {Chart, registerables} from "chart.js";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalUsers: number = 0;
  totalClients: number = 0;
  totalCreators: number = 0;
  totalOffres: number = 0;
  averageBudget: number = 0;
  chart!: any;
  userActivityChart!: any;

  constructor(private dashboardService: DashboardService) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    // Fetch data for all sections
    this.dashboardService.getTotalUsers().subscribe((data) => {
      this.totalUsers = data;
    });

    this.dashboardService.getTotalClients().subscribe((data) => {
      this.totalClients = data;
    });

    this.dashboardService.getTotalCreators().subscribe((data) => {
      this.totalCreators = data;
    });

    this.dashboardService.getTotalOffres().subscribe((data) => {
      this.totalOffres = data;
    });

    this.dashboardService.getAverageBudget().subscribe((data) => {
      this.averageBudget = data;
    });

    // Load user activity chart after data is fetched
    this.loadUserActivityChart();
    this.loadOffersGroupedByMonthChart();
  }

  ngAfterViewInit(): void {
    // Initialize the offers by status chart
    this.chartOffersByStatus();
  }

  chartOffersByStatus() {
    this.dashboardService.getOffersByStatus().subscribe(
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
                  '#F4C542', '#6A9DF2', '#D24D77', '#58C27D', '#A97BE4'
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
      (error) => {
        console.error('Error fetching offer status data', error);
      }
    );
  }

  loadUserActivityChart() {
    this.dashboardService.getUserActivity().subscribe((data) => {
      this.createUserActivityChart(data);
    });
  }

  createUserActivityChart(data: any) {
    // Extract the keys (Active, Inactive) and values (9, 2)
    const labels = Object.keys(data);  // ['Active', 'Inactive']
    const values = Object.values(data);  // [9, 2]

    // Create the chart with dynamic labels and values
    this.userActivityChart = new Chart('UserActivityChart', {
      type: 'pie',
      data: {
        labels: labels,  // Dynamic labels
        datasets: [{
          label: 'User Activity',
          data: values,  // Dynamic data
          backgroundColor:  ['#4A90E2', '#E94E77'],  // Green for Active, Red for Inactive
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        }
      }
    });
  }
  loadOffersGroupedByMonthChart() {
    this.dashboardService.getOffersGroupedByMonth().subscribe((data) => {
      this.createOffersGroupedByMonthChart(data);
    });
  }

  createOffersGroupedByMonthChart(data: any) {
    const labels = Object.keys(data);  // ['January 2024', 'February 2024', ...]
    const values = Object.values(data);  // [10, 15, ...] offer counts for each month

    this.chart = new Chart('OffersGroupedByMonthChart', {
      type: 'bar',
      data: {
        labels: labels,  // Dynamic labels
        datasets: [{
          label: 'Offers by Month',
          data: values,  // Dynamic data
          backgroundColor: '#4A90E2',  // Bar color
          borderWidth: 1
        }]
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
  }
}
