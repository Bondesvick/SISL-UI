import { DatePipe } from "@angular/common";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerAccount, GetCustomerAccount } from "../../models/CustomerAccount";
import { DataTable, Row } from "../../models/FetchCustomerResponse";


export function triggerSnackbar(message: string, snackBar: MatSnackBar){
  snackBar.open(message, 'Ok', {
    verticalPosition: 'top',
    horizontalPosition: 'center',
    duration: 3000,
    panelClass: ['errorSnackbar'],
  });
}

export function bvnValidate(form: FormGroup, snackBar: MatSnackBar): boolean{
  if(form.controls.Surname.value == ""){
    triggerSnackbar("Surname is required",snackBar);
    return false;
  }
  if(form.controls.FirstName.value == ""){
    triggerSnackbar("First Name is required",snackBar);
    return false
  }
  if(form.controls.Othernames.value == ""){
    triggerSnackbar("Other Names is required",snackBar);
    return false
  }

  if(form.controls.BankAcctName.value == ""){
    triggerSnackbar("Bank Names is required",snackBar);
    return false
  }

  return true;
}

export function requiredInputs(form: FormGroup, idForm: FormGroup,idType: FormControl, snackBar: MatSnackBar){
  if(form.controls.Surname.value == ""){
    triggerSnackbar("Surname is required",snackBar);
    return false;
  }
  if(form.controls.FirstName.value == ""){
    triggerSnackbar("First Name is required",snackBar);
    return false
  }
  if(form.controls.Othernames.value == ""){
    triggerSnackbar("Other Names is required",snackBar);
    return false
  }

  if(form.controls.Sex.value == ""){
    triggerSnackbar("Gender is required", snackBar);
    return false
  }
  if(form.controls.DateOfBirth.value == ""){
    triggerSnackbar("Date Of Birth is required", snackBar);
    return false
  }
  if(form.controls.Telephone.value == ""){
    triggerSnackbar("Phone Number is required", snackBar);
    return false
  }
  if(idType.value == ""){
    triggerSnackbar("ID type is required", snackBar);
    return false
  }
  if(idForm.controls.IDNumber.value == ""){
    triggerSnackbar("ID Number is required", snackBar);
    return false
  }
  return true;
}

export function validateFileType(file: File): string {
    const fileExtension = file.name.toString().toLowerCase().substr(file.name.lastIndexOf('.'));
    switch (fileExtension) {
      case '.pdf':
      case '.jpeg':
      case '.jpg':
      case '.png':
        return '';
      default: return `${file.name} is a not a valid type. Valid files must either be pdf or jpeg files`;
    }
  }

  export function ConvertToBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  export function transformBase64String(base64String: string) {
    if (base64String && base64String.indexOf('base64') > -1) {
      const hay = base64String.indexOf('base64');
      return base64String.substr(hay + 7);
    }
    console.log(base64String);
    return base64String;
  }

  export function MapDateToCalenderFormat(dateString: string, datepipe: DatePipe): string{
    try {
      let date = new Date(dateString) ?? new Date()
      return datepipe.transform(date,'yyyy-MM-dd');
    } catch (error) {
      return "";
    }
   
  }

  export function MapReworkDetails(account: CustomerAccount, data: GetCustomerAccount, datepipe: DatePipe){
    account.Id = data.id;

    account.AccountType = data.accountType;
    account.Title = data.title;
    account.SureName = data.sureName;
    account.FirstName = data.firstName;
    account.OtherNames = data.otherNames;
    account.DateOfBirth = MapDateToCalenderFormat(data?.dateOfBirth?.slice(0,10) ?? (new Date()).toString(),datepipe);
    account.Sex = data.sex.toString();
    account.MaritalStatus = data.maritalStatus;
    account.MothersMaidenName = data.mothersMaidenName;
    account.PermanentAddress = data.permanentAddress;
    account.City = data.city;
    account.State = data.state;
    account.Country = data.country;
    account.LGA = data.lga;
    account.EmailAddress = data.emailAddress;
    account.Telephone = data.telephone;
    account.HomePhone = data.homePhone;
    account.Occupation = data.occupation;
    account.CompName = data.compName;
    account.EmploymentType = data.employmentType;

    account.BankAcctName = data.bankAcctName;
    account.BankAccNumber = data.bankAccNumber;
    account.BVN = data.bvn;
    account.IdType = data.idType;
    account.IdNumber = data.idNumber;
    account.MeansOfIDIssueDate = MapDateToCalenderFormat(data?.meansOfIDIssueDate?.slice(0,10) ?? (new Date()).toString(),datepipe);
    account.MeansOfIDExpirationDate = MapDateToCalenderFormat(data?.meansOfIDExpirationDate?.slice(0,10) ?? (new Date()).toString(),datepipe);
    account.PoliticallyExposed = data.politicallyExposed;
    account.PEPWho = data.pepWho;
    account.PoliticallyExposedPerson = data.politicallyExposedPerson;
    account.PositionHeld = data.positionHeld;
    account.DateOfOffice = MapDateToCalenderFormat(data?.dateOfOffice?.slice(0,10) ?? (new Date()).toString(),datepipe);

    account.NextOfKin = data.nextOfKin;
    account.NextOfKinSurname = data.nextOfKinSurname;
    account.NextOfKinOtherNames = data.nextOfKinOtherNames;
    account.Relationship = data.relationship;
    account.ContactAddress = data.contactAddress;
    account.NextOfKinPhone = data.nextOfKinPhone;
    account.NextOfKinEmail = data.nextOfKinEmail;
    account.NOKNationality = data.nokNationality;
    account.NextOfKinGender = data.nextOfKinGender;
    account.NOKDateOfBirth = MapDateToCalenderFormat(data?.nokDateOfBirth?.slice(0,10) ?? (new Date()).toString(),datepipe);

    account.AverageAnnualIncome = data.averageAnnualIncome;
    account.SourceofInvestment = data.sourceofInvestment;
    account.PurposeofInvestment = data.purposeofInvestment;

    account.OfficeEmail = data.officeEmail;
    account.OfficePhoneNumber = data.officePhoneNumber
    account.OfficialAddress = data.officialAddress;

    account.InitiatedDate = data?.initiatedDate;
  }

  export function toTitleCase(str) {
    return str.replace(
      /\w\S*/g,
      function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  }

  export function MapUpdateDetails(account: CustomerAccount, data: Row, datepipe: DatePipe,
     form: FormGroup, otherForm: FormGroup, idForm: FormGroup, pepForm: FormGroup){

    if(data){
    
      let rows = data;
      //let columns = data
      console.log(data[2])

      form.controls.AccountType.setValue(data[0])
      //account.AccountType = data[0]
      form.controls.Title.setValue(toTitleCase(data[1]))
      //account.Title = toTitleCase(data[1]);
      form.controls.Surname.setValue(data[2])
      //account.SureName = data[2]
      form.controls.FirstName.setValue(data[3])
      //account.FirstName = data[3]
      form.controls.Othernames.setValue(data[4])
      //account.OtherNames = data[4]
      form.controls.CompName.setValue(data[5])
      //account.CompName = data[5]
      let sex = data[6].toString().toLowerCase()
      form.controls.Sex.setValue(sex === "male" ? "1" : sex === "female" ? "2" : sex);
      //account.Sex = data[6].toString().toLowerCase() === "male" ? "1" : "2";
      form.controls.DateOfBirth.setValue(MapDateToCalenderFormat(data[7] ?? (new Date()).toString(),datepipe))
      //account.DateOfBirth = MapDateToCalenderFormat(data[7] ?? (new Date()).toString(),datepipe)
      form.controls.MothersMaidenName.setValue(data[33])
      //account.MothersMaidenName = data[33]
      form.controls.PermanentAddress.setValue(data[8])
      //account.PermanentAddress = data[8]
      form.controls.Telephone.setValue(data[10])
      //account.Telephone = data[10]
      form.controls.EmailAddress.setValue(data[11])
      //account.EmailAddress = data[11]
      form.controls.City.setValue(data[12])
      //account.City = data[12]
      form.controls.State.setValue(data[13])
      //account.State = data[13]
      form.controls.LGA.setValue(data[14])
      //account.LGA = data[14]
      form.controls.Country.setValue(data[15])
      //account.Country = data[15]
      form.controls.Occupation.setValue(data[17])
      //account.Occupation = data[17]
      form.controls.EmploymentType.setValue(data[19])
      //account.EmploymentType = data[19]
      form.controls.BankAcctName.setValue(data[46])
      //account.BankAcctName = data[46]
      form.controls.BankAcctNumber.setValue(data[47])
      //account.BankAccNumber = data[47]
      form.controls.BVNNumber.setValue(data[21])
      //account.BVN = data[21]

      otherForm.controls.NextOfKin.setValue(data[25])
      //account.NextOfKin = data[25]
      otherForm.controls.ContactAddress.setValue(data[26])
      //account.ContactAddress = data[26]
      otherForm.controls.NextofKinPhone.setValue(data[27])
      //account.NextOfKinPhone = data[27]
      otherForm.controls.NextOfKinEmail.setValue(data[28])
      //account.NextOfKinEmail = data[28]
      otherForm.controls.NextofKinGender.setValue(data[38])
      //account.NextOfKinGender = data[38]

      let nokDOB = data[39] ? data[39] : data[40]
      console.log(nokDOB)
      otherForm.controls.NOKDateOfBirth.setValue(MapDateToCalenderFormat(nokDOB ?? (new Date()).toString(),datepipe))
      //account.NOKDateOfBirth = MapDateToCalenderFormat(data[39] ?? (new Date()).toString(),datepipe)
      otherForm.controls.NOKNationality.setValue(data[41])
      //account.NOKNationality = data[41]
      otherForm.controls.Relationship.setValue(data[42])
      //account.Relationship = data[42]
      
      otherForm.controls.AverageAnnualIncome.setValue(data[34])
      //account.AverageAnnualIncome = data[34]
      otherForm.controls.SourceofInvestment.setValue(data[35])
      //account.SourceofInvestment = data[35]
      otherForm.controls.PurposeofInvestment.setValue(data[36])
      //account.PurposeofInvestment = data[36]
      otherForm.controls.OfficeEmail.setValue(data[44])
      //account.OfficeEmail = data[44]
      otherForm.controls.OfficePhoneNumber.setValue(data[45])
      //account.OfficePhoneNumber = data[45]
      otherForm.controls.OfficialAddress.setValue(data[43])
      //account.OfficialAddress = data[43]

      //pepForm.controls.PoliticallyExposed.setValue(data[20])
      account.PoliticallyExposed = toTitleCase(data[20])

      let pepWho = data[37].toString().split("/")

      // let pepWhoO = "who/he"
      // let pepWho = pepWhoO.toString().split("/")

      console.log(pepWho);

      pepForm.controls.PEPWho.setValue(pepWho[0])
      //account.PEPWho = data[37]
      pepForm.controls.PoliticallyExposedPerson.setValue(pepWho[1])
      //account.PoliticallyExposedPerson = data[32]
      pepForm.controls.PositionHeld.setValue(data[31])
      //account.PositionHeld = data[31]
      
      pepForm.controls.DateOfOffice.setValue( MapDateToCalenderFormat(data[30] ?? (new Date()).toString(),datepipe))
      //account.DateOfOffice = MapDateToCalenderFormat(data[30] ?? (new Date()).toString(),datepipe)

      //idForm.controls.PositionHeld.setValue(data[22])
      account.IdType = data[22]
      idForm.controls.IDNumber.setValue(data[23])
      //account.IdNumber = data[23]
      idForm.controls.MeansOfIDIssueDate.setValue(MapDateToCalenderFormat(data[29] ?? (new Date()).toString(),datepipe))
      //account.MeansOfIDIssueDate = MapDateToCalenderFormat(data[29] ?? (new Date()).toString(),datepipe)
      idForm.controls.MeansOfIDExpirationDate.setValue(MapDateToCalenderFormat(data[24] ?? (new Date()).toString(),datepipe))
      //account.MeansOfIDExpirationDate = MapDateToCalenderFormat(data[24] ?? (new Date()).toString(),datepipe)
    }
  }

  export function ValidateRequiredInputs(form: FormGroup, otherForm: FormGroup, pepForm: FormGroup, idForm: FormGroup, pep: FormControl, idType: FormControl, snackBar: MatSnackBar){
    if(form.controls.AccountType.invalid){
      triggerSnackbar("Account Type is not valid",snackBar);
      return false;
    }
    if(form.controls.Title.invalid){
      triggerSnackbar("Title is not valid",snackBar);
      return false;
    }
    if(form.controls.Surname.invalid){
      triggerSnackbar("Surname is not valid",snackBar);
      return false;
    }
    if(form.controls.FirstName.invalid){
      triggerSnackbar("First Name is not valid",snackBar);
      return false
    }
    if(form.controls.Othernames.invalid){
      triggerSnackbar("Other Names is not valid",snackBar);
      return false
    }
    if(form.controls.DateOfBirth.invalid){
      triggerSnackbar("Date Of Birth is not valid", snackBar);
      return false
    }
    if(form.controls.Sex.invalid){
      triggerSnackbar("Gender is not valid", snackBar);
      return false
    }
    if(form.controls.MaritalStatus.invalid){
      triggerSnackbar("Marital Status is not valid", snackBar);
      return false
    }
    if(form.controls.MothersMaidenName.invalid){
      triggerSnackbar("Mothers Maiden Name is not valid", snackBar);
      return false
    }
    if(form.controls.PermanentAddress.invalid){
      triggerSnackbar("Address is not valid", snackBar);
      return false
    }
    if(form.controls.City.invalid){
      triggerSnackbar("City is not valid", snackBar);
      return false
    }
    if(form.controls.Country.invalid){
      triggerSnackbar("Country is not valid", snackBar);
      return false
    }
    if(form.controls.State.invalid){
      triggerSnackbar("State is not valid", snackBar);
      return false
    }
    if(form.controls.LGA.invalid){
      triggerSnackbar("LGA is not valid", snackBar);
      return false
    }
    if(form.controls.EmailAddress.invalid){
      triggerSnackbar("Email is not valid", snackBar);
      return false
    }
    if(form.controls.Telephone.invalid){
      triggerSnackbar("Phone Number is not valid", snackBar);
      return false
    }
    if(form.controls.HomePhone.invalid){
      triggerSnackbar("Home Phone is not valid", snackBar);
      return false
    }
    if(form.controls.Occupation.invalid){
      triggerSnackbar("Occupation is not valid", snackBar);
      return false
    }
    if(form.controls.CompName.invalid){
      triggerSnackbar("Company Name is not valid", snackBar);
      return false
    }
    if(form.controls.EmploymentType.invalid){
      triggerSnackbar("Employment Type is not valid", snackBar);
      return false
    }
    if(form.controls.BankAcctName.invalid){
      triggerSnackbar("Bank Name is not valid", snackBar);
      return false
    }
    if(form.controls.BankAcctNumber.invalid){
      triggerSnackbar("Account Number is not valid", snackBar);
      return false
    }
    if(form.controls.BVNNumber.invalid){
      triggerSnackbar("BVN is not valid", snackBar);
      return false
    }

    ///////////////////////////////////////////////////
    if(otherForm.controls.NextOfKin.invalid){
      triggerSnackbar("Next Of Kin First Name is not valid", snackBar);
      return false
    }
    if(otherForm.controls.NextOfKinSurname.invalid){
      triggerSnackbar("Next Of Kin Surname is not valid", snackBar);
      return false
    }
    if(otherForm.controls.NextOfKinOtherNames.invalid){
      triggerSnackbar("Next Of Kin Other Names is not valid", snackBar);
      return false
    }
    if(otherForm.controls.Relationship.invalid){
      triggerSnackbar("NOK Relationship is not valid", snackBar);
      return false
    }
    if(otherForm.controls.ContactAddress.invalid){
      triggerSnackbar("NOK Contact Address is not valid", snackBar);
      return false
    }
    if(otherForm.controls.NextofKinPhone.invalid){
      triggerSnackbar("NOK Phone is not valid", snackBar);
      return false
    }
    if(otherForm.controls.NextOfKinEmail.invalid){
      triggerSnackbar("NOK Email is not valid", snackBar);
      return false
    }
    if(otherForm.controls.NOKNationality.invalid){
      triggerSnackbar("NOK Nationality is not valid", snackBar);
      return false
    }
    if(otherForm.controls.NextofKinGender.invalid){
      triggerSnackbar("NOK Gender is not valid", snackBar);
      return false
    }
    if(otherForm.controls.NOKDateOfBirth.invalid){
      triggerSnackbar("NOK Date of birth is not valid", snackBar);
      return false
    }
    if(otherForm.controls.AverageAnnualIncome.invalid){
      triggerSnackbar("Average Annual Income is not valid", snackBar);
      return false
    }
    if(otherForm.controls.SourceofInvestment.invalid){
      triggerSnackbar("Source of Investment is not valid", snackBar);
      return false
    }
    if(otherForm.controls.PurposeofInvestment.invalid){
      triggerSnackbar("Purpose of Investment is not valid", snackBar);
      return false
    }
    if(otherForm.controls.OfficeEmail.invalid){
      triggerSnackbar("Office Email is not valid", snackBar);
      return false
    }
    if(otherForm.controls.OfficePhoneNumber.invalid){
      triggerSnackbar("Office Phone Number is not valid", snackBar);
      return false
    }
    if(otherForm.controls.OfficialAddress.invalid){
      triggerSnackbar("Office Address is not valid", snackBar);
      return false
    }

    /////////////////////////////////////
    if(pep.invalid){
      triggerSnackbar("Politically Exposed status is not valid", snackBar);
      return false
    }

    if(pepForm.controls.PEPWho.invalid){
      triggerSnackbar("Name of PEP is not valid", snackBar);
      return false
    }
    if(pepForm.controls.PoliticallyExposedPerson.invalid){
      triggerSnackbar("Relationship with PEP is not valid", snackBar);
      return false
    }
    if(pepForm.controls.PositionHeld.invalid){
      triggerSnackbar("Position Held is not valid", snackBar);
      return false
    }
    if(pepForm.controls.DateOfOffice.invalid){
      triggerSnackbar("Date Of Office is not valid", snackBar);
      return false
    }
    
    //////////////////////////////////////////////////
    if(idType.invalid){
      triggerSnackbar("ID type is not valid", snackBar);
      return false
    }
    if(idForm.controls.IDNumber.invalid){
      triggerSnackbar("ID Number is not valid", snackBar);
      return false
    }
    if(idForm.controls.MeansOfIDIssueDate.invalid){
      triggerSnackbar("Means Of ID Issue Date is not valid", snackBar);
      return false
    }
    if(idForm.controls.MeansOfIDExpirationDate.invalid){
      triggerSnackbar("Means Of ID Expiration Date is not valid", snackBar);
      return false
    }

    return true;
  }
