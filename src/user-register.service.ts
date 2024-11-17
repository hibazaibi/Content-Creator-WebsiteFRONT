import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserRegisterService {

  constructor() { }
  public setnom(nom:string){
    localStorage.setItem("nom",JSON.stringify(nom));
  }
  public  getnom() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("nom"));

  }
  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken" , jwtToken);

  }
  public getToken() :string | null{
    return  localStorage.getItem("jwtToken");
  }
  public setprenom(prenom:string){
    localStorage.setItem("prenom",JSON.stringify(prenom));
  }
  public  getprenom() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("prenom"));

  }
  public setemail(email:string){
    localStorage.setItem("email",JSON.stringify( email));
  }
  public  getemail() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("email"));

  }
  public setpassword(password:string){
    localStorage.setItem("password",JSON.stringify( password));
  }
  public  getpassword() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("password"));

  }
  public setRoles(roles:[]){
    localStorage.setItem("roles",JSON.stringify( roles));
  }
  public  getRoles() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("roles"));

  }
  public setadresse(adresse:string){
    localStorage.setItem("adresse",JSON.stringify(adresse));
  }
  public  getadresse() :[] {

    // @ts-ignore

    return JSON.parse(localStorage.getItem("adresse"));

  }
  public setnumtel(numtel:number){
    localStorage.setItem("numtel",JSON.stringify(numtel));
  }
  public  getnumTel() :[] {

    // @ts-ignore

    return JSON.parse(localStorage.getItem("numtel"));

  }
  public setdatenaissance(dateNaissance:string){
    localStorage.setItem("datenaissance",JSON.stringify(dateNaissance));
  }
  public  getdatenaissance() :[] {

    // @ts-ignore

    return JSON.parse(localStorage.getItem("dateNaissance"));

  }
  public setdateRecrutement(dateRecrutement:string){
    localStorage.setItem("daterecrutement",JSON.stringify(dateRecrutement));
  }
  public setCnss(cnss: number) {
    localStorage.setItem("cnss", JSON.stringify(cnss));
  }

  public setDateNaissance(dateNaissance: string) {
    localStorage.setItem("dateNaissance", JSON.stringify(dateNaissance));
  }

  public setSituationFam(situationFam: string) {
    localStorage.setItem("situationFam", JSON.stringify(situationFam));
  }

  public setNPassport(nPassport: number) {
    localStorage.setItem("nPassport", JSON.stringify(nPassport));
  }

  public setNCin(nCin: number) {
    localStorage.setItem("nCin", JSON.stringify(nCin));
  }

  public setNbEnfant(nbEnfant: number) {
    localStorage.setItem("nbEnfant", JSON.stringify(nbEnfant));
  }

  public setRib(rib: number) {
    localStorage.setItem("rib", JSON.stringify(rib));
  }



  public setService(service: string) {
    localStorage.setItem("service", JSON.stringify(service));
  }

  public clear(){
    localStorage.clear();
  }
  public  isLoggedIn(){
    return this.getRoles()&&this.getToken();
  }
}
