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
  email!: string;
  notifconge!:number;
  notifauto!:number;
  notif:number=0;
  user!:Users;
  mail!:string;
  pos!:string;
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
  }


  verifadmin(){
    if (this.email===`"ADMIN"`){
      this.isadmin=true;
    }
  }
  showDemandeSubMenuFlag: boolean = false;

  showDemandeSubMenu() {
    this.showDemandeSubMenuFlag = !this.showDemandeSubMenuFlag;
  }
  showAutoSubMenuFlag: boolean = false;

  showAutoSubMenu() {
    this.showAutoSubMenuFlag = !this.showAutoSubMenuFlag;
  }
  showAutreSubMenuFlag: boolean = false;

  showAutreSubMenu() {
    this.showAutreSubMenuFlag = !this.showAutreSubMenuFlag;
  }
  showDemande5SubMenuFlag: boolean = false;

  showDemande5SubMenu() {
    this.showDemande5SubMenuFlag = !this.showDemande5SubMenuFlag;
  }
  showDemande4SubMenuFlag: boolean = false;

  showDemande4SubMenu() {
    this.showDemande4SubMenuFlag = !this.showDemande4SubMenuFlag;
  }
  public onlogout() {



    const token = localStorage.getItem('jwtToken');
    this.userauthservice.clear();
    if (token) {
      this.userService.logout(token).subscribe(
        () => {
          localStorage.removeItem('jwtToken');


        },
        error => console.error(error)
      );
    }

  }public isLoggedIn() {
    return this.userauthservice.isLoggedIn();

  }
  showAdminSubMenuFlag: boolean = false;

  showAdminSubMenu() {
    this.showAdminSubMenuFlag= !this.showAdminSubMenuFlag;
  }
  showDemande2SubMenuFlag: boolean = false;

  showDemande2SubMenu() {
    this.showDemande2SubMenuFlag = !this.showDemande2SubMenuFlag;
  }
  showDemande3SubMenuFlag: boolean = false;

  showDemande3SubMenu() {
    this.showDemande3SubMenuFlag = !this.showDemande3SubMenuFlag;
  }
}

