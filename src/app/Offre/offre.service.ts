import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

export interface OffreData{
  idOffre: number;
  description:String;
  budget: number;
  status : string;
  useridoffre: String;
  idcreateur:number ;
  nameclient : string;
 deadline: Date;
  collaborationDetails:  String;
specialRequests:  String;
isev:boolean;
}
export interface OffreData1{
  description:String;
  budget: number;
  status : String;
  useridoffre: String;
  idcreateur:number ;
  deadline: Date;
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
  acceptOffer(id: number) {
    console.log(id);
    return this.httpclient.put(this.PATH_OF_API+'/api/offers/accept/'+id,null);
  }

  declineOffer(id: number) {
    return this.httpclient.put(this.PATH_OF_API + '/api/offers/decline/' + id, null);
  }
    done(id: number){
      return this.httpclient.put(this.PATH_OF_API+'/api/offers/complete/'+id, null);
    }


  public getOffre(): Observable<OffreData[]> {
    return this.httpclient.get<OffreData[]>(this.PATH_OF_API + '/api/offers/all');

  }
  public getOffreByUserIdOffre(useridoffre:string) {
    return this.httpclient.get<OffreData[]>(this.PATH_OF_API + '/api/offers/find2/'+useridoffre);

  }

  public getOffreBycreatorid(idcreateur:string) {
    return this.httpclient.get<OffreData[]>(this.PATH_OF_API + '/api/offers/find3/'+idcreateur);

  }
  public deleteOffre(idoffre: number): Observable<void>{
    return this.httpclient.delete<void>(this.PATH_OF_API + '/api/offers/delete/'+idoffre);
  }
  updateOffre(offerId: number, offerData: any) {
    return this.httpclient.put(this.PATH_OF_API + '/api/offers/update/' + offerId, offerData);  }

  public getTotalOffres() :Observable<number> {
    return this.httpclient.get<number>(this.PATH_OF_API + "/api/offres/autre/total")
  }

}


