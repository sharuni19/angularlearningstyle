import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LearningstyleService } from '../learningstyle.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: any;
  password: any;
  invalidMail: boolean = false;
  invalidPassword: boolean = false;
  isLoginPage: boolean = true;
  isProgressSpinner: boolean = false;
  constructor(public learningStyleService: LearningstyleService, public snackbar: MatSnackBar, public router: Router) { }

  ngOnInit() {

  }

  onSubmit() {
    if (this.email != undefined) {
      if (this.password != undefined) {
        this.isLoginPage = false;
        this.isProgressSpinner = true;
        this.learningStyleService.loginUser(this.email, this.password).subscribe((data: any) => {
          console.log(data)
          console.log(data['status'])
          if (data['status'] != undefined) {
            if (data['status'] == 'Invalid Email') {
              this.isLoginPage = true;
              this.isProgressSpinner = false;
              this.invalidMail = true;
              this.snackbar.open("Entered Email is not registered", "close")
            }
            else if (data['status'] == 'Invalid Password') {
              this.isLoginPage = true;
              this.isProgressSpinner = false;
              this.invalidPassword = true;
              this.snackbar.open("Invald Password", "close")
            }
            else if (data['status'] == 'Success') {
              localStorage.setItem('email', this.email);
              this.isProgressSpinner = false;
              this.router.navigate(['/dashboard'])
            }
          }
        })
      } else {
        this.snackbar.open("Please Enter the Password", "close")
      }
    }
    else {
      this.snackbar.open("Please Enter the Email", "close")
    }
  }


}
