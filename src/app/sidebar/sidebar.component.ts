import { Component, OnInit } from '@angular/core';
import {Users} from "../users";
import {UserAuthService} from "../user-auth.service";
import {Router} from "@angular/router";
import {UserService} from "../user.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  isadmin:boolean=false;
  isclient:boolean=false;
  iscreator:boolean=false;
  email!: string;
  user!:Users;
  mail!:string;
  constructor(private userauthservice: UserAuthService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.mail = localStorage.getItem('email')!;
    this.userService.getuserbymail(this.mail).subscribe(
      (response: any) => {
        this.user = response;
        console.log(this.user);
        const id = this.user.id;

      },
      error => {
        console.log(error);
      }
    );
    this.email = localStorage.getItem('roles')!;
    console.log(this.email);
    this.verifadmin();
    this.verifcreator();
    this.verifclient();
  }


  verifadmin(){
    if (this.email===`"ADMIN"`){
      this.isadmin=true;
    }
  }
  verifclient(){
    if (this.email===`"CLIENT"`){
      this.isclient=true;
    }
  }
  verifcreator(){
    if (this.email===`"CREATOR"`){
      this.iscreator=true;
    }
  }



  public onlogout() {
    this.userauthservice.clear();

  }public isLoggedIn() {
    return this.userauthservice.isLoggedIn();

  }


}

