import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ValidationDialog } from 'src/app/core/models/ValidationDailog';

@Component({
  selector: 'app-nin-validation',
  templateUrl: './nin-validation.component.html',
  styleUrls: ['./nin-validation.component.scss']
})
export class NinValidationComponent implements OnInit {
  request: ValidationDialog
  gender: string

  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<NinValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public injected: ValidationDialog) {
      this.request = injected;
     }

  ngOnInit() {
    this.gender = this.injected.userData.Sex == "1"? 'Male': 
      this.injected.userData.Sex == "2" ? 'Female' : 'None'
  }

}
