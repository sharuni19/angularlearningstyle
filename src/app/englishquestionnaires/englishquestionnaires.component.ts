import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningstyleService } from '../learningstyle.service';
import { MatDialog } from '@angular/material/dialog';
import { LevelcompletingComponent } from '../levelcompleting/levelcompleting.component';
import { Track } from 'ngx-audio-player';


export interface Tile {
  color: string;
  row: number;
  column: number;
  value: string
}

@Component({
  selector: 'app-englishquestionnaires',
  templateUrl: './englishquestionnaires.component.html',
  styleUrls: ['./englishquestionnaires.component.css']
})
export class EnglishquestionnairesComponent implements OnInit {
  email: any;
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
  currentLevel: any;
  learningType: any;
  predictionForm: FormGroup;
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = false;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;
  msaapPlaylist: Track[] = [];
  auralLevel3Q1: any = []
  auralLevel3Q2: any = []
  auralLevel3Q3: any = []
  auralLevel3Q4: any = []
  auralLevel3Q5: any = []
  readingLevel2Q1: any = []
  readingLevel2Q2: any = []
  readingLevel2Q3: any = []
  readingLevel2Q4: any = []
  readingLevel2Q5: any = []
  readingLevel2Q6: any = []
  readingLevel3Q1: any = []
  readingLevel3Q2: any = []
  visualLevel3Q1: any = []
  visualLevel3Q2: any = []
  visualLevel3Q3: any = []
  visualLevel3Q4: any = []
  visualLevel3Q5: any = []
  visualLevel3Q6: any = []
  visualLevel3Q7: any = []
  visualLevel3Q8: any = []
  visualLevel3Q9: any = []
  visualLevel3Q10: any = []
  tiles: Tile[] = [];
  acrossClues: any = [];
  downclues: any = [];
  reverseClues: any = [];
  entrires: any = 0;
  constructor(public router: Router, public learningStyleService: LearningstyleService, public route: ActivatedRoute, public formBuilder: FormBuilder, public dialog: MatDialog) { }


  ngOnInit() {
    this.isProgressSpinner = true;
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
    this.currentLevel = this.learningStyleService.englishcurrentLevel;
    this.learningType = this.learningStyleService.englishlearningType;
    console.log(this.currentLevel = this.learningStyleService.englishcurrentLevel)
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
        this.processKinestcLevel2();
      }
      else {
        this.readingLevel2 = true;
        this.processReadingLevel2();
      }
    }
    else if (this.currentLevel == 'Level 3') {
      if (this.learningType == 'VISUAL') {
        this.visualLevel3 = true
        this.processVisualLevel3()
      }
      else if (this.learningType == 'AURAL') {
        this.auralLevel3 = true
        this.processAuralLevel3();
      }
      else if (this.learningType == 'KINAESTHETIC') {
        this.kinesticLevel3 = true
        this.processKinestcLevel3();
      }
      else {
        this.readingLevel3 = true;
        this.processReadingLevel3();
      }
    }
    this.email = localStorage.getItem('email')
    this.isProgressSpinner = false
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
          subject: 'English'
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.isProgressSpinner = true;
        this.task1 = false;
        this.learningStyleService.updateUserCompletedLevel(localStorage.getItem('email'), 'English').subscribe((data: any) => {
          console.log(data)
          this.learningStyleService.updateUserLearningType(localStorage.getItem('email'), 'English', learningType).subscribe((data: any) => {
            console.log(data)
            this.router.navigate(['/englishactivityportal'])
          })
        });
      });
    })
  }
  onEnded(event: any) {
    console.log('ended');
  }
  processAuralLevel2() {
    this.msaapPlaylist = [
      {
        title: 'Aural Level 2',
        link: 'assets/EnglishAuralLevel2.mp3',
      }
    ];
  }
  processAuralLevel3() {
    this.msaapPlaylist = [
      {
        title: 'Aural Level 3',
        link: 'assets/EnglishAuralLevel3.mp3',
      }
    ];
    this.auralLevel3Q1 = ['five times a year to honour the city', 'on the park’s important birthday', 'to remember the history of the park'];
    this.auralLevel3Q2 = ['1955', '1979', 'the 1990s'];
    this.auralLevel3Q3 = ['a children’s play area', 'a petting zoo', 'two of the early rides'];
    this.auralLevel3Q4 = ['tall and made of wood', 'designed for smaller children', 'very fast and exciting '];
    this.auralLevel3Q5 = ['Yellow', 'Blue', 'Black'];
  }
  processReadingLevel2() {
    this.readingLevel2Q1 = ['TRUE', 'FALSE'];
    this.readingLevel2Q2 = ['cleaned shoes', 'washed floors', 'washed windows', 'begged'];
    this.readingLevel2Q3 = ['Ship', 'Shoe Shop', 'Horse', 'Pub'];
    this.readingLevel2Q4 = ['Pirates', 'Seamen', 'Teachers', 'Butlers'];
    this.readingLevel2Q5 = ['Funny', 'Sad', 'Strange', 'Suprise'];
    this.readingLevel2Q6 = ['West Indies', 'Cuban Republic', 'Madagascan Peninusula', 'Jamaican Islands'];
  }
  processReadingLevel3() {
    this.readingLevel3Q1 = ['Beauty is only skin deep', 'Everything is beautiful in its natural state', 'There is beauty in nature', 'Nature is a moral teacher'];
    this.readingLevel3Q2 = ['Freedom for all', 'Better life', 'Compassion for all', 'None of the above'];
  }
  processVisualLevel3() {
    this.visualLevel3Q1 = ['Is snowing', 'Has been snowing', 'Have been snowing', 'Was snowing']
    this.visualLevel3Q2 = ['Are ailing', 'Is ailing', 'Has been ailing', 'Have been ailing']
    this.visualLevel3Q3 = ['Has carried', 'Has been carried', 'Was carried', 'Was carrying']
    this.visualLevel3Q4 = ['Three songs are sung by Shriya', 'Three songs has been sung by Shriya', 'Three songs have been sung by Shriya', 'Three songs had been sung by Shriya']
    this.visualLevel3Q5 = ['The lands was being plowed by the farmer', 'The lands were being plowed by the farmer', 'The lands were plowed by the farmer', 'The lands were being plowed by farmer']
    this.visualLevel3Q6 = ['I would be called by him', 'I will be called by him', 'I will called by him', 'I will be hate by him']
    this.visualLevel3Q7 = ['He must helped by you', 'He must helped you', 'He must get help from you', 'He must be helped by you']
    this.visualLevel3Q8 = ['Your bike has been seen?', 'Anybody has seen your bike?', 'Has your bike been seen?', 'Have you seen your bike?']
    this.visualLevel3Q9 = ['Sam ought to had been saved', 'Sam ought to have been save', 'Sam ought to have been saved', 'Sam ought to have saved']
    this.visualLevel3Q10 = ['A massive tribal welfare program is launched by us', 'A massive tribal welfare program has been launched by us', 'We has launched a massive tribal welfare program', 'We have launched a massive tribal welfare program']
  }
  processKinestcLevel2() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (i === 0 && (j >= 5 && j <= 8)) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if (i === 1 && (j >= 10 && j <= 19)) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if ((i >= 2 && i <= 7) && j == 15) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if ((i >= 3 && i <= 9) && j == 3) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if (i === 9 && (j >= 3 && j <= 7)) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if (i === 4 && (j >= 6 && j <= 13)) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if ((i >= 4 && i <= 11) && j == 19) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if (i === 12 && (j >= 6 && j <= 13)) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if ((i >= 6 && i <= 11) && j == 10) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else if ((i >= 11 && i <= 18) && j == 17) {
          this.tiles.push({ color: 'white', row: i, column: j, value: '' })
        }
        else {
          this.tiles.push({ color: 'black', row: i, column: j, value: '' })
        }
      }
    }
    this.acrossClues = ['1. Enormous', '2. Commissioned', '3. Expand', '4. Obeying', '5. Fresh']
    this.downclues = ['1. Artificial', '2. Relinquish', '3. Mortal', '4. Aware']
    this.reverseClues = ['1.BUSY']
  }
  processKinestcLevel3() {
    this.questionOneAnswer = 'goes';
    this.questionTwoAnswer = 'shifted';
    this.questionThreeAnswer = 'play';
    this.questionFourAnswer = 'burnt';
    this.questionFiveAnswer = 'done';
    this.questionSixAnswer = 'sleeping';
    this.questionSevenAnswer = 'see';
    this.questionEightAnswer = 'watering';
    this.questionNineAnswer = 'gets';
    this.questionTenAnswer = 'been';
  }
  submitAuralLevel2Data() {
    this.auralLevel2 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'marshall') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == '180 days') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == '3.85') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'monthly interest') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'maximum') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'income bracket') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == '12000') {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'no fees') {
      points += 1;
    }
    if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == 'quarterly') {
      points += 1;
    }
    if (this.questionTenAnswer != undefined && this.questionTenAnswer.toLowerCase() == 'by phone') {
      points += 1;
    }
    let overAllPoints = points * 2;
    console.log(points)
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'English', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 5) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'English').subscribe((data: any) => {
          this.auralLevel2 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 2',
              subject: 'English',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/englishactivityportal'])
          });
        })
      } else {
        this.auralLevel2 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 2',
            subject: 'English',
            scoredPoints: points,
            totalPoints: 10
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/englishactivityportal'])
        });
      }
    })
  }
  submitAuralLevel3Data() {
    this.auralLevel3 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'to remember the history of the park') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == '1979') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'a petting zoo') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'tall and made of wood') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'black') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'food stands') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'main street') {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'hollywood') {
      points += 1;
    }
    if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == 'first aid') {
      points += 1;
    }
    if (this.questionTenAnswer != undefined && this.questionTenAnswer.toLowerCase() == 'guard stations') {
      points += 1;
    }
    let overAllPoints = points * 2;
    console.log(points)
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'English', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 5) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'English').subscribe((data: any) => {
          this.auralLevel3 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 3',
              subject: 'English',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/englishactivityportal'])
          });
        })
      } else {
        this.auralLevel3 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 3',
            subject: 'English',
            scoredPoints: points,
            totalPoints: 10
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/englishactivityportal'])
        });
      }
    })
  }
  submitReadingLevel2() {
    this.readingLevel2 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'TRUE') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'cleaned shoes') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'pub') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'seamen') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'funny') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'west indies') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase().includes('flanders')) {
      points += 1;
    }
    console.log(points)
    let overAllPoints = points * 2.85;
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'English', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 4) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'English').subscribe((data: any) => {
          this.readingLevel2 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 2',
              subject: 'English',
              scoredPoints: points,
              totalPoints: 7
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/englishactivityportal'])
          });
        })
      } else {
        this.readingLevel2 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 2',
            subject: 'English',
            scoredPoints: points,
            totalPoints: 7
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/englishactivityportal'])
        });
      }
    })
  }
  submitReadingLevel3() {
    this.readingLevel3 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'There is beauty in nature') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'Better life') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'Great son') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'He was so tall that he looked like a giant. Secondly, he had long hair') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'He came to New York on a lecture tour') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'Oscar Wilde was not interested in answering the questions of reporters because they asked him unimportant questions') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'The answer shows his wit and sense of humour') {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'Genius') {
      points += 1;
    }
    console.log(points)
    let overAllPoints = points * 2.5;
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'English', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 2) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'English').subscribe((data: any) => {
          this.readingLevel3 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 3',
              subject: 'English',
              scoredPoints: points,
              totalPoints: 8
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/englishactivityportal'])
          });
        })
      } else {
        this.readingLevel3 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 3',
            subject: 'English',
            scoredPoints: points,
            totalPoints: 8
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/englishactivityportal'])
        });
      }
    })
  }
  submitVisualLevel2() {
    this.visualLevel2 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && (this.questionOneAnswer.toLowerCase().includes('straight') || this.questionOneAnswer.toLowerCase().includes('right'))) {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && (this.questionTwoAnswer.toLowerCase().includes('1st street') || this.questionTwoAnswer.toLowerCase().includes('bank'))) {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && (this.questionThreeAnswer.toLowerCase().includes('anna salai') || this.questionThreeAnswer.toLowerCase().includes('hospital'))) {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && (this.questionFourAnswer.toLowerCase().includes('right') || this.questionFourAnswer.toLowerCase().includes('library'))) {
      points += 1;
    }
    console.log(points)
    let overAllPoints = points * 5;
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'English', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 2) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'English').subscribe((data: any) => {
          this.visualLevel2 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 2',
              subject: 'English',
              scoredPoints: points,
              totalPoints: 4
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/englishactivityportal'])
          });
        })
      } else {
        this.visualLevel2 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 2',
            subject: 'English',
            scoredPoints: points,
            totalPoints: 4
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/englishactivityportal'])
        });
      }
    })
  }
  submitVisualLevel3() {
    this.visualLevel3 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'has been snowing') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'has been ailing') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'was carried') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'three songs have been sung by shriya') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'the lands were being plowed by the farmer') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'i will be called by him') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'he must be helped by you') {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'has your bike been seen?') {
      points += 1;
    }
    if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == 'sam ought to have been saved') {
      points += 1;
    }
    if (this.questionTenAnswer != undefined && this.questionTenAnswer.toLowerCase() == 'a massive tribal welfare program has been launched by us') {
      points += 1;
    }
    let overAllPoints = points * 2;
    console.log(points)
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'English', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 5) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'English').subscribe((data: any) => {
          this.visualLevel3 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 3',
              subject: 'English',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/englishactivityportal'])
          });
        })
      } else {
        this.visualLevel3 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 3',
            subject: 'English',
            scoredPoints: points,
            totalPoints: 10
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/englishactivityportal'])
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
      if (i === 0 && (j >= 5 && j <= 8)) {
        this.questionOneAnswer += value;
      }
      if (i === 1 && (j >= 10 && j <= 19)) {
        this.questionTwoAnswer += value
      }
      if ((i >= 1 && i <= 7) && j == 15) {
        this.questionThreeAnswer += value
      }
      if ((i >= 3 && i <= 9) && j == 3) {
        this.questionFourAnswer += value
      }
      if (i === 9 && (j >= 2 && j <= 7)) {
        this.questionFiveAnswer += value
      }
      if (i === 4 && (j >= 6 && j <= 13)) {
        this.questionSixAnswer += value
      }
      if ((i >= 4 && i <= 11) && j == 19) {
        this.questionSevenAnswer += value
      }
      if (i === 12 && (j >= 6 && j <= 13)) {
        this.questionEightAnswer += value
      }
      if ((i >= 6 && i <= 12) && j == 10) {
        this.questionNineAnswer += value
      }
      if ((i >= 11 && i <= 18) && j == 17) {
        this.questionTenAnswer += value
      }
    }
    this.questionNineAnswer = this.questionNineAnswer.split("").reverse().join("")
    if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'tiny') {
      points += 1;
    }
    if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'terminated') {
      points += 1;
    }
    if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'natural') {
      points += 1;
    }
    if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'possess') {
      points += 1;
    }
    if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'slate') {
      points += 1;
    }
    if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'condense') {
      points += 1;
    }
    if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'immortal') {
      points += 1;
    }
    if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'ordering') {
      points += 1;
    }
    if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == 'relaxed') {
      points += 1;
    }
    if (this.questionTenAnswer != undefined && this.questionTenAnswer.toLowerCase() == 'ignorant') {
      points += 1;
    }
    let overAllPoints = points * 2;
    console.log(points)
    this.learningStyleService.updateLeaderBoardPoints(this.email, 'English', overAllPoints).subscribe((data: any) => {
      if (data['Status'] == 'Success' && points >= 5) {
        this.learningStyleService.updateUserCompletedLevel(this.email, 'English').subscribe((data: any) => {
          this.kinesticLevel2 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'CONGRATULATIONS',
              level: 'LEVEL 2',
              subject: 'English',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/englishactivityportal'])
          });
        })
      } else {
        this.kinesticLevel2 = true;
        this.isProgressSpinner = false;
        let dialogRef = this.dialog.open(LevelcompletingComponent, {
          data: {
            heading: 'SORRY',
            level: 'LEVEL 2',
            subject: 'English',
            scoredPoints: points,
            totalPoints: 10
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          this.router.navigate(['/englishactivityportal'])
        });
      }
    })
  }
  submitKinesticLevel3() {
    this.kinesticLevel3 = false;
    this.isProgressSpinner = true;
    let points = 0;
    if (this.entrires > 0) {
      if (this.questionOneAnswer != undefined && this.questionOneAnswer.toLowerCase() == 'goes') {
        points += 1;
      }
      if (this.questionTwoAnswer != undefined && this.questionTwoAnswer.toLowerCase() == 'shifted') {
        points += 1;
      }
      if (this.questionThreeAnswer != undefined && this.questionThreeAnswer.toLowerCase() == 'play') {
        points += 1;
      }
      if (this.questionFourAnswer != undefined && this.questionFourAnswer.toLowerCase() == 'burnt') {
        points += 1;
      }
      if (this.questionFiveAnswer != undefined && this.questionFiveAnswer.toLowerCase() == 'done') {
        points += 1;
      }
      if (this.questionSixAnswer != undefined && this.questionSixAnswer.toLowerCase() == 'sleeping') {
        points += 1;
      }
      if (this.questionSevenAnswer != undefined && this.questionSevenAnswer.toLowerCase() == 'see') {
        points += 1;
      }
      if (this.questionEightAnswer != undefined && this.questionEightAnswer.toLowerCase() == 'watering') {
        points += 1;
      }
      if (this.questionNineAnswer != undefined && this.questionNineAnswer.toLowerCase() == 'gets') {
        points += 1;
      }
      if (this.questionTenAnswer != undefined && this.questionTenAnswer.toLowerCase() == 'been') {
        points += 1;
      }
      let overAllPoints = points * 2;
      console.log(points)
      this.learningStyleService.updateLeaderBoardPoints(this.email, 'English', overAllPoints).subscribe((data: any) => {
        if (data['Status'] == 'Success' && points >= 5) {
          this.learningStyleService.updateUserCompletedLevel(this.email, 'English').subscribe((data: any) => {
            this.kinesticLevel3 = true;
            this.isProgressSpinner = false;
            let dialogRef = this.dialog.open(LevelcompletingComponent, {
              data: {
                heading: 'CONGRATULATIONS',
                level: 'LEVEL 3',
                subject: 'English',
                scoredPoints: points,
                totalPoints: 10
              },
            });
            dialogRef.afterClosed().subscribe((result) => {
              this.router.navigate(['/englishactivityportal'])
            });
          })
        } else {
          this.kinesticLevel3 = true;
          this.isProgressSpinner = false;
          let dialogRef = this.dialog.open(LevelcompletingComponent, {
            data: {
              heading: 'SORRY',
              level: 'LEVEL 3',
              subject: 'English',
              scoredPoints: points,
              totalPoints: 10
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            this.router.navigate(['/englishactivityportal'])
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
          subject: 'English',
          scoredPoints: points,
          totalPoints: 10
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.router.navigate(['/englishactivityportal'])
      });
    }

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
}
