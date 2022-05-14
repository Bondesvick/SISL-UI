import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CustomerAccountServiceService } from '../../../services/customer-account-service.service';
import { DocumentViewerComponent } from '../../dialog/document-viewer/document-viewer.component';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-details-summary',
  templateUrl: './details-summary.component.html',
  styleUrls: ['./details-summary.component.scss']
})
export class DetailsSummaryComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,private matDialog: MatDialog,
    public service: CustomerAccountServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params['id']);
        this.service.GetCustomerAccountSummaryById({"id":params['id']});
      }
    );
  }

  btnClick= function () {
    this.router.navigateByUrl('/request-table');
};

downloadDocument(data, name, type?): void {
  const url = `data:${type};base64,${data}`;
  saveAs(url, name);
}

openDocument(data, name, type): void {
  data = `data:${type};base64,${data}`;
  this.matDialog.open(DocumentViewerComponent, {
    data: {
      imageData: data,
      name,
      contentType: type,
    },
    height: '80vh',
    width: '80vw',
  });
}

}
