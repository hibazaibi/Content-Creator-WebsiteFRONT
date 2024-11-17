import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {UserAuthService} from "../../user-auth.service";
import {UserService} from "../../user.service";


@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements OnInit {
  constructor(private userService: UserService,
              private userAuthService:UserAuthService,
              private  router : Router) {
  }


  ngOnInit(): void {
  }
  forgetpass(forgetform: NgForm) {
    const mail=forgetform.value['email']
    if(mail===""){

      return alert("Veuillez entrer votre email!")
    }
    this.userService.forgetpass(forgetform.value).subscribe(
      (response: any) => {
        console.log(response);
        alert("E-mail envoyé avec succès");
        this.gotolist();
        },
      (error) => {
        console.log(error);
        if (error.status === 404) {
          alert("Une erreur s'est produite. Veuillez réessayer plus tard.");
        } else {
          alert("L'email saisie n'existe pas.");
        }
      }
    );
  }
  gotolist() {
    this.router.navigate(['/login']);
  }
}
