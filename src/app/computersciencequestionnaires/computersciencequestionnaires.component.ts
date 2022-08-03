import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningstyleService } from '../learningstyle.service';
import { LevelcompletingComponent } from '../levelcompleting/levelcompleting.component';
import { Track } from 'ngx-audio-player';

export interface Tile {
  color: string;
  row: number;
  column: number;
  value: string
}
@Component({
  selector: 'app-computersciencequestionnaires',
  templateUrl: './computersciencequestionnaires.component.html',
  styleUrls: ['./computersciencequestionnaires.component.css']
})
export class ComputersciencequestionnairesComponent implements OnInit {
  questionOneAnswer: any;
  questionTwoAnswer: any;
  questionThreeAnswer: any;
  questionFourAnswer: any;
  questionFiveAnswer: any;
  questionSixAnswer: any;
  questionSevenAnswer: any;
  questionEightAnswer: any;
  questionNineAnswer: any;
  questionTenAnswer: any;
  task1 = false;
  readingLevel2 = false;
  visualLevel2 = false;
  auralLevel2 = false;
  kinesticLevel2 = false;
  readingLevel3 = false;
  visualLevel3 = false;
  auralLevel3 = false;
  kinesticLevel3 = false;
  isProgressSpinner: boolean = false
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = false;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;
  msaapPlaylist: Track[] = [];
  auralLevel2Q1: any = []
  auralLevel2Q2: any = []
  auralLevel2Q3: any = []
  auralLevel2Q4: any = []
  auralLevel2Q5: any = []
  auralLevel2Q6: any = []
  auralLevel2Q7: any = []
  auralLevel2Q8: any = []
  auralLevel2Q9: any = []
  auralLevel2Q10: any = []
  auralLevel3Q1: any = []
  auralLevel3Q2: any = []
  auralLevel3Q3: any = []
  auralLevel3Q4: any = []
  auralLevel3Q5: any = []
  auralLevel3Q6: any = []
  auralLevel3Q7: any = []
  currentLevel: any;
  learningType: any;
  predictionForm: FormGroup;
  email: any;
  tiles: Tile[] = [];
  acrossClues: any = [];
  downclues: any = [];
  entrires: any = 0;
  constructor(public router: Router, public learningStyleService: LearningstyleService, public route: ActivatedRoute, public formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit() {
    this.predictionForm
      = this.formBuilder.group({
        questionOneAnswer: ['', [Validators.required]],
        questionTwoAnswer: ['', [Validators.required]],
        questionThreeAnswer: ['', [Validators.required]],
        questionFourAnswer: ['', [Validators.required]],
        questionFiveAnswer: ['', [Validators.required]],
        questionSixAnswer: ['', [Validators.required]],
        questionSevenAnswer: ['', [Validators.required]],
        questionEightAnswer: ['', [Validators.required]]
      });
    this.currentLevel = this.learningStyleService.computerscienecurrentLevel;
    this.learningType = this.learningStyleService.computersciencelearningType;
    if (this.currentLevel == 'Level 1') {
      this.task1 = true;
    }
    else if (this.currentLevel == 'Level 2') {
      if (this.learningType == 'VISUAL') {
        this.visualLevel2 = true
      }
      else if (this.learningType == 'AURAL') {
        this.auralLevel2 = true
        this.processAuralLevel2();
      }
      else if (this.learningType == 'KINAESTHETIC') {
        this.kinesticLevel2 = true
        this.processKinesticLevel2()
      }
      else {
        this.readingLevel2 = true;
      }
    }
    else if (this.currentLevel == 'Level 3') {
      if (this.learningType == 'VISUAL') {
        this.visualLevel3 = true
      }
      else if (this.learningType == 'AURAL') {
        this.auralLevel3 = true
        this.processAuralLevel3();
      }
      else if (this.learningType == 'KINAESTHETIC') {
        this.kinesticLevel3 = true
        this.processKinesticLevel3()
      }
      else {
        this.readingLevel3 = true;
      }
    }
    this.email = localStorage.getItem('email')
    // this.isProgressSpinner = false
  }

  predictLearningStyle() {
    this.task1 = false;
    this.isProgressSpinner = true;
    console.log(this.predictionForm.value)
    this.learningStyleService.predictUser(this.predictionForm.value).subscribe((data: any) => {
      console.log(data)
      this.task1 = true;
      this.isProgressSpinner = false;
      let learningType = data['LearningType'];
      let dialogRef = this.dialog.open(LevelcompletingComponent, {
        data: {
          heading: 'CONGRATULATIONS',
          level: 'LEVEL 1',
          learningType: data['LearningType'],
          subject: 'COMPUTER SCIENCE'
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.isProgressSpinner = true;
        this.task1 = false;
        this.learningStyleService.updateUserCompletedLevel(localStorage.getItem('email'), 'Computer Science').subscribe((data: any) => {
          console.log(data)
          this.learningStyleService.updateUserLearningType(localStorage.getItem('email'), 'Computer Science', learningType).subscribe((data: any) => {
            console.log(data)
            this.router.navigate(['/computerscienceactivityportal'])
          })
        });
      });
    })
  }
  processKinesticLevel2() {
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        let isChanged = false;
        if (i == 1) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
          isChanged = true
        }
        if ((i >= 0 && i <= 4) && j == 1) {
          if (!isChanged) {
            this.tiles.push({ color: 'white', row: i, column: j, value: '' })
            isChanged = true
          }
        }
        if ((i >= 0 && i <= 7) && j == 3) {
          if (!isChanged) {
            this.tiles.push({ color: 'white', row: i, column: j, value: '' })
            isChanged = true
          }
        }
        if ((j >= 0 && j <= 6) && i == 7) {
          if (!isChanged) {
            this.tiles.push({ color: 'white', row: i, column: j, value: '' })
            isChanged = true
          }
        }
        if ((i >= 3 && i <= 10) && j == 5) {
          if (!isChanged) {
            this.tiles.push({ color: 'white', row: i, column: j, value: '' })
            isChanged = true
          }
        }
        if (i == 9 && j >= 3) {
          if (!isChanged) {
            this.tiles.push({ color: 'white', row: i, column: j, value: '' })
            isChanged = true
          }
        }
        if (i >= 8 && j == 8) {
          if (!isChanged) {
            this.tiles.push({ color: 'white', row: i, column: j, value: '' })
            isChanged = true
          }
        }
        if ((i >= 1 && i <= 5) && j == 9) {
          if (!isChanged) {
            this.tiles.push({ color: 'white', row: i, column: j, value: '' })
            isChanged = true
          }
        }
        if (i == 4 && (j >= 7 && j <= 9)) {
          if (!isChanged) {
            this.tiles.push({ color: 'white', row: i, column: j, value: '' })
            isChanged = true
          }
        }
        if (!isChanged) {
          this.tiles.push({ color: 'black', row: i, column: j, value: '' })
        }
      }
    }
    console.log(this.tiles.length)
    this.acrossClues = ['1. Brain', '2. Source', '3. Most Common OS', '4. Tangible Device',]
    this.downclues = ['1. Free', '2. Pointing Device', '3. Primary input', '4. Intangible', '5. Temporary Storage']

  }
  processKinesticLevel3() {
    this.questionOneAnswer = 'monitor';
    this.questionTwoAnswer = 'keyboard';
    this.questionThreeAnswer = 'mouse';
    this.questionFourAnswer = 'web camera';
    this.questionFiveAnswer = 'speakers';
    this.questionSixAnswer = 'microphone';
    this.questionSevenAnswer = 'printer';
    this.questionEightAnswer = 'scanner';
    this.questionNineAnswer = 'headphone';
    this.questionTenAnswer = 'flashdrive';
  }
  processAuralLevel2() {
    this.msaapPlaylist = [
      {
        title: 'Aural Level 2',
        link: 'assets/ComputerScienceAuralLevel2.mp3',
      }
    ];
    this.auralLevel2Q1 = ['31', '32', '63', '64'];
    this.auralLevel2Q2 = ['Variable names cannot start with a digit', 'Variable can be of any length', 'They can contain alphanumeric characters as well as special characters', 'Reserved Word can be used as variable name'];
    this.auralLevel2Q3 = ['TRUE', 'friend', 'export', 'volatile'];
    this.auralLevel2Q4 = ['Compilations Error', '10', '10.1'];
    this.auralLevel2Q5 = ['Syntax error in declaration of a', 'No errors, program will show the output 5', 'Redeclaration of a in same scope throws error', 'a is out of scope when printf is called'];
    this.auralLevel2Q6 = ['2', '25', 'Compilation Error', 'Runtime Error'];
    this.auralLevel2Q7 = ['3', '5', 'Compilation Error', 'Runtime Error'];
    this.auralLevel2Q8 = ['Garbage Value', 'Compilation Error', '30', 'Runtime Error'];
    this.auralLevel2Q9 = ['5', 'Garbage Value', 'Compilation Error', 'Runtime Error'];
    this.auralLevel2Q10 = ['10', 'Garbage Value', 'Compilation Error', 'Runtime Error'];
  }
  processAuralLevel3() {
    this.msaapPlaylist = [
      {
        title: 'Aural Level 3',
        link: 'assets/ComputerScienceAuralLevel3.mp3',
      }
    ];
    this.auralLevel3Q1 = ['List', 'Sequence', 'Collection', 'Series'];
    this.auralLevel3Q2 = ['A set of instructions in a specific order', 'Where instructions repeat', 'Code where decisions are made', 'Only 1 instruction gets run'];
    this.auralLevel3Q3 = ['A set of instructions in a specific order', 'Where instructions repeat', 'Code where decisions are made', 'Only 1 instruction gets run'];
    this.auralLevel3Q4 = ['A set of instructions in a specific order', 'Where instructions repeat', 'Code where decisions are made', 'Only 1 instruction gets run'];
    this.auralLevel3Q5 = ['Sequencing', 'Iterating', 'Selecting', 'Nothing'];
    this.auralLevel3Q6 = ['It determines the order in which instructions are carried out', 'It allows code to be simplified by removing duplicated steps', 'It allows multiple paths through a program', 'It chooses what steps to run'];
    this.auralLevel3Q7 = ['Selection allows us to include more than one path to a solution', 'Selection allows us to repeat steps in a solution', 'Selection allows us make our solution more efficient', 'Selection allows us to run every piece of code from top to bottom'];
  }
  submitReadingLevel2() {
    this.readingLevel2 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase().includes('invention of computers')) {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase().includes('complex mathematical problems')) {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase().includes('traffic jams')) {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase().includes('work for humans')) {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase().includes('never lead independent lives')) {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase().includes('without any difficulty or to read foreign publications')) {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase().includes('small enough to carry in the pocket')) {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase().includes('weather conditions')) {
      points += 1;
    }
    console.log(points)
    let overAllPoints = points * 2.5;
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'Computer Science', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 4) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'Computer Science').subscribe((data: any) => {
          this.readingLevel2 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 2',
              subject: 'Computer Science',
              scoredPoints: points,
              totalPoints: 8
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/computerscienceactivityportal'])
          });
        })
      } else {
        this.readingLevel2 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 2',
            subject: 'Computer Science',
            scoredPoints: points,
            totalPoints: 8
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/computerscienceactivityportal'])
        });
      }
    })
  }
  submitReadingLevel3() {
    this.readingLevel3 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase().includes('create and send documents')) {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase().includes('main document, data source, merged document')) {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase().includes('text and graphics')) {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase().includes('personalized copy')) {
      points += 1;
    }
    console.log(points)
    let overAllPoints = points * 5;
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'Computer Science', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 2) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'Computer Science').subscribe((data: any) => {
          this.readingLevel3 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 3',
              subject: 'Computer Science',
              scoredPoints: points,
              totalPoints: 4
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/computerscienceactivityportal'])
          });
        })
      } else {
        this.readingLevel3 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 3',
            subject: 'Computer Science',
            scoredPoints: points,
            totalPoints: 4
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/computerscienceactivityportal'])
        });
      }
    })
  }
  submitVisualLevel2() {
    this.visualLevel2 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'network') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'computer virus') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'apple iphone') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'keyboard') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'email') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'pen drive') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'screen resolution') {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'remote desktop connection') {
      points += 1;
    }
    if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == 'download') {
      points += 1;
    }
    if (this.questionTenAnswer != undefined && this.questionTenAnswer.toLowerCase() == 'mother board') {
      points += 1;
    }
    let overAllPoints = points * 2;
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'Computer Science', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 5) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'Computer Science').subscribe((data: any) => {
          this.visualLevel2 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 2',
              subject: 'Computer Science',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/computerscienceactivityportal'])
          });
        })
      } else {
        this.visualLevel2 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 2',
            subject: 'Computer Science',
            scoredPoints: points,
            totalPoints: 10
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/computerscienceactivityportal'])
        });
      }
    })
  }
  submitVisualLevel3() {
    this.visualLevel3 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'whats app') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'screenshot') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'search engine') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'home page') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'backspace') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'password') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'usb') {
      points += 1;
    }

    let overAllPoints = points * 2.85;
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'Computer Science', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 4) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'Computer Science').subscribe((data: any) => {
          this.visualLevel3 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 3',
              subject: 'Computer Science',
              scoredPoints: points,
              totalPoints: 7
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/computerscienceactivityportal'])
          });
        })
      } else {
        this.visualLevel3 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 3',
            subject: 'Computer Science',
            scoredPoints: points,
            totalPoints: 7
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/computerscienceactivityportal'])
        });
      }
    })
  }
  submitKinesticLevel2() {
    this.kinesticLevel2 = false;
    this.isProgressSpinner = true;
    let points = 0;
    this.questionOneAnswer = ''
    this.questionTwoAnswer = ''
    this.questionThreeAnswer = ''
    this.questionFourAnswer = ''
    this.questionFiveAnswer = ''
    this.questionSixAnswer = ''
    this.questionSevenAnswer = ''
    this.questionEightAnswer = ''
    this.questionNineAnswer = ''
    this.questionTenAnswer = ''
    for (let k = 0; k < this.tiles.length; k++) {
      let i = this.tiles[k]['row']
      let j = this.tiles[k]['column']
      let value = this.tiles[k]['value']
      if (i == 1) {
        this.questionOneAnswer += value
      }
      if ((i >= 0 && i <= 4) && j == 1) {
        this.questionTwoAnswer += value
      }
      if ((i >= 0 && i <= 7) && j == 3) {
        this.questionThreeAnswer += value
      }
      if ((j >= 0 && j <= 6) && i == 7) {
        this.questionFourAnswer += value
      }
      if ((i >= 3 && i <= 10) && j == 5) {
        this.questionFiveAnswer += value
      }
      if (i == 9 && j >= 3) {
        this.questionSixAnswer += value
      }
      if (i >= 8 && j == 8) {
        this.questionSevenAnswer += value
      }
      if ((i >= 1 && i <= 5) && j == 9) {
        this.questionEightAnswer += value
      }
      if (i == 4 && (j >= 7 && j <= 9)) {
        this.questionNineAnswer += value
      }
    }
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'powersupply') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'mouse') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'keyboard') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'windows') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'software') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'hardware') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'ram') {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'linux') {
      points += 1;
    }
    if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == 'cpu') {
      points += 1;
    }
    let overAllPoints = points * 2.22;
    console.log(points)
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'Computer Science', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 5) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'Computer Science').subscribe((data: any) => {
          this.kinesticLevel2 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 2',
              subject: 'Computer Science',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/computerscienceactivityportal'])
          });
        })
      } else {
        this.kinesticLevel2 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 2',
            subject: 'Computer Science',
            scoredPoints: points,
            totalPoints: 10
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/computerscienceactivityportal'])
        });
      }
    })
  }
  submitKinesticLevel3() {
    this.kinesticLevel3 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.entrires > 0) {
      if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'monitor') {
        points += 1;
      }
      if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'keyboard') {
        points += 1;
      }
      if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'mouse') {
        points += 1;
      }
      if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'webcamera') {
        points += 1;
      }
      if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'speakers') {
        points += 1;
      }
      if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'microphone') {
        points += 1;
      }
      if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'printer') {
        points += 1;
      }
      if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'scanner') {
        points += 1;
      }
      if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == 'headphone') {
        points += 1;
      }
      if (this.questionTenAnswer != undefined && this.questionTenAnswer.toLowerCase() == 'flashdrive') {
        points += 1;
      }
      let overAllPoints = points * 2;
      console.log(points)
      this.learningStyleService.updateLeaderBoardPoints(this.email, 'Computer Science', overAllPoints).subscribe((data: any) => {
        if (data['Status'] == 'Success' && points >= 5) {
          this.learningStyleService.updateUserCompletedLevel(this.email, 'Computer Science').subscribe((data: any) => {
            this.kinesticLevel3 = true;
            this.isProgressSpinner = false;
            let dialogRef = this.dialog.open(LevelcompletingComponent, {
              data: {
                heading: 'CONGRATULATIONS',
                level: 'LEVEL 3',
                subject: 'Computer Science',
                scoredPoints: points,
                totalPoints: 10
              },
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.router.navigate(['/computerscienceactivityportal'])
            });
          })
        } else {
          this.kinesticLevel3 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'SORRY',
              level: 'LEVEL 3',
              subject: 'Computer Science',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/computerscienceactivityportal'])
          });
        }
      })
    } else {
      this.kinesticLevel3 = true;
      this.isProgressSpinner = false;
      let dialogRef = this.dialog.open(LevelcompletingComponent, {
        data: {
          heading: 'SORRY',
          level: 'LEVEL 3',
          subject: 'Computer Science',
          scoredPoints: points,
          totalPoints: 10
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.router.navigate(['/computerscienceactivityportal'])
      });
    }

  }
  submitAuralLevel2Data() {
    this.auralLevel2 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == '32') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'variable names cannot start with a digit') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'volatile') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'compilations error') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'syntax error in declaration of a') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'compilation error') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'compilation error') {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == '30') {
      points += 1;
    }
    if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == '5') {
      points += 1;
    }
    if (this.questionTenAnswer != undefined && this.questionTenAnswer.toLowerCase() == '10') {
      points += 1;
    }
    let overAllPoints = points * 2;
    console.log(points)
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'Compputer Science', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 5) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'Computer Science').subscribe((data: any) => {
          this.auralLevel2 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 2',
              subject: 'Computer Science',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/computerscienceactivityportal'])
          });
        })
      } else {
        this.auralLevel2 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 2',
            subject: 'Computer Science',
            scoredPoints: points,
            totalPoints: 10
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/computerscienceactivityportal'])
        });
      }
    })
  }
  submitAuralLevel3Data() {
    this.auralLevel3 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'sequence') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'a set of instructions in a specific order') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'only 1 instruction gets run') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'where instructions repeat') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'iterating') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'it allows multiple paths through a program') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'selection allows us to include more than one path to a solution') {
      points += 1;
    }
    let overAllPoints = points * 2.85;
    console.log(points)
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'Computer Science', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 4) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'Computer Science').subscribe((data: any) => {
          this.auralLevel3 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 3',
              subject: 'Computer Science',
              scoredPoints: points,
              totalPoints: 7
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/computerscienceactivityportal'])
          });
        })
      } else {
        this.auralLevel3 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 3',
            subject: 'Computer Science',
            scoredPoints: points,
            totalPoints: 7
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/computerscienceactivityportal'])
        });
      }
    })
  }
  addTileValueEvent(event: any, tile: any) {
    tile['value'] = event.target.value
  }
  fillAnswer(event: any, index: any, question: any) {
    this.entrires += 1
    if (question == 'Q1') {
      var splitValue = this.questionOneAnswer.split("")
      splitValue[index] = event.target.value
      this.questionOneAnswer = splitValue.toString()
      this.questionOneAnswer = this.questionOneAnswer.replaceAll(",", "")
    }
    if (question == 'Q2') {
      var splitValue = this.questionTwoAnswer.split("")
      splitValue[index] = event.target.value
      this.questionTwoAnswer = splitValue.toString()
      this.questionTwoAnswer = this.questionTwoAnswer.replaceAll(",", "")
    }
    if (question == 'Q3') {
      var splitValue = this.questionThreeAnswer.split("")
      splitValue[index] = event.target.value
      this.questionThreeAnswer = splitValue.toString()
      this.questionThreeAnswer = this.questionThreeAnswer.replaceAll(",", "")
    }
    if (question == 'Q4') {
      var splitValue = this.questionFourAnswer.split("")
      splitValue[index] = event.target.value
      this.questionFourAnswer = splitValue.toString()
      this.questionFourAnswer = this.questionFourAnswer.replaceAll(",", "")
    }
    if (question == 'Q5') {
      var splitValue = this.questionFiveAnswer.split("")
      splitValue[index] = event.target.value
      this.questionFiveAnswer = splitValue.toString()
      this.questionFiveAnswer = this.questionFiveAnswer.replaceAll(",", "")
    }
    if (question == 'Q6') {
      var splitValue = this.questionSixAnswer.split("")
      splitValue[index] = event.target.value
      this.questionSixAnswer = splitValue.toString()
      this.questionSixAnswer = this.questionSixAnswer.replaceAll(",", "")
    }
    if (question == 'Q7') {
      var splitValue = this.questionSevenAnswer.split("")
      splitValue[index] = event.target.value
      this.questionSevenAnswer = splitValue.toString()
      this.questionSevenAnswer = this.questionSevenAnswer.replaceAll(",", "")
    }
    if (question == 'Q8') {
      var splitValue = this.questionEightAnswer.split("")
      splitValue[index] = event.target.value
      this.questionEightAnswer = splitValue.toString()
      this.questionEightAnswer = this.questionEightAnswer.replaceAll(",", "")
    }
    if (question == 'Q9') {
      var splitValue = this.questionNineAnswer.split("")
      splitValue[index] = event.target.value
      this.questionNineAnswer = splitValue.toString()
      this.questionNineAnswer = this.questionNineAnswer.replaceAll(",", "")
    }
    if (question == 'Q10') {
      var splitValue = this.questionTenAnswer.split("")
      splitValue[index] = event.target.value
      this.questionTenAnswer = splitValue.toString()
      this.questionTenAnswer = this.questionTenAnswer.replaceAll(",", "")
    }
  }
  onEnded(event: any) {
    console.log('ended');
  }
}
