import { FormControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';
import { SaveHistory } from './../../../models/SaveHistory';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { CustomerAccountServiceService } from '../../../services/customer-account-service.service';
import { MatDialog } from '@angular/material/dialog';
import { DocumentViewerComponent } from '../../dialog/document-viewer/document-viewer.component';
import { IpServiceService } from 'src/app/core/services/ip-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {
  paylod :SaveHistory = {
    customerAccountId: 0,requestId: "",
    comment: "",risk: "", commentBy: "",commentDate: Date.now.toString(), 
    status: "", accountStatus: "",approvedBy: "",
    approverIp:"", email: "", lastUpdatedBy:"", reasonForRework:""
  }
  custAcctId: number;
  comment: string;

  current: string;

  approve: string;
  reject: string;
  revert: string;

  approveStatus: string;
  showSpinner = false;
  class = '';
  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  staffname: string;
  staffemail: string;
  userId: string;
  ipAddress:string;

  riskControl = new FormControl();

  constructor(private route: ActivatedRoute, private router: Router,
     public service: CustomerAccountServiceService,
     private matDialog: MatDialog,
     private ip:IpServiceService,
     private _snackBar: MatSnackBar) { 
      this.service.application = null
     }

  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.riskControl.setValidators([Validators.required])
    //console.log(this.route)
    // this.route.url.subscribe(
    //   (url) => {
    //     console.log(url)
    //     console.log(url[0].path)
    //     this.current = url[0].path;
    //     this.switchProfile()
    //     console.log(this.approve, this.reject, this.revert)
    //   }
    // )
    this.route.params.subscribe(
      (params: Params) => {
        console.log(params['moduleLink']);
        this.current = params['moduleLink']
        this.switchProfile()
        console.log(this.approve, this.reject, this.revert)
      }
    );
    this.setRisk();

    this.route.params.subscribe(
      (params: Params) => {
        //console.log(this.route.url)
        //console.log(params['id']);
        this.service.application = null
        this.custAcctId = params['id']
        this.service.getAccountRequest({"id":params['id']});
      }
    );

    this.getIP();
    console.log(this.ipAddress);
    this.staffname = localStorage.getItem('name');
    this.staffemail = localStorage.getItem('email');
  }

  setRisk(){
    if(this.current === "compliance-table"){
      this.riskControl.setValidators([Validators.required])
    }
  }

  getIP()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
      console.log(this.ipAddress);
    });  
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

clickSave(status: string){

  let message = status == "Approve" ? " approve " : 
      status =="Reject" ? " reject " : " return for rework, ";

  if(this.service.application?.lastUpdatedBy !== "null" && this.service.application?.lastUpdatedBy?.toString().toLowerCase() 
       === this.userId?.toString().toLowerCase()){
    this._snackBar.open("You cannot" + message + "what you initiated", 'Error', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 4000,
    });
    return;
  }

  this.paylod.comment = this.comment;
  this.paylod.risk = this.riskControl.value;
  this.paylod.commentBy= this.staffname;
  this.paylod.email = this.staffemail;
  this.paylod.lastUpdatedBy = this.userId;
  this.paylod.customerAccountId = this.custAcctId;
  this.paylod.status = status == "Approve" ? this.approve : 
                        status =="Reject" ? this.reject : this.revert;
  this.paylod.accountStatus = status == "Approve" ? this.approveStatus : 
                              status =="Reject" ? "Rejected" : "Rework";

  this.paylod.reasonForRework = status == "Revert" ? this.comment : "";

  if(status == "Approve" && this.current == "authorizer-table"){
    this.paylod.approvedBy = this.staffname;
    this.paylod.commentBy= this.staffname;
    this.paylod.approverIp = this.ipAddress;

    this.showSpinner = true;
    this.service.postAccount(this.paylod).subscribe(
      (response) => {
        if (response.responseCode === "00") {
          this.showSpinner = false;
          this._snackBar.open("Account submitted", 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000
          });
          //window.location.reload();
          // this.router.navigate(["SislAccountManagement/"+this.current]);
          // window.location.reload();

          this.router.navigate(["SislAccountManagement/"+this.current])
          .then(() => {
            window.location.reload();
          });
        }
        else{
          this.showSpinner = false;
          this._snackBar.open(response.responseDescription, 'Error', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000,
          });
        }
      }
    ),
    (error) => {
      console.log(error);
      this.showSpinner = false;
      this._snackBar.open(`Techincal error has occured`, 'Failed', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 5000,
      });
    }
    return;
  }

  this.showSpinner = true;
  this.service.saveHistory(this.paylod).subscribe(
    (response)=> {
      console.log(response)

      if (response.responseCode === "00") {
        this.showSpinner = false;
        this._snackBar.open(response.responseDescription, 'Ok', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000
        });
       // window.location.reload();
      //  this.router.navigate(["SislAccountManagement/"+this.current]);
      //  window.location.reload();

          this.router.navigate(["SislAccountManagement/"+this.current])
          .then(() => {
            window.location.reload();
          });
      }
      else{
        this.showSpinner = false;
        this._snackBar.open(response.responseDescription, 'Error', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 4000,
        });
      }
      
    }
    ,
    (error) => {
      console.log(error);
      this.showSpinner = false;
      this._snackBar.open(`Techincal error has occured`, 'Failed', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 5000,
      });
    }
  )
}

switchProfile(){
  switch(this.current){
    case "verifier-table":
      this.approve = "Approved by verifier";
      this.reject = "Rejected by verifier";
      this.revert = "Reverted by verifier";
      this.approveStatus = "Approved";
      break;

    case "compliance-table":
      this.approve = "Approved by compliance";
      this.reject = "Rejected by compliance";
      this.revert = "Reverted by compliance";
      this.approveStatus = "Processing";
      break;

      case "authorizer-table":
      this.approve = "Approved by authorizer";
      this.reject = "Rejected by authorizer";
      this.revert = "Reverted by authorizer";
      this.approveStatus = "Processed";
      break;
  }
}

}
