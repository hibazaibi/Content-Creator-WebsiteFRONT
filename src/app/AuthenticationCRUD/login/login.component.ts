import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ActivatedRoute, Router} from "@angular/router";
import {UserAuthService} from "../../user-auth.service";
import {UserService} from "../../user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  existinguser:boolean=true;
  constructor(private userService: UserService,
              private userAuthService:UserAuthService,
              private  router : Router,
              private route: ActivatedRoute,) {
  }

  ngOnInit(): void {
  }

  login(loginform: NgForm) {

      this.userService.login(loginform.value).subscribe(
        (response:any) => {
          console.log(response.token);
          console.log(response.role);
        this.userAuthService.setRoles(response.role);
          this.userAuthService.setToken(response.token);
          this.userAuthService.setEmail(response.email);
          this.userAuthService.setid(response.id)

          const email=loginform.value['email'];
          const pass=loginform.value['password'];
          if(email==="" || pass===""){
            return alert("les champs sont obligatoires ");}

          let redirectUrl: string = this.route.snapshot.queryParams['returnUrl'] ; // Default to dashboard
          const role1 = response.role;

          if (role1 === 'ADMIN') {
            this.router.navigate([redirectUrl || '/dashboard']);
          } else if (role1 === 'CLIENT') {
            this.router.navigate([redirectUrl || '/mydashboard']);
          } else if (role1 === 'CREATOR') {
            this.router.navigate([redirectUrl || '/mydashboard1']);
          } else {
            this.router.navigate([redirectUrl || '/dashboard']);
          }
        },
        (error) => {
          this.existinguser = false;
        }
      );
  }

    existuser(loginform: NgForm) {
      this.userService.getuserbymail(loginform.value['email'])
        .subscribe(
          (response: any) => {
            if (response !== null) { this.existinguser= true ;
            }else {this.existinguser=false}
          }, (error) => {
            console.log(error);

          }
        );
    }}
