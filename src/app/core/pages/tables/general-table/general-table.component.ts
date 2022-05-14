import { SpoolService } from '../../../services/spool.service';
import { Component, OnInit } from '@angular/core';
//import { Params } from '@angular/router';
import { Params } from '../../../models/params';
import { CustomerAccount, GetCustomerAccount } from '../../../models/CustomerAccount';
import { Pagination } from '../../../models/pagination';
import { CustomerAccountServiceService } from '../../../services/customer-account-service.service';
import { MatDialog } from '@angular/material/dialog';
import { SpoolModalComponent } from '../../dialog/spool-modal/spool-modal.component';
import { Spoolresponse } from '../../../models/spoolResponse';
import { ExcelService } from '../../../services/excel.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-general-table',
  templateUrl: './general-table.component.html',
  styleUrls: ['./general-table.component.scss']
})
export class GeneralTableComponent implements OnInit {
  applications: GetCustomerAccount[] = [];
  excelData: GetCustomerAccount[] = []

  showSpinner = false;

  pagination: Pagination = {
    currentPage: 1,
    totalItems: 50,
    itemsPerPage: 10,
    totalPages: 20
  };
  totalItems = 100;

  params!: Params;
  loadSpinner = true

  moduleLink;
  status;

  constructor(private service: CustomerAccountServiceService,
     public dialog: MatDialog, private SpoolService: SpoolService, 
     private excelService: ExcelService, private _snackBar: MatSnackBar,
     private route: ActivatedRoute) { 
    this.params = service.getParams();
    this.mapStatus();
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
      
        this.moduleLink = params['moduleLink']
        this.mapStatus();
        console.log(this.status)
        this.resetFilters();
        this.loadAccounts();
      })
    
  }

  mapStatus(){
    switch(this.moduleLink){
      case "verifier-table":
        this.status = "Pending"
        break;
     
      case "compliance-table":
        this.status = "Approved"
            break;

      case "authorizer-table":
        this.status = "Processing"
          break;

      // case "rework-table":
      //   this.status = "Rework"
      //         break;

    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(SpoolModalComponent , {
      width: '600px',
      height: '400px',
      data: {startDate: "",
              endDate: "",
              count: "",
              status: this.status
            }
    });

    dialogRef.afterClosed().subscribe(result => {
      
      if(result){
        console.log(result)

        this.showSpinner = true;
        this.SpoolService.spoolSearch(result).subscribe(
          (response: Spoolresponse)=> {
            console.log(response)

            if(response.responseCode === "00"){
              this.showSpinner = false;
              this.resetPagination();
              this.applications = response.data;
              this.excelData = response.data;
              this._snackBar.open(`Data spooled`, 'Ok', {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 5000,
                panelClass: ['errorSnackbar'],
              });
            }
            else{
              this.showSpinner = false;
              this._snackBar.open(response.responseDescription, 'OK', {
                verticalPosition: 'top',
                horizontalPosition: 'center',
                duration: 3000,
              });
            }
          },
          (error) => {
            console.log(error);
            this.showSpinner = false;
            this._snackBar.open(`Techincal error has occured`, 'Failed', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 5000,
              panelClass: ['errorSnackbar'],
            });
          }
        )
      }
     
    });
  }

  exportAsXLSX():void {

    if(this.excelData.length < 1){
      this._snackBar.open("No data to export!", 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000,
      });
      return;
    }
    this.excelService.exportAsExcelFile(this.excelData, 'myExcelFile');
 }

  loadAccounts(){
    this.service.setParams(this.params, this.status);
    this.loadSpinner = true
    this.service.getApplications(this.params, this.status).subscribe(response => {
      console.log(response)
      this.loadSpinner = false
      this.applications = response.result;
      this.pagination = response.pagination;
      this.totalItems = response.pagination.totalItems;
    },
    (error)=>{
      this.loadSpinner = false
      this._snackBar.open("An Error Occurred", 'OK', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 3000,
      });
    })
  } 

  resetPagination(){
    this.pagination = {
      currentPage: 1,
      totalItems: 0,
      itemsPerPage: 10,
      totalPages: 0
    };
  }

  resetFilters(){
    this.params = this.service.resetParams();
    this.params.pageNumber = 1;
    //this.loadAccounts();
  }

  pageChanged(event: any) {
    this.params.pageNumber = event.page;
    this.service.setParams(this.params, this.status);
    this.loadAccounts();
  }

}
