import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

 interface OffreData{
  description:String;
  budget: number;
  OffreStatus : String;
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
  public Offre(offreData: OffreData ) {
console.log(offreData)
    return this.httpclient.post(this.PATH_OF_API + "/api/offers/create", offreData)
  }
  public getOffreById(idoffre: number){
    return this.httpclient.get<OffreData>(this.PATH_OF_API+'/api/offers/find/'+idoffre);

  }
  public getOffre(): Observable<OffreData[]> {
    return this.httpclient.get<OffreData[]>(this.PATH_OF_API + '/api/offers/all');

  }
  public getOffreByUserIdOffre(useridoffre:number) {
    return this.httpclient.get<OffreData[]>(this.PATH_OF_API + '/api/offers/find2/'+useridoffre);

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


