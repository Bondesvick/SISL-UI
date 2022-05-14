import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpoolRequest } from 'src/app/core/models/SpoolRequest';

@Component({
  selector: 'app-spool-modal',
  templateUrl: './spool-modal.component.html',
  styleUrls: ['./spool-modal.component.scss']
})
export class SpoolModalComponent implements OnInit {
  resquest: SpoolRequest;

  constructor(public dialog: MatDialog, 
    public dialogRef: MatDialogRef<SpoolModalComponent>,
    @Inject(MAT_DIALOG_DATA) public injected: SpoolRequest) { 
      this.resquest = injected;
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
