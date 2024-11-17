import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {UserService} from "../../user.service";

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent {
  public userFile: any = File;
  public verif: boolean = true;
  public selectedRole: string = "";
  public clientSpecificFields: any = { nomEntreprise: "", siteWebEntreprise: "", secteurActivite: "" };
  public creatorSpecificFields: any = { bio: "", lienInsta: "", lienTikTok: "", categoriesContenu: [] };

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  register(registerForm: NgForm) {
    this.checkUserExists(registerForm.value.email).subscribe((exists: boolean) => {
      if (exists) {
        alert('User already exists with this email');
      } else {
        const formData = this.prepareRegisterData(registerForm);
console.log(registerForm.value)
        this.userService.register(formData).subscribe(
          (response: any) => {
            alert("User successfully registered");
            this.router.navigate(['/listusers']);
          },
          (error) => {
            console.log(error);
            alert("Failed to listusers user");
          }
        );
      }
    });
  }

  private prepareRegisterData(registerForm: NgForm) {
    const baseData: any = {
      nom: registerForm.value.nom,
      prenom: registerForm.value.prenom,
      email: registerForm.value.email,
      password: registerForm.value.password,
      role: registerForm.value.role,
      image: this.userFile
    };

    const clientData = {
      nomEntreprise: registerForm.value.nomEntreprise || this.clientSpecificFields.nomEntreprise,
      siteWebEntreprise: registerForm.value.siteWebEntreprise || this.clientSpecificFields.siteWebEntreprise,
      secteurActivite: registerForm.value.secteurActivite || this.clientSpecificFields.secteurActivite
    };

    const creatorData = {
      bio: registerForm.value.bio || this.creatorSpecificFields.bio,
      lienInsta: registerForm.value.lienInsta || this.creatorSpecificFields.lienInsta,
      lienTikTok: registerForm.value.lienTikTok || this.creatorSpecificFields.lienTikTok,
      categoriesContenu: registerForm.value.categoriesContenu || this.creatorSpecificFields.categoriesContenu
    };

    return { ...baseData, ...clientData, ...creatorData };
  }

  checkUserExists(email: string): Observable<boolean> {
    return this.userService.getuserbymail(email).pipe(
      map((response: any) => response != null),
      catchError((error) => {
        console.log(error);
        return of(false);
      })
    );
  }
  onSelectFile(event: any) {
    this.userFile = event.target.files[0];
    console.log(this.userFile);
  }
  onRoleChange(role: string) {
    this.selectedRole = role;
  }


}

