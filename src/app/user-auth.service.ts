import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private service:UserService) { }
  public setRoles(roles:[]){
    localStorage.setItem("roles",JSON.stringify( roles));
  }
  public  getRoles() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("roles"));

  }
  public setToken(jwtToken:string){
    localStorage.setItem("jwtToken" , jwtToken);

  }
  public getToken() :string | null{
    return  localStorage.getItem("jwtToken");
  }
  public setEmail(email:string){
    localStorage.setItem("email" , email);

  }
  public getemail() :string | null{
    return  localStorage.getItem("email");
  }
  public setid(id:number){
    localStorage.setItem("id" , id.toString());

  }
  public getid(): number | null {
    const id = localStorage.getItem("id");
    return id ? Number(id) : null; // Convert string to number if it's not null
  }
public clear(){
    localStorage.clear();
}
public  isLoggedIn(){
    return this.getRoles()&&this.getToken();
}
public isLoggedIn2(){
    return!!localStorage.getItem("jwtToken");
}
  public setuserss(users:[]){
  localStorage.setItem("roles",JSON.stringify( users));

  }
  public  getuserss() :[] {


    // @ts-ignore
    return JSON.parse(localStorage.getItem("userss"));

  }
  public isAdmin(){
    const role = localStorage.getItem("roles");
    if(role === `"ADMIN"`) {
      return true;
    } else {
      return false;
    }
  }
  public isCreator(){
    const role = localStorage.getItem("roles");
    if(role === `"CREATOR"`) {
      return true;
    } else {
      return false;
    }
  }
  public isClient(){
    const role = localStorage.getItem("roles");
    if(role === `"CLIENT"`) {
      return true;
    } else {
      return false;
    }
  }
  public onlogout() {



    const token = localStorage.getItem('jwtToken');

    if (token) {
      this.service.logout(token).subscribe(
        () => {
          localStorage.removeItem('jwtToken');


        },
        error => console.error(error)
      );
    }

  }
}
