import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-document-viewer',
  templateUrl: './document-viewer.component.html',
  styleUrls: ['./document-viewer.component.scss']
})
export class DocumentViewerComponent implements OnInit {
  @ViewChild('embed') embed: ElementRef;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data,
    private _dialogRef: MatDialogRef<DocumentViewerComponent>
  ) { }

  ngOnInit() {
    this._dialogRef.afterOpened().subscribe(() => {
      this.embed.nativeElement.src = this.data.imageData + '#view=fitH';
    });
  }

  downloadDocument(data, name) {
    saveAs(data, name);
  }

}
