import { Bank } from './../../helpers/Banks';
import { CustomerAccount, Document } from './../../models/CustomerAccount';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { CustomerAccountServiceService } from '../../services/customer-account-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NinValidationService } from '../../services/nin-validation.service';
import { MatDialog } from '@angular/material/dialog';
import { NinValidationComponent } from '../dialog/nin-validation/nin-validation.component';
import { States} from '../../helpers/States';
import { Countries} from '../../helpers/Countries';
import { Banks } from '../../helpers/Banks';
import { DataTable, Row } from '../../models/FetchCustomerResponse';
import {bvnValidate, requiredInputs, ConvertToBase64, 
        transformBase64String, validateFileType, 
        triggerSnackbar, MapReworkDetails,
        MapUpdateDetails, ValidateRequiredInputs} from './Helpers';
import { IpServiceService } from '../../services/ip-service.service';
import { DatePipe } from '@angular/common'
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AccountnameValidationComponent } from '../dialog/accountname-validation/accountname-validation.component';
//import moment from 'moment'
//import { CustomerAccountServiceService } from 'src/app/services/customer-account-service.service';

@Component({
  selector: 'app-capture-page',
  templateUrl: './capture-component.component.html',
  styleUrls: ['./capture-component.component.scss']
})
export class CapturePageComponent implements OnInit {
  staffname: string;
  staffemail: string;
  userId: string;
  ipAddress:string;

  operationSelection: string = "New Request";
  operations: string[] = ['New Request', 'Existing Request'];
  titles: string[] = ['Mr','Mrs','Miss','Dr','Chief','Prof'];
  maritalStatus: string[] = ['Married','Single','Divorced','Separated','Widow','Widower'];
  idTypes: string[]= ["NIMC","BVN","Voter's card","International passport","Driver's licence"];
  
  CustomerId = "";

  customerAccountForm: FormGroup;
  otherForm: FormGroup;
  pepForm: FormGroup;
  idForm: FormGroup;
  _selectedFileToUpload: File;

  showSpinner = false;
  class = '';
  color = 'primary';
  mode = 'query';
  value = 50;
  bufferValue = 75;

  customerAccount: CustomerAccount

  NIN: string = "";
  states: any[];
  countries: any [];

  fetchData: Row[];

  politicallyExposed: string;

  now: Date = new Date();

  today: string;
  min: string;

  minDate = new Date("2018-09-08");

  //date= new Date("mm/dd/yyyy")
  date: Date;
 //latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');

 filteredCountries: Observable<string[]>;
 filteredStates: Observable<string[]>;
 filteredBanks: Observable<Bank[]>;
 filteredNOKCountries: Observable<string[]>;
 filteredIdTypes: Observable<string[]>;

 Country = new FormControl();
 allStates;

 PoliticallyExposed = new FormControl();
 IdentityType = new FormControl();

 selectedNipCode = "";


  constructor(
    private formBuilder: FormBuilder, 
    private accounService: CustomerAccountServiceService,
     private _snackBar: MatSnackBar, 
     private ninService: NinValidationService,
     public dialog: MatDialog,
     private ip:IpServiceService,
     public datepipe: DatePipe
     //public datepipe: DatePipe
      ) { 
      }

  ngOnInit() {
    this.resetValues()
    console.log(this.date)
    this.staffname = localStorage.getItem('name');
    this.staffemail = localStorage.getItem('email');
    this.userId = localStorage.getItem('userId');
    //this.states = States;
    this.countries = Countries;
    
    this.buildForm();
    this.buildOtherForm();
    this.buildPepForm();
    this.buildIdForm();

    this.mapRework()

    this.PoliticallyExposed.setValidators([Validators.required])
    this.IdentityType.setValidators([Validators.required])

    //this.accounService.getAccountRequest({"id":1})
    this.getIP();
    console.log(this.ipAddress);
    this.today = this.datepipe.transform(this.now,'yyyy-MM-dd')
    this.myFunction()

    this.filteredCountries = this.customerAccountForm.controls.Country.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value))
    );

    this.filteredBanks = this.customerAccountForm.controls.BankAcctName.valueChanges.pipe(
      startWith(''),
      map(value => this._filterBank(value))
    )

    this.filteredNOKCountries = this.otherForm.controls.NOKNationality.valueChanges.pipe(
      startWith(''),
      map(value => this._filterCountry(value))
    );

    this.filteredIdTypes = this.IdentityType.valueChanges.pipe(
      startWith(''),
      map(value => this._filterIdType(value))
    );
  }


 displayFn(country: any): string {
  return country && country.name ? country.name : '';
}

  private _filterCountry(value: string): any[] {
    const filterValue = value.toString().toLocaleLowerCase();

    return Countries.map(x => x.name).filter(option => option.toLocaleLowerCase().indexOf(filterValue) === 0);
  }

  private _filterBank(value: string): Bank[]{
    console.log(value)
    const filterValue = value.toString().toLowerCase();

    return Banks.filter(option => option.name.toLocaleLowerCase().indexOf(filterValue) === 0);
    //return this.bankNames.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterIdType(value: string): any[] {
    const filterValue = value.toString().toLocaleLowerCase();

    return this.idTypes.filter(option => option.toLocaleLowerCase().indexOf(filterValue) === 0);
  }

  myFunction(){
    this.date =new Date();
    let latest_date = this.datepipe.transform(this.date, 'yyyy-MM-dd');
    console.log(latest_date)
    console.log(this.datepipe.transform(this.minDate,'yyyy-MM-dd'))
   }

   setMinDate(){
     this.minDate = new Date(this.customerAccount.MeansOfIDIssueDate)
     let newmin = this.minDate.setDate(this.minDate.getDate() + 91)
     this.min = this.datepipe.transform(newmin,'yyyy-MM-dd')
     console.log(this.min)
     console.log("Chnged!")
   }

  buildForm(){
    this.customerAccountForm = this.formBuilder.group({
      AccountType:['', Validators.required],
      Title:['', Validators.required],
      Surname:['', Validators.required],
      FirstName:['', Validators.required],
      Othernames:[''],
      DateOfBirth:['', Validators.required],
      Sex:['', Validators.required],
      MaritalStatus:[''],
      MothersMaidenName:['', Validators.required],
      PermanentAddress:['', Validators.required],
      City:['', Validators.required],
      State:['', Validators.required],
      Country:['', Validators.required],
      LGA: ['', Validators.required],
      EmailAddress:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      Telephone:['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      HomePhone: ['',[Validators.pattern(/^[0-9]\d*$/)]],

      Occupation: ['', Validators.required],
      CompName:['', Validators.required],
      EmploymentType:['', Validators.required],

      BankAcctName:['', Validators.required],
      BankAcctNumber:['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      BVNNumber: ['', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]],
    });
  }

  buildOtherForm(){
    this.otherForm = this.formBuilder.group({
     
      NextOfKin: ['', Validators.required],
      NextOfKinSurname: ['', Validators.required],
      NextOfKinOtherNames: [''],
      Relationship: ['', Validators.required],
      ContactAddress: ['', Validators.required],
      NextofKinPhone: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      NextOfKinEmail: ['', [Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      NOKNationality: ['', Validators.required],
      NextofKinGender: ['', Validators.required],
      NOKDateOfBirth: ['', Validators.required],

      AverageAnnualIncome: ['', Validators.required],
      SourceofInvestment: ['', Validators.required],
      PurposeofInvestment: ['', Validators.required],

      OfficeEmail: ['',[Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      OfficePhoneNumber: ['',[Validators.pattern(/^[0-9]\d*$/)]],
      OfficialAddress: ['', Validators.required],

      // IdentityType: ['', Validators.required],

      // PoliticallyExposed: ['', Validators.required],

    })
  }

  buildPepForm(){
    let validate : boolean = this.customerAccount.PoliticallyExposed == "Yes" ? true : false;
    this.pepForm = this.formBuilder.group({
      //PoliticallyExposed: ['', Validators.required],
      PEPWho: validate ? ['', Validators.required] : [''],
      PoliticallyExposedPerson: validate ? ['', Validators.required] : [''],
      PositionHeld: validate ? ['', Validators.required] : [''],
      DateOfOffice: validate ? ['', Validators.required] : [''],
    })
  }

  buildIdForm(){
    let validate : boolean = (this.customerAccount.IdType != "NIMC" 
                              && this.customerAccount.IdType != "BVN"
                              && this.customerAccount.IdType !== "Voter's card") ? true : false;
    console.log(validate)
    this.idForm = this.formBuilder.group({
      IDNumber: ['', Validators.required],
      MeansOfIDIssueDate: validate ? ['', Validators.required] : [''],
      MeansOfIDExpirationDate: validate ? ['', Validators.required] : [''],
    })
  }

  countryChange(country: any){
    console.log(this.customerAccount.Country)
    //console.log(this.customerAccountForm)
    console.log(Countries.find(x => x.name == country))
    let iso = Countries.find(x => x.name == country).isoCode;
    //console.log(iso)

    this.states = States.filter(x => x.countryCode == iso);
    console.log(this.states)

    this.filteredStates = this.customerAccountForm.controls.State.valueChanges.pipe(
      startWith(''),
      map(value => this._filterState(value))
    );
  }

  private _filterState(value: string): any[] {
    const filterValue = value.toString().toLocaleLowerCase();

    return this.states.map(x => x.name.replace(" State","")).sort()
    .filter(option => option.toLocaleLowerCase().indexOf(filterValue) === 0);
  }

  pepChange(){
    console.log(this.customerAccount.PoliticallyExposed)
    this.buildPepForm();
  }

  idTypeChange(){
    console.log(this.customerAccount.IdType)
    this.buildIdForm()
  }

  getIP()  
  {  
    this.ip.getIPAddress().subscribe((res:any)=>{  
      this.ipAddress=res.ip;  
      console.log(this.ipAddress);
    });  
  }  

  reqChange(){
    console.log("Hello")
    //this.operationSelection = "";
    this.CustomerId = "";
    this.fetchData = null

    // this.buildForm();
    // this.buildOtherForm();
    // this.buildPepForm();
    // this.buildIdForm();

    this.resetValues()
  }

  custIdChange(){
    console.log(this.CustomerId);
    if(this.CustomerId.length == 10){
      this.showSpinner = true;

      this.accounService.rework = null

      this.accounService.fetchCustomer(this.CustomerId).subscribe(
        (response) => {
          this.showSpinner = false;
          console.log(response)
          if(response.responseCode == "00"){

              if(response.data.DataTable.Rows[0]){
                //this.showSpinner = false;
                this._snackBar.open(response.responseDescription, 'Ok', {
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                  duration: 3000,
                });
                this.fetchData = response.data.DataTable.Rows;
                //this.mapData(response.data.DataTable)
              }
              else{
                //this.showSpinner = false;
                this._snackBar.open("No customer found for the Id "+ this.CustomerId, 'Ok', {
                  verticalPosition: 'top',
                  horizontalPosition: 'center',
                  duration: 3000,
                });
    
              }
          }
          else{
            this.showSpinner = false;
            this._snackBar.open(response.responseDescription, 'Ok', {
              verticalPosition: 'top',
              horizontalPosition: 'center',
              duration: 5000,
            });
          }
        }
      ),
      (error) => {
        this.showSpinner = false;
        console.log(error)

        this._snackBar.open(`Techincal error has occured`, 'Failed', {
          verticalPosition: 'top',
          horizontalPosition: 'center',
          duration: 5000,
        });
      }

      //this.showSpinner = false;
    }
  }

  mapData(data: Row){
    console.log(data[23])

    // this.buildForm();
    // this.buildOtherForm();
    // this.buildPepForm();
    // this.buildIdForm();

    //this.idForm.controls.IDNumber.disable()

      // this.customerAccountForm.controls.Surname.disable()
      // this.customerAccountForm.controls.FirstName.disable()
      // this.customerAccountForm.controls.Othernames.disable()
      // this.customerAccountForm.controls.Sex.disable()
      // this.customerAccountForm.controls.DateOfBirth.disable()

    MapUpdateDetails(this.customerAccount, data, this.datepipe,
       this.customerAccountForm, this.otherForm, this.idForm, this.pepForm)
   
  }

  onFormControlChanged(evt, document: string) {
    const _fileToUpload: File = evt.target.files[0];
    //console.log(_fileToUpload);

    this._selectedFileToUpload = _fileToUpload;
    console.log(this._selectedFileToUpload);

    const fileTypeError = validateFileType(this._selectedFileToUpload);

    if (fileTypeError) {
      this._snackBar.open(fileTypeError, 'Failed', { verticalPosition: 'top', horizontalPosition: 'center', duration: 5000 });
      return;
    }

    const fileReader = new FileReader();
    fileReader.readAsBinaryString(this._selectedFileToUpload);
    fileReader.onload = (e: any) => {

      this.ConvertAndAddIdFiler(evt.target.value.substring(12), document)
    }
  }

  ConvertAndAddIdFiler(name: string, document : string) {
    try {
      ConvertToBase64(this._selectedFileToUpload).then(result => {
        const ID: Document = {
          Title: document,
          Name: name,
          Base64Content: transformBase64String(result)
        };

        this.customerAccount.Documents.push(ID)
        console.log(this.customerAccount.Documents);
      });
    } catch (error) {
      console.log(error);
      this._snackBar.open('Error occured', 'Error', { duration: 5000 }); return;
    }
  }

  removeSelectedFile(document: string, index = null) {
    this.customerAccount.Documents = this.customerAccount.Documents.filter(x => x.Name != document)
    console.log(this.customerAccount.Documents)

    if(this.customerAccount.Documents.length == 0)
        this.customerAccount.Documents = []

  }

  saveNewRequest(){

    if(!ValidateRequiredInputs(
      this.customerAccountForm,this.otherForm,this.pepForm,
      this.idForm,this.PoliticallyExposed,this.IdentityType,this._snackBar)){
      return;
    }
    //this.saveNewRequest();
    this.customerAccount.Status = "Pending";
    this.customerAccount.IsNewRequest = this.operationSelection == "New Request" ? true : false;
    this.customerAccount.CustAid = this.operationSelection == "New Request" ? "" : this.CustomerId;
    this.customerAccount.InitiatedBy = this.staffname;
    this.customerAccount.LastUpdatedBy = this.userId;
    //this.customerAccount.
    this.customerAccount.SolId = ""
    this.customerAccount.InitiatorIp = this.ipAddress;
    this.customerAccount.InitiatorEmail = this.staffemail;
    console.log(this.customerAccount)

    this.showSpinner = true;
    this.accounService.postAccountRequest(this.customerAccount).subscribe(
      (response)=> {
        console.log(response)

        if (response.responseCode === "00") {
          this.showSpinner = false;
          this._snackBar.open(response.responseDescription, 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000
          });
          window.location.reload();
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
    );
  }

  validateDetails(){
    
    if(!requiredInputs(this.customerAccountForm,this.idForm, this.IdentityType, this._snackBar)){
      console.log(this.customerAccountForm)
      return;
    }
        

    console.log("hello")
    console.log(this.buildValidationPayload())
    console.log(this.customerAccountForm.value)

    this.showSpinner = true;
    this.ninService.validateCustomer(this.buildValidationPayload()).subscribe(
      (response) =>  {
        console.log(response)

        if(response.responseCode == "00"){
          this.showSpinner = false;
          if(response?.data?.VerifyIdNumber == "Verified" || response?.data?.ReturnPersonalInfo === "00"){
            triggerSnackbar(response?.data?.ResultText, this._snackBar)
          }
          else{
            triggerSnackbar(response?.data?.ResultText + " | " + response?.data?.VerifyIdNumber, this._snackBar)
          }

          if(response?.data?.ReturnPersonalInfo == "Returned" ||response?.data?.ReturnPersonalInfo === "00"){
            triggerSnackbar(response?.data?.ResultText, this._snackBar)
            const dialogRef = this.dialog.open(NinValidationComponent , {
              width: '700px',
              height: '500px',
              data: {
                      userData: this.customerAccount,
                      resData: response?.data,
                    }
            });
          }
        }
        else{
          this.showSpinner = false;
          triggerSnackbar(response.responseDescription, this._snackBar);
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

  buildValidationPayload(){
    return {
      "type": this.IdentityType.value,
      "idNumber": this.idForm.controls.IDNumber.value,
      "firstName": this.customerAccountForm.controls.FirstName.value,
      "middleName": this.customerAccountForm.controls.Othernames.value,
      "lastName": this.customerAccountForm.controls.Surname.value,
      "dateOfBirth": this.customerAccountForm.controls.DateOfBirth.value,
      "phoneNumber": this.customerAccountForm.controls.Telephone.value,
    }
  }

  validateCountry(event): boolean{
    let value = event.key.toLowerCase();
    let result = Countries.map(x => x.name.toLowerCase()).some(x => x.startsWith(this.customerAccount.Country.toLowerCase() + value));

    return result
  }

  validateState(event): boolean{
    let value = event.key.toLowerCase();
    //this.states.map(x => x.name.replace(" State","")).sort()
    let result = this.states.map(x => x.name.toLowerCase()).some(x => x.startsWith(this.customerAccount.State.toLowerCase() + value));

    return result
  }

  validateBank(event): boolean{
    let value = event.key.toLowerCase();
    let result = Banks.map(x => x.name.toLowerCase()).some(x => x.startsWith(this.customerAccount.BankAcctName.toLowerCase() + value));

    return result
  }

  validateNOKCountry(event): boolean{
    let value = event.key.toLowerCase();
    let result = Countries.map(x => x.name.toLowerCase()).some(x => x.startsWith(this.customerAccount.NOKNationality.toLowerCase() + value));

    return result
  }

  validateIdType(event): boolean{
    let value = event.key.toLowerCase();
    //this.states.map(x => x.name.replace(" State","")).sort()
    let result = this.idTypes.some(x => x.toLowerCase().startsWith(this.customerAccount.IdType.toLowerCase() + value));

    return result
  }

  numericOnly(event: { key: string; }): boolean { 
   
    let patt = /^([0-9])$/;
    let result = patt.test(event.key);
    return result;
}

  mapRework(){
    if(this.accounService.rework){
      console.log(this.accounService.rework)
      //console.log(this.accounService.rework.initiatedDate.slice(0,10))
      MapReworkDetails(this.customerAccount, this.accounService.rework, this.datepipe)
    }
  }

  setValidationBankCode(bankCode: string){
    console.log("hello")
    console.log(bankCode)

    this.selectedNipCode = bankCode;
  }

  validateAccountNumber(){

    if(!bvnValidate(this.customerAccountForm, this._snackBar))
        return

    if(!this.selectedNipCode){
      this._snackBar.open("There is no validation code set for this bank", 'Ok', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 4000
      });
      return;
    }

    this.showSpinner = true;
    this.accounService.validateAccount(this.customerAccountForm.controls.BankAcctNumber.value, this.selectedNipCode).subscribe(
      (response)=> {
        console.log(response)

        if (response.responseCode === "00") {
          this.showSpinner = false;
          this._snackBar.open(response.responseDescription, 'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 4000
          });

          let name  = this.customerAccountForm.controls.FirstName.value + " "+
                      this.customerAccountForm.controls.Othernames.value + " "+
                      this.customerAccountForm.controls.Surname.value;

          const dialogRef = this.dialog.open(AccountnameValidationComponent , {
            width: '400px',
            height: '200px',
            data: {
              fromForm: name,
              fromRes: response.data
            }
          });
          //window.location.reload();
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
    );
  }

  // navigate(route: string) {
  //   this.router.navigate([route]);
  // }


  resetValues(){
    this.customerAccount = {
      Id: 0, SessionId: "",CustAid: "", AccountType: "", Title: "", SureName: "",
      FirstName: "", OtherNames: "", CompName: "", Sex: "", MaritalStatus:"", DateOfBirth: "",
      PermanentAddress: "", Nationality: "", Telephone: "", EmailAddress : "", BankAccNumber: "",
      PoliticallyExposed:"", MothersMaidenName: "", LGA:"", HomePhone: "", Occupation: "",EmploymentType:"",
      BVN:"", IdType:"", IdNumber: "", MeansOfIDIssueDate: "", MeansOfIDExpirationDate: "", PoliticallyExposedPerson:"",
      PEPWho: "", PositionHeld: "", DateOfOffice :"", NextOfKin: "", NextOfKinSurname: "", NextOfKinOtherNames:"",
      NextOfKinEmail:"", Relationship: "", ContactAddress: "", NextOfKinGender: "", NextOfKinPhone: "",
      NOKDateOfBirth: "", NOKNationality: "",
      AverageAnnualIncome: "", SourceofInvestment: "", PurposeofInvestment: "", OfficeEmail: "", OfficePhoneNumber: "",
      OfficialAddress: "", BankCode: "",  BankAcctName: "", City: "", State: "", Country: "", BranchCode: "",
      Status: "", IsNewRequest: true, SolId: "", LastUpdatedBy:"", InitiatedBy: "", InitiatedDate: "", 
      InitiatorIp: "", ApprovedBy : "",ApprovedDate: "", ApproverIp: "",InitiatorEmail:"", ReasonForRework:"", Documents: []
    };
  }

}
