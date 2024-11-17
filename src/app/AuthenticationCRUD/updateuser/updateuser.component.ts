import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {UserAuthService} from "../../user-auth.service";
import {UserService} from "../../user.service";

import {Users} from "../../users";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})

export class UpdateuserComponent implements OnInit {
  public useridtoupdate: number = 0;
  user!: Users;
  public users: Users[] = []
  selectedmanager: any = "";
  public verif: boolean = true;


  constructor(
    private userauthservice: UserAuthService,
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

  }


}
