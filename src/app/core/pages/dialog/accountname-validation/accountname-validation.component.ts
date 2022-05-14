import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-accountname-validation',
  templateUrl: './accountname-validation.component.html',
  styleUrls: ['./accountname-validation.component.scss']
})
export class AccountnameValidationComponent implements OnInit {

  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<AccountnameValidationComponent>,
    @Inject(MAT_DIALOG_DATA) public injected: any) { }

  ngOnInit() {
  }

}
