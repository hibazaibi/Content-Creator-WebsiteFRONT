import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../user.service";

import {Users} from "../../users";

@Component({
  selector: 'app-listcreators',
  templateUrl: './listcreators.component.html',
  styleUrls: ['./listcreators.component.css']
})
export class ListcreatorsComponent implements OnInit {
  public creators: Users[] = [];

  constructor(private userService: UserService, private router: Router ) {}

  ngOnInit(): void {
    this.getCreators();
  }

  public getCreators(): void {
    this.userService.getAllCreators().subscribe(
      (response: Users[]) => {
        this.creators = response;
        console.log(this.creators);
      },
      (error) => {
        console.error('Error fetching creators:', error);
      }
    );
  }

  makeOffer(id: number) {
    this.router.navigate(['/offre', id]);
  }
}


