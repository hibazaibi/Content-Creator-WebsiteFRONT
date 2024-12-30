import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../user.service";

import {Users} from "../users";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-listcreators',
  templateUrl: './listcreators.component.html',
  styleUrls: ['./listcreators.component.css']
})
export class ListcreatorsComponent implements OnInit {
  public creators: Users[] = [];

  constructor(private userService: UserService, private router: Router, private sanitizer: DomSanitizer ) {}

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
  getImageUrl(creator: Users): SafeUrl | null {
    if (creator.image) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:${creator.image.fileType};base64,${creator.image.data}`);
    }
    return null;
  }

  protected readonly Math = Math;
}


