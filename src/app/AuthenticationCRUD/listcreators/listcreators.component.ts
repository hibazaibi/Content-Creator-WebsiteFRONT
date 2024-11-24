import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {HttpErrorResponse} from "@angular/common/http";
import {UserAuthService} from "../../user-auth.service";
import {UserService} from "../../user.service";

import {Users} from "../../users";
import {UserRegisterService} from "../../../user-register.service";

@Component({
  selector: 'app-listcreators',
  templateUrl: './listcreators.component.html',
  styleUrls: ['./listcreators.component.css']
})
export class ListcreatorsComponent implements OnInit {
  public users: Users[] = []
  public editUsers: any = null;

  usera!: Users;
  imageUrl: any;
  imageid!:string;
  imagetype!:string;
  constructor(private userService: UserService,
              private userAuthService: UserAuthService,
              private router: Router,
              private userregisterservice: UserRegisterService) {
  }

  ngOnInit(): void {
    this.getusers();

  }

  register(registerform: NgForm) {

    this.userService.register(registerform.value).subscribe(
      (response: any) => {
        console.log(response.token);
        console.log(response.id);
        console.log(response.nom);
        console.log(response.prenom);
        console.log(response.email);
        console.log(response.role);
        },
      (error) => {
        console.log(error);
      }
    );
  }

  public getusers(): void {
    this.userService.getusers().subscribe(
      (response: Users[]) => {
        this.users = response;

        console.log(this.users)
      },

      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public deleteuserr(id: number ): void {
    if (confirm('Voulez-vous vraiment supprimer cet utilisateur?')) {
      this.userService.getuserdetailsbyid(id).subscribe(
      data =>{console.log(data)
        this.usera=data
        if(this.usera.role==="ADMIN"){alert('Impossible de supprimer un admin! ')}
        else{

          console.log(this.usera.id)

          this.userService.deleteUser(this.usera.id)
            .subscribe(
              (response: any) => {
                console.log(response);
                this.getusers();

              },
              (error: HttpErrorResponse) => {
                alert(error.message);
              }
            );
        }
      },error => console.log(error));
    console.log(this.usera.id)

    }
  }
  detailsuser(id: number){
    this.router.navigate(['/detailsuser', id]);
  }
  makeoffre(id: number){
    this.router.navigate(['/offre', id]);
  }
  public searchEmployees(key: string): void {
    console.log(key);
    const results: Users[] = [];
    for (const user of this.users) {
      if (user.nom.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.prenom.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.role.toLowerCase().indexOf(key.toLowerCase()) !== -1
        || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
        results.push(user);
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getusers();
    }
  }
}

