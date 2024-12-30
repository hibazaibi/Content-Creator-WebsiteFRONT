import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  PATH_OF_API = environment.apiBaseUrl
  requestHeader = new HttpHeaders({"No-Auth": "True"})
  constructor(private httpclient: HttpClient) {
  }

  getTotalUsers(): Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + "/api/v1/auth/totalUsers");
  }
  getUserActivity(): Observable<any> {
    return this.httpclient.get<any>(this.PATH_OF_API + "/api/v1/auth/user-activity");
  }
  getOffersGroupedByMonth(): Observable<Map<string, number>> {
    return this.httpclient.get<Map<string, number>>(this.PATH_OF_API + "/api/offers/offersGroupedByMonth");
  }
  getTotalClients(): Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + "/api/v1/auth/totalClients");
  }

  getTotalCreators(): Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + "/api/v1/auth/totalCreators");
  }
  getTotalOffres(): Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API +"/api/offers/count");
  }
  getOffersByStatus(): Observable<Map<string, number>> {
    return this.httpclient.get<Map<string, number>>(this.PATH_OF_API + "/api/offers/countByStatus");
  }

  getAverageBudget(): Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API +"/api/offers/averageBudget");
  }
  getOffersForClient(clientId: number): Observable<any[]> {
    return this.httpclient.get<any[]>(`${this.PATH_OF_API}/api/offers/${clientId}/offers`);
  }

  getTotalBudgetForClient(clientId: number): Observable<number> {
    return this.httpclient.get<number>(`${this.PATH_OF_API}/api/offers/${clientId}/totalBudget`);
  }

  getOfferStatusCountsForClient(clientId: number): Observable<any> {
    return this.httpclient.get<any>(`${this.PATH_OF_API}/api/offers/${clientId}/offerStatusCounts`);
  }
  getTotalOffersForCreator(creatorId: number): Observable<number> {
    return this.httpclient.get<number>(`${this.PATH_OF_API}/api/offers/${creatorId}/total-offers`);
  }

  getOfferStatusCountsForCreator(creatorId: number): Observable<Map<string, number>> {
    return this.httpclient.get<Map<string, number>>(`${this.PATH_OF_API}/api/offers/${creatorId}/offer-status-counts`);
  }

  getAverageBudgetForCreator(creatorId: number): Observable<number> {
    return this.httpclient.get<number>(`${this.PATH_OF_API}/api/offers/${creatorId}/average-budget`);
  }

  getTotalEarningsForCreator(creatorId: number): Observable<number> {
    return this.httpclient.get<number>(`${this.PATH_OF_API}/api/offers/${creatorId}/total-earnings`);
  }

  getCreatorAverageRating(creatorId: number): Observable<number> {
    return this.httpclient.get<number>(`${this.PATH_OF_API}/api/offers/${creatorId}/average-rating`);
  }

  getFeedbackForCreator(creatorId: number): Observable<string[]> {
    return this.httpclient.get<string[]>(`${this.PATH_OF_API}/api/offers/${creatorId}/feedbacks`);
  }

  getImprovementSuggestionsForCreator(creatorId: number): Observable<{ suggestion: string }> {
    return this.httpclient.get<{ suggestion: string }>(`${this.PATH_OF_API}/api/offers/${creatorId}/improvement-suggestions`);
  }
}
