import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../environments/environment";
import {Users} from "./users";

interface Users2{
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  numtel: number;
  dateNaissance: Date;
  dateRecrutement: Date;
  situationFam: string;
  nbEnfant:number;
  adresse: string;
  sexe:string;
  manager:string;
  position:string;
  service: string;
  cnss:number;
  rib:string;
  ncin:number;
  npassport:string;
  role : string ;
  token:string ;
  imageid:string;
  filetype:string;
}
interface LoginData {
  email: string;
  password: string;
}
interface registerData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  numtel: number;
  dateNaissance: Date;
  lienInsta?: string;
  lienTikTok?: string;
  categoriesContenu?: string;
  nomEntreprise?: string;
  siteWebEntreprise?: string;
  secteurActivite?: string;
  bio?: string;
  role: string; // Match the `Role` enum in your backend
  image?: File; // Optional if not always sent
}
interface ChangepassData{

  currentPassword : string ;
  newPassword: string ;
}

interface forgetData{
  email : string;

}
interface updatedata{
  nom: string;
  prenom: string;
  email: string;
  numtel:number ;
  dateNaissance: Date ;
  dateRecrutement:Date;
  situationFam:string ;
  nbEnfant:number;
  adresse:string ;
  service:string;
  sexe:string;
  cnss:number
  rib:string;
  manager:string;
  ncin:number;
  npassport:string;
  Role : string ;
  position:string;



}
interface forgetpassData{
  newpassword : string;

}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  PATH_OF_API = environment.apiBaseUrl
  requestHeader = new HttpHeaders({"No-Auth": "True"})

  constructor(private httpclient: HttpClient ) {
  }

  public login(loginData: LoginData) {

    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/authenticate", loginData)
  }
  activateUser(userId: number): Observable<void> {
    return this.httpclient.put<void>(`${this.PATH_OF_API}/admin/activate/${userId}`, {}, {
      responseType: 'json'
    });
  }
  getAllUsers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(this.PATH_OF_API + "/admin/all-users");
  }

  public register(registerData: registerData) {
    const formData = new FormData();

    formData.append('nom', registerData.nom);
    formData.append('prenom', registerData.prenom);
    formData.append('email', registerData.email);
    formData.append('password', registerData.password);
    formData.append('role', registerData.role);
    if (registerData.lienInsta) formData.append('lienInsta', registerData.lienInsta);
    if (registerData.lienTikTok) formData.append('lienTikTok', registerData.lienTikTok);
    if (registerData.categoriesContenu) formData.append('categoriesContenu', registerData.categoriesContenu);
    if (registerData.nomEntreprise) formData.append('nomEntreprise', registerData.nomEntreprise);
    if (registerData.siteWebEntreprise) formData.append('siteWebEntreprise', registerData.siteWebEntreprise);
    if (registerData.secteurActivite) formData.append('secteurActivite', registerData.secteurActivite);
    if (registerData.bio) formData.append('bio', registerData.bio);
    if (registerData.image) formData.append('image', registerData.image); // Attach image file

    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/register", formData);
  }
  public changepass(changepassData: ChangepassData) {
    const email = localStorage.getItem('email');

    const body = { email, ...changepassData };
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/changepass", body)
  }

  public getusers(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(this.PATH_OF_API + '/api/v1/auth/users2');
  }
  public getusers2(): Observable<Users[]> {
    return this.httpclient.get<Users[]>(this.PATH_OF_API + '/api/v1/auth/users2');
  }
  public forgetpass(ForgetData: forgetData) {
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/forgetpass", ForgetData)
  }

  public logout(token : string) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/logout", null,{headers})
  }
  public forgetpass2(Forgetpassdata: forgetpassData) {
    const email = localStorage.getItem('email');

    const body = { email , ...Forgetpassdata };
    return this.httpclient.post(this.PATH_OF_API + "/api/v1/auth/forgetpass2", body)
  }
  public deleteUser(id: number): Observable<void>{
    console.log(id)

      return this.httpclient.delete<void>(this.PATH_OF_API + "/api/v1/auth/delete/"+id);

    throw new Error("User ID not found");
  }
  public updateuserr(id: number, value: Users){
console.log(value)
const formData=new FormData();

   formData.append(   'nom', value.nom);
    formData.append(     'prenom', value.prenom);
      formData.append(     'email', value.email);


      formData.append(   ' role', value.role);

    console.log(formData)

    return this.httpclient.put(this.PATH_OF_API + '/api/v1/auth/update/'+id,formData);
  }
  public getuserdetailsbyid(userid: number){
    console.log(userid)
    return this.httpclient.get<Users>(this.PATH_OF_API+'/api/v1/auth/find/'+userid);

  }
  public getuserbymail(email:string){
    return this.httpclient.get<Users>(this.PATH_OF_API+'/api/v1/auth/findbymail/'+email);


  }public getuserbymail2(email:string){
    return this.httpclient.get<Users2>(this.PATH_OF_API+'/api/v1/auth/findbymail2/'+email);


  }
  public getImage(fileId: string): Observable<any> {
    const url = `${this.PATH_OF_API}/image/attachments/${fileId}/image`;
    return this.httpclient.get(url, { responseType: 'arraybuffer' });
  }




}
