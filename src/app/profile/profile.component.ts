import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningstyleService } from '../learningstyle.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  email: any;
  userData: any;
  constructor(public router: Router, public learningStyleService: LearningstyleService) { }

  ngOnInit(): void {
    this.email = localStorage.getItem("email")
    this.learningStyleService.getUser(this.email).subscribe((data: any) => {
      this.userData = data['records']
    })
  }
  backToDashBoard() {
    console.log('backToDashBoard');
    this.router.navigate(['/dashboard']);
  }
}
