import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LearningstyleService } from '../learningstyle.service';

@Component({
  selector: 'app-englishactivityportal',
  templateUrl: './englishactivityportal.component.html',
  styleUrls: ['./englishactivityportal.component.css'],
})
export class EnglishactivityportalComponent implements OnInit {
  rank: any;
  points: any;
  levels: any;
  email: any;
  originalLevelsData: any;
  isLearningTypeIdentified: boolean = false;
  isProgressSpinner: boolean = true;
  englishactivityContent: boolean = false;
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
  englishCompletedValue: any;
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
    this.learningStyleService.getRankAndPoints(this.email, 'English').subscribe((data: any) => {
      this.rank = data['records']['rank']
      this.points = data['records']['points']
      this.learningStyleService.getAllSubjectLevelCollections().subscribe((data: any) => {
        console.log(data)
        this.getAllSubjectLevelCollections = data['records']
        console.log(this.getAllSubjectLevelCollections)
        this.learningStyleService.getUserCompletedLevel(this.email).subscribe((data: any) => {
          console.log(data)
          this.getUserCompletedLevel = data['records']
          let englishCompletedLevel = this.getUserCompletedLevel['englishCompletedLevels']
          let overAllLevels = this.getAllSubjectLevelCollections[0]['totalLevels']
          this.englishCompletedValue = ((englishCompletedLevel) / (overAllLevels) * 100).toFixed(2)
          this.learningType = this.getUserCompletedLevel['englishLeaningType']
          if (this.learningType != undefined) {
            this.isLearningTypeIdentified = true;
          }
          for (let i = 0; i < englishCompletedLevel; i++) {
            this.originalLevelsData[i]['Completed'] = true
          }
          this.levels = this.originalLevelsData;
          this.englishactivityContent = true;
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
    this.learningStyleService.englishcurrentLevel = level['Level'];
    this.learningStyleService.englishlearningType = this.learningType
    console.log(this.learningStyleService.englishcurrentLevel)
    this.router.navigate(['/englishquestionnaires'])
  }
  backtodashboard() {
    this.router.navigate(['/dashboard'])
  }
}
