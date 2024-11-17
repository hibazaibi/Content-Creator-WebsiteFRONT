import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import {UserAuthService} from "../../user-auth.service";
import {UserService} from "../../user.service";
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-mdpoublie',
  templateUrl: './mdpoublie.component.html',
  styleUrls: ['./mdpoublie.component.css']
})
export class MdpoubliComponent implements OnInit {




  constructor(private userService: UserService,
              private userAuthService:UserAuthService,
              private  router : Router,

              private route: ActivatedRoute
  ) {
  }
ngOnInit(): void {

} } /*
 forgetpass2(forgetpass2Form: NgForm) {
   this.route.queryParams.subscribe(queryParams => {
     const token = queryParams['token'];
     /*  const decodedToken = jwt_decode(token) as { [key: string]: string };
       const email = decodedToken['sub'];
     this.userAuthService.setEmail(email);
const pass1=forgetpass2Form.value['newpassword'];
     const pass2=forgetpass2Form.value['confirmpassword'];
       if(pass1==="" || pass2===""){
         return alert("les champs sont obligatoires ");}
         if(pass1!=pass2){return alert("les mot de passes ne correspondent pas")}
     else {
       this.userService.forgetpass2(forgetpass2Form.value).subscribe(
         (response: any) => {
           console.log(email);
           console.log("mdp changer");
           this.userAuthService.clear();
alert("Mis à jour avec succés")
           this.gotolist();

         },
         (error) => {
           console.log(error);
         }
       );
     }
       },

     );
   }
  gotolist() {
    this.router.navigate(['/login']);
  }
*/
