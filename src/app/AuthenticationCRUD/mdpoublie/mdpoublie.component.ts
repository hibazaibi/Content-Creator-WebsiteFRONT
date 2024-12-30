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
  isLoading = false;


  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

  }

  forgetpass2(forgetpass2Form: NgForm) {
    this.isLoading = true;

    this.route.queryParams.subscribe(queryParams => {
        const token = queryParams['token'];
        const decodedToken = jwt_decode(token) as { [key: string]: string };
        const email = decodedToken['sub'];
        this.userAuthService.setEmail(email);
        const pass1 = forgetpass2Form.value['newpassword'];
        const pass2 = forgetpass2Form.value['confirmpassword'];
        if (pass1 === "" || pass2 === "") {
          return alert("All fields are required. ");
        }
        if (!this.isValidPassword(pass1)) {
          return alert(" Your password must be at least 8 characters long and contain at least one letter and one number. ")
          this.isLoading = false;


        }
        if (pass1 != pass2) {
          return alert("Passwords do not match ")
        } else {
          this.isLoading = true;

          this.userService.forgetpass2(forgetpass2Form.value).subscribe(
            (response: any) => {
              console.log(email);
              console.log("mdp changer");
              this.userAuthService.clear();
              alert("Your password has been successfully changed. Please log in.")
              this.isLoading = false;

              this.router.navigate(['/login']);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
    );
  }

  isValidPassword(password: string): boolean {
    const pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    return pattern.test(password);
  }
}

