import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DisputeService {
  PATH_OF_API = environment.apiBaseUrl

  constructor(private http: HttpClient) {}

  createDispute(disputeRequest: any): Observable<any> {
    return this.http.post<any>(this.PATH_OF_API + "/api/disputes/create", disputeRequest);
  }

  getAllDisputes(): Observable<any[]> {
    return this.http.get<any[]>(this.PATH_OF_API + "/api/disputes/all");
  }

  resolveDispute(disputeId: number, adminId: number, resolutionRequest: any): Observable<any> {
    return this.http.post<any>(
      this.PATH_OF_API + "/api/disputes/resolve/"+disputeId,
      resolutionRequest,
      { params: { adminId: adminId.toString() } }
    );
  }

  getDisputeById(disputeId: number): Observable<any> {
    return this.http.get<any>(this.PATH_OF_API + "/api/disputes/find/"+disputeId);
  }
}
