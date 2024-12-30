import { Component, OnInit } from '@angular/core';
import {Users} from "../users";
import {UserService} from "../user.service";
import {Router} from "@angular/router";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public creators: Users[] = [];
  public topCreators: Users[] = [];
  constructor(private userService: UserService, private router: Router, private sanitizer: DomSanitizer ) {}

  ngOnInit(): void {
    this.getCreators();



  }
  public getCreators(): void {
    this.userService.getAllCreators().subscribe(
      (response: Users[]) => {
        this.creators = response;
        this.getTopCreators()
        console.log(this.creators);
      },
      (error) => {
        console.error('Error fetching creators:', error);
      }
    );
  }
  private getTopCreators(): void {
    this.topCreators = this.creators
      .sort((a, b) => (b.avgrattings || 0) - (a.avgrattings || 0))
      .slice(0, 3); // Select the top 3 creators
    console.log('Top 3 creators:', this.topCreators);
  }

  getImageUrl(creator: Users): SafeUrl | null {
    if (creator.image) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:${creator.image.fileType};base64,${creator.image.data}`);
    }
    return null;
  }
  protected readonly Math = Math;

}
