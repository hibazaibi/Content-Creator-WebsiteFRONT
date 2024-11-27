import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface OffreData{
  description:String;
  budget: number;
  status : String;
  useridoffre: String;
  idcreateur:number ;
  nameclient : string;
 Deadline: Date;
  collaborationDetails:  String;
specialRequests:  String;
}
export interface OffreData1{
  description:String;
  budget: number;
  status : String;
  useridoffre: String;
  idcreateur:number ;
  Deadline: Date;
  collaborationDetails:  String;
  specialRequests:  String;
}
@Injectable({
  providedIn: 'root'
})
export class OffreService {
  PATH_OF_API = environment.apiBaseUrl

  constructor(private httpclient: HttpClient ) { }
  public Offre(offreData: OffreData1 ) {
console.log(offreData)
    return this.httpclient.post(this.PATH_OF_API + "/api/offers/create", offreData)
  }
  public getOffreById(idoffre: number){
    return this.httpclient.get<OffreData>(this.PATH_OF_API+'/api/offers/find/'+idoffre);

  }
  acceptOffer(id: number): Observable<string> {
    return this.httpclient.post(`${this.PATH_OF_API}/api/offers/accept/${id}`, null, {
      responseType: 'text', // Explicitly set the response type as text
    });
  }

  declineOffer(id: number): Observable<string> {
    return this.httpclient.post(`${this.PATH_OF_API}/api/offers/decline/${id}`, null, {
      responseType: 'text', // Explicitly set the response type as text
    });
  }

  public getOffre(): Observable<OffreData[]> {
    return this.httpclient.get<OffreData[]>(this.PATH_OF_API + '/api/offers/all');

  }
  public getOffreByUserIdOffre(useridoffre:number) {
    return this.httpclient.get<OffreData[]>(this.PATH_OF_API + '/api/offers/find2/'+useridoffre);

  }
  public getOffreBycreatorid(useridoffre:string) {
    return this.httpclient.get<OffreData[]>(this.PATH_OF_API + '/api/offers/find3/'+useridoffre);

  }
  public deleteOffre(idoffre: number): Observable<void>{
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/offers/delete/'+idoffre);
  }


  public getTotalOffres() :Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + "/api/offres/autre/total")
  }
  public getTotalAutres2(email:string) :Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + "/api/demande3/autre/total/"+email)
  }
}


