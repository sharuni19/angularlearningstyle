import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LearningstyleService } from '../learningstyle.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  firstname: any;
  lastname: any;
  degree: any;
  course: any;
  email: any;
  dob: any;
  password: any;
  age: any;
  registerContent: boolean = true
  isProgressSpinner: boolean = false
  registrationForm: FormGroup;
  emailRegex = `(?:[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])`;
  constructor(public snackBar: MatSnackBar, public learningStyleService: LearningstyleService, public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: ['', [Validators.required]],
      age: ['', [Validators.required]],
      lastName: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(30)]],
      degree: ['', [Validators.required]],
      course: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(30)]],
      dateOfBirth: ['', [Validators.required]]
    });
  }
  registerUser() {
    console.log(this.firstname)
    if (this.firstname != undefined) {
      if (this.lastname != undefined) {
        if (this.degree != undefined) {
          if (this.dob != undefined) {
            if (this.age != undefined) {
              if (this.email != undefined) {
                if (this.password != undefined) {
                  const reqData = {
                    'FirstName': this.firstname,
                    'LastName': this.lastname,
                    'Degree': this.degree,
                    'Course': this.course,
                    'DateOfBirth': this.dob,
                    'Age': this.age,
                    'Email': this.email,
                    'Password': this.password,
                  }
                  let formData = new FormData()
                  formData.append('FirstName', this.firstname)
                  formData.append('LastName', this.lastname)
                  formData.append('Degree', this.degree)
                  formData.append('Course', this.course)
                  formData.append('DateOfBirth', this.dob)
                  formData.append('Age', this.age)
                  formData.append('Email', this.email)
                  formData.append('Password', this.password)
                  formData.append("reqData", JSON.stringify(reqData))
                  console.log(formData)
                  this.learningStyleService.registerUser(formData).subscribe((data: any) => {
                    console.log(data)
                  })
                }
                else {
                  this.snackBar.open("Please Enter the Password", "close")
                }
              } else {
                this.snackBar.open("Please Enter the Email", "close")
              }
            }
            else {
              this.snackBar.open("Please Enter the Age", "close")
            }
          }
          else {
            this.snackBar.open("Please Enter the Date of Birth", "close")
          }
        }
        else {
          this.snackBar.open("Please Enter the Degree", "close")
        }
      }
      else {
        this.snackBar.open("Please Enter the Last Name", "close")
      }
    } else {
      this.snackBar.open("Please Enter the First Name", "close")
    }
  }
  submitUser() {
    console.log(this.registrationForm.value)
    this.registerContent = false;
    this.isProgressSpinner = true;
    this.learningStyleService.registerUser(this.registrationForm.value).subscribe((data: any) => {
      if (data['status'] == 'Success') {
        this.isProgressSpinner = false;
        this.router.navigate(['/login'])
      }
      else if (data['status'] == 'Already Registered') {
        this.registerContent = true;
        this.isProgressSpinner = false;
        let snackBarRef = this.snackBar.open("This user is already registered", "close")
        snackBarRef.afterDismissed().subscribe(() => {
          this.router.navigate(['/login']);
        });

      }
      else {
        this.registerContent = true;
        this.isProgressSpinner = false;
        this.snackBar.open("Error Occurred while adding user", "close")
      }
    })
  }
}
