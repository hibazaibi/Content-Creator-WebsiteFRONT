import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environments/environment";
export interface evaluation  {
  rating:number;
  feedback: string;
}
@Injectable({
  providedIn: 'root'
})

export class EvaluationService {
  PATH_OF_API = environment.apiBaseUrl


  constructor(private http: HttpClient) {}

  addEvaluation(id:number,evaluation: any): Observable<any> {
    return this.http.post(this.PATH_OF_API + "/api/evaluations/evaluate/"+ id,evaluation);
  }

  getEvaluationsForCreator(creatorId: number): Observable<any[]> {
    return this.http.get<any[]>(this.PATH_OF_API + "/api/evaluations/creator/"+creatorId);
  }
}
