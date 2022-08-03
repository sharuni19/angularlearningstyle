import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatDialog } from '@angular/material/dialog';
import { RatingComponent } from '../rating/rating.component';
import { LearningstyleService } from '../learningstyle.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  totalProgress: any;
  ratingResult: any;
  email: any;
  getAllSubjectLevelCollections: any;
  getUserCompletedLevel: any;
  englishCompletedValue: any;
  computerScienceCompletedValue: any;
  dashboardcontent: boolean = false;
  isProgressSpinner: boolean = true;
  totalProgressToolTipContent: any;
  englishToolTipContent: any;
  computerScienceToolTipContent: any;
  constructor(public dialog: MatDialog, public learningStyleService: LearningstyleService, public router: Router) { }

  ngOnInit() {
    console.log(localStorage.getItem('email'))
    this.email = localStorage.getItem('email')
    this.learningStyleService.getAllSubjectLevelCollections().subscribe((data: any) => {
      console.log(data)
      this.getAllSubjectLevelCollections = data['records']
      console.log(this.getAllSubjectLevelCollections)
      this.learningStyleService.getUserCompletedLevel(this.email).subscribe((data: any) => {
        console.log(data)
        this.getUserCompletedLevel = data['records']
        let englishCompletedLevels = this.getUserCompletedLevel['englishCompletedLevels']
        let computerScienceCompletedLevels = this.getUserCompletedLevel['computerScienceCompletedLevels']
        let totalCompletedLevels = englishCompletedLevels + computerScienceCompletedLevels;
        let overAllLevels = this.getAllSubjectLevelCollections[0]['totalLevels'] + this.getAllSubjectLevelCollections[1]['totalLevels'];
        this.englishCompletedValue = ((englishCompletedLevels) / (this.getAllSubjectLevelCollections[0]['totalLevels']) * 100)
        this.computerScienceCompletedValue = ((computerScienceCompletedLevels) / (this.getAllSubjectLevelCollections[1]['totalLevels']) * 100)
        console.log(this.englishCompletedValue)
        console.log(this.computerScienceCompletedValue)
        this.totalProgress = (((totalCompletedLevels) / (overAllLevels)) * 100)
        console.log(this.totalProgress)
        this.isProgressSpinner = false;
        this.dashboardcontent = true;
        this.totalProgressToolTipContent = totalCompletedLevels + " Levels Completed Out of " + overAllLevels
        this.englishToolTipContent = this.englishCompletedValue + "% completed"
        this.computerScienceToolTipContent = this.computerScienceCompletedValue + "% completed"
      });
    });

  }
  openRatingDialog() {
    const dialogRef = this.dialog.open(RatingComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.ratingResult = result;
      this.learningStyleService.submitFeedback(this.email, this.ratingResult).subscribe((data: any) => {
        console.log('Feedback Submitted')
      })
    });
  }
  getProfilePage() {
    this.router.navigate(['/profile']);
  }
  getSignOut() {
    this.router.navigate(['/login']);
  }
  goToEnglishActivityPortal() {
    this.router.navigate(['/englishactivityportal']);
  }
  goToComputerScienceActivityPortal() {
    this.router.navigate(['/computerscienceactivityportal']);
  }
}
