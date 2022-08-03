import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  heading: any,
  level: any,
  learningType: any,
  subject: any,
  scoredPoints: any;
  totalPoints: any;
}
@Component({
  selector: 'app-levelcompleting',
  templateUrl: './levelcompleting.component.html',
  styleUrls: ['./levelcompleting.component.css']
})
export class LevelcompletingComponent implements OnInit {
  level1Content = false;
  others = false;
  failed = false
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    if (this.data['level'] == 'LEVEL 1') {
      this.level1Content = true;
    }
    else {
      this.others = true;
    }
    if (this.data['heading'] == 'SORRY') {
      this.failed = true
    }
  }

}
