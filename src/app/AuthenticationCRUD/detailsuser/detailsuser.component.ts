import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import { UserService} from "../../user.service";
import {Users} from "../../users";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-detailsuser',
  templateUrl: './detailsuser.component.html',
  styleUrls: ['./detailsuser.component.css']
})
export class DetailsuserComponent implements OnInit {
  user3: Users | null = null;
  useridtoupdate!: number;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.useridtoupdate = this.route.snapshot.params['id'];

    this.userService.getuserdetailsbyid(this.useridtoupdate).subscribe({
      next: (data) => {
        console.log("User Details by ID:", data);
        this.user3 = data;


      },
      error: (error) => {
        console.error("Error fetching user by ID:", error);
        this.user3 = null;
      },
    });
  }
  getImageUrl(user: Users): SafeUrl | null {
    if (user.image) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:${user.image.fileType};base64,${user.image.data}`);
    }
    return null;
  }
}

