import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-rework-reason',
  templateUrl: './rework-reason.component.html',
  styleUrls: ['./rework-reason.component.scss']
})
export class ReworkReasonComponent implements OnInit {

  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<ReworkReasonComponent>,
    @Inject(MAT_DIALOG_DATA) public injected: any) { 
    
    }

  ngOnInit() {
  }
}
