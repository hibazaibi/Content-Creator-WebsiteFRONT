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
  public getid() :string | null{
    return  localStorage.getItem("id");
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
