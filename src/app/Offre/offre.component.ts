import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OffreService} from "./offre.service";
import {NgForm} from "@angular/forms";
interface OffreData{
  description:String;
  budget: number;
  OffreStatus : String;
  useridoffre: String;
  idcreateur:number ;
  Deadline: Date;
  collaborationDetails:  String;
  specialRequests:  String;

}
@Component({
  selector: 'app-autredemande',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  email!: string;
  private idcreateur: any;

  constructor(private offreService:OffreService,
    private router: Router,
              private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idcreateur = this.route.snapshot.params['id'];

  }
  Offre(offreform: NgForm) {
    this.email = localStorage.getItem('email')!;
    const offreData: OffreData = {
      description:offreform.value.description,
      budget: offreform.value.budget,
      OffreStatus : offreform.value.OffreStatus,
      useridoffre: localStorage.getItem("id")||"",
      idcreateur :this.idcreateur,
      Deadline: offreform.value.Deadline,
      collaborationDetails: offreform.value.collaborationDetails,
      specialRequests:  offreform.value.specialRequests

    };

    this.offreService.Offre(offreData).subscribe((response: any) => {

      alert("OfferAdded")

      this.gotolist();
    }, (error) => {
      console.log(error);
    });
  }
  gotolist() {
    this.router.navigate(['/offredetails']);
  }
}


