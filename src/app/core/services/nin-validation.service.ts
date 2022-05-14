import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiResponse } from '../models/SmileIdResponse';

@Injectable({
  providedIn: 'root'
})
export class NinValidationService {
  apiBaseUrl: string;

constructor(private http: HttpClient) { 
  this.apiBaseUrl = environment.baseURI;
}

validateCustomer(payload: any){
  const httpHeaders = new HttpHeaders({ 
              'Content-Type': 'application/json', 
              'Accept':'*/*', 
              'Accept-Encoding':'gzip, deflate, br',
              'Connection':'keep-alive'})
              //.set('Content-Type','application/json; charset=utf-8')
              //.set('Accept','*/*'); 
  return this.http.post<ApiResponse>(`${this.apiBaseUrl}/IdentityValidation/Validate`, payload)
}

}
