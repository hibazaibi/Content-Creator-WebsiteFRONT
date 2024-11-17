import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {UserAuthService} from "../../user-auth.service";
import {UserService} from "../../user.service";
import {UserRegisterService} from "../../../user-register.service";

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {


  constructor(private userService: UserService,
              private userAuthService:UserAuthService,
              private  router : Router,
              private userregisterservice:UserRegisterService
              ) {
  }

  ngOnInit(): void {
  }

  changepass(changepassform: NgForm) {

    this.userService.changepass(changepassform.value).subscribe(
      (response:any) => {
        console.log(response.email);
        console.log(response.newPassword);


      },
      (error) => {
        console.log(error);
      }
    );
  }
}
