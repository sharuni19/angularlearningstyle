import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningstyleService } from '../learningstyle.service';

@Component({
  selector: 'app-computerscienceactivityportal',
  templateUrl: './computerscienceactivityportal.component.html',
  styleUrls: ['./computerscienceactivityportal.component.css']
})
export class ComputerscienceactivityportalComponent implements OnInit {
  rank: any;
  points: any;
  levels: any;
  email: any;
  originalLevelsData: any;
  isLearningTypeIdentified: boolean = false;
  isProgressSpinner: boolean = true;
  computerScienceActivityContent: boolean = false;
  status = ['Completed', 'Not Completed', 'All'];
  levelName = [
    'Level 1',
    'Level 2',
    'All',
  ];
  selectedStatus: any;
  selectedLevel: any;
  getAllSubjectLevelCollections: any;
  getUserCompletedLevel: any;
  computerScienceCompletedValue: any;
  learningType: any;
  constructor(public router: Router, public learningStyleService: LearningstyleService) { }

  ngOnInit() {
    this.email = localStorage.getItem('email');
    this.originalLevelsData = [
      {
        Level: 'Level 1',
        Description: 'Questionnaire to identify learning style of the user',
        Completed: false,
      },
      {
        Level: 'Level 2',
        Description: 'Questionnaire to identify learning style of the user',
        Completed: false,
      },
      {
        Level: 'Level 3',
        Description: 'Questionnaire to identify learning style of the user',
        Completed: false,
      },
    ];
    this.levels = this.originalLevelsData;
    this.learningStyleService.getRankAndPoints(this.email, 'Computer Science').subscribe((data: any) => {
      this.rank = data['records']['rank']
      this.points = data['records']['points']
      this.learningStyleService.getAllSubjectLevelCollections().subscribe((data: any) => {
        console.log(data)
        this.getAllSubjectLevelCollections = data['records']
        console.log(this.getAllSubjectLevelCollections)
        this.learningStyleService.getUserCompletedLevel(this.email).subscribe((data: any) => {
          console.log(data)
          this.getUserCompletedLevel = data['records']
          let computerScienceCompletedLevels = this.getUserCompletedLevel['computerScienceCompletedLevels']
          let overAllLevels = this.getAllSubjectLevelCollections[1]['totalLevels']
          this.computerScienceCompletedValue = ((computerScienceCompletedLevels) / (overAllLevels) * 100).toFixed(2)
          this.learningType = this.getUserCompletedLevel['computerScienceLearningType']
          if (this.learningType != undefined) {
            this.isLearningTypeIdentified = true;
          }
          for (let i = 0; i < computerScienceCompletedLevels; i++) {
            this.originalLevelsData[i]['Completed'] = true
          }
          this.levels = this.originalLevelsData;
          this.computerScienceActivityContent = true;
          this.isProgressSpinner = false;
          console.log(this.isProgressSpinner)
        });
      });

    })
  }

  getStatusFilter(event: any) {
    console.log(event);
    this.levels = [];
    for (var val of this.originalLevelsData) {
      if (event['value'] == 'Completed' && val['Completed'] == true) {
        this.levels.push(val);
      } else if (
        event['value'] == 'Not Completed' &&
        val['Completed'] == false
      ) {
        this.levels.push(val);
      } else if (event['value'] == 'All') {
        this.levels.push(val);
      }
    }
  }
  getLevelFilter(event: any) {
    console.log(event);
    this.levels = [];
    for (var val of this.originalLevelsData) {
      if (event['value'].trim() === val['Level'].trim()) {
        this.levels.push(val);
      } else if (event['value'].trim() === 'All') {
        this.levels.push(val);
      }
    }
  }
  proceedActivity(level: any) {
    this.learningStyleService.computerscienecurrentLevel = level['Level'];
    this.learningStyleService.computersciencelearningType = this.learningType
    console.log(this.learningStyleService.computerscienecurrentLevel)
    this.router.navigate(['/computerquestionnaires'])
  }
  backtodashboard() {
    this.router.navigate(['/dashboard'])
  }
}
