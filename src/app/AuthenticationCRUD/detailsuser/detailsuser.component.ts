import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../user.service";
interface Users2{
  id: number;
  nom: string;
  prenom: string;
  email: string;
  password: string;
  numtel: number;
  dateNaissance: Date;
  dateRecrutement: Date;
  situationFam: string;
  nbEnfant:number;
  adresse: string;
  sexe:string;
  manager:string;
  position:string;

  service: string;
  cnss:number;
  rib:string;
  ncin:number;
  npassport:string;
  role : string ;
  token:string ;
  imageid:string;
  filetype:string;
}
@Component({
  selector: 'app-detailsuser',
  templateUrl: './detailsuser.component.html',
  styleUrls: ['./detailsuser.component.css']
})
export class DetailsuserComponent implements OnInit {
  public useridtoupdate: number = 0;
  user3!: Users2;
  loading: boolean = true;
  imageUrl: string = '';

  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.useridtoupdate = this.route.snapshot.params['id'];
    this.userService.getuserdetailsbyid(this.useridtoupdate).subscribe(
      (data) => {
        console.log(data);
        this.userService.getuserbymail2(data.email).subscribe(
          (userData) => {
            console.log(userData);
            this.user3 = userData;
            this.loading = false;
            this.imageUrl = `data:${this.user3.filetype};base64,`;
            this.userService
              .getImage(this.user3.imageid)
              .subscribe((imageData) => {
                const byteArray = Array.from(new Uint8Array(imageData));
                this.imageUrl += btoa(
                  byteArray.reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                  )
                );
              });
          },
          (error) => console.log(error)
        );
      },
      (error) => console.log(error)
    );
  }
}

