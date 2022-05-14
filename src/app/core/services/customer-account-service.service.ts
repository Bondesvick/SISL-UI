import { FetchCustomerResponse } from './../models/FetchCustomerResponse';
import { GetCustomerAccount } from './../models/CustomerAccount';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Params } from '../models/params';
import { map } from 'rxjs/operators';
import { getPaginatedResult, getPaginationheaders } from './paginationHelper';
import { CustomerAccount } from '../models/CustomerAccount';
import { of } from 'rxjs';
import { AccountRequest } from '../models/AccountRequest';
import { GenericAccountApiResponse, GenericApiResponse } from '../models/generic-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { SaveHistory } from '../models/SaveHistory';

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountServiceService {

  applicationCache = new Map();
  application: GetCustomerAccount;
  rework: GetCustomerAccount;

  apiBaseUrl: string;
  params!: Params;

  currentFilter: string;

constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
  this.apiBaseUrl = environment.baseURI;
  this.params = new Params();
 }

setParams(params: Params, filter: string){
  this.params = params;
  this.params.filter = filter;
}

getParams(){
  return this.params;
}

resetParams(){
  this.params = new Params();
  return this.params;
}


getAccountRequest(payload: AccountRequest){
  console.log(payload)
  console.log("hi there")
  this.application = null
  this.http.post<GenericAccountApiResponse>(`${this.apiBaseUrl}/Process/GetCustomerAccountById`,payload).subscribe(
    (response) => {
    console.log(response.data);
    if(response.responseCode == "00"){
      this.application = response.data;
    }
    else{
      this._snackBar.open(response.responseDescription, 'Error', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 50000,
        panelClass: ['errorSnackbar'],
      })
    }
  },
  (error) => {
    console.log(error);
    
    this._snackBar.open(`Techincal error has occured`, 'Failed', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 5000,
      panelClass: ['errorSnackbar'],
    });
  }
  )
}

GetCustomerAccountSummaryById(payload: AccountRequest){
  console.log(payload)
  console.log("hi there")
  this.application = null
  this.http.post<GenericAccountApiResponse>(`${this.apiBaseUrl}/Process/GetCustomerAccountSummaryById`,payload).subscribe(
    (response) => {
    console.log(response.data.meansOfIDExpirationDate);
    console.log(response.data)
    if(response.responseCode == "00"){
      this.application = response.data;
    }
    else{
      this._snackBar.open(response.responseDescription, 'Error', {
        verticalPosition: 'top',
        horizontalPosition: 'center',
        duration: 50000,
        panelClass: ['errorSnackbar'],
      })
    }
  },
  (error) => {
    console.log(error);
    
    this._snackBar.open(`Techincal error has occured`, 'Failed', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 5000,
      panelClass: ['errorSnackbar'],
    });
  }
  )
}

postAccountRequest(payload: CustomerAccount){
  console.log("hi hi")
  return this.http.post<GenericApiResponse>(`${this.apiBaseUrl}/Process/SaveCustomerAccount`,payload);
}

///////////////////////////////////////////////////////////////////
getApplications(applicationParams: Params, filter: string){
 var response = this.applicationCache?.get(Object.values(applicationParams).join('-'));
  if(response && filter == this.currentFilter){
    return of(response);
  }

  this.currentFilter = filter;

  let newparams = getPaginationheaders(applicationParams?.pageNumber, applicationParams?.pageSize,applicationParams.filter);
  

  return getPaginatedResult<CustomerAccount[]>(`${this.apiBaseUrl}/PagedData/GetAllCustomerAccounts`, newparams, this.http)
  .pipe(map(response => {
    console.log(response)
    this.applicationCache.set(Object.values(applicationParams).join('-'), response);
    return response;
  }));
}

fetchCustomer(custAId: string){
  return this.http.get<FetchCustomerResponse>(`${this.apiBaseUrl}/CustomerDetails/FetchCustomer/${custAId}`);
}

saveHistory(payload: SaveHistory){
  return this.http.post<GenericApiResponse>(`${this.apiBaseUrl}/Process/SaveHistory`,payload)
}

postAccount(payload: SaveHistory){
  return this.http.post<GenericApiResponse>(`${this.apiBaseUrl}/CustomerDetails/SaveCustomer`,payload)
}

validateAccount(accountNumber,destinationBankCode){
  return this.http.post<GenericApiResponse>(`${this.apiBaseUrl}/IdentityValidation/ValidateAccount`,{accountNumber,destinationBankCode})
}

}
