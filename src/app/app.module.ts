import { AccountnameValidationComponent } from './core/pages/dialog/accountname-validation/accountname-validation.component';
import { IpServiceService } from './core/services/ip-service.service';
//import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {CommonModule, DatePipe} from '@angular/common';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './core/modules/material.module';
import { FormsModule } from '@angular/forms';
import { CustomerAccountServiceService } from './core/services/customer-account-service.service';
//import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';
import { CapturePageComponent } from './core/pages/capture-component/capture-component.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { AccountTableComponent } from './core/pages/tables/account-table/account-table.component';
import { DetailsPageComponent } from './core/pages/details/details-page/details-page.component';
import { DetailsSummaryComponent } from './core/pages/details/details-summary/details-summary.component';
import { SpoolModalComponent } from './core/pages/dialog/spool-modal/spool-modal.component';
import { SpoolService } from './core/services/spool.service';
import { ExcelService } from './core/services/excel.service';
import { NinValidationService } from './core/services/nin-validation.service';
import { NinValidationComponent } from './core/pages/dialog/nin-validation/nin-validation.component';
import { DocumentViewerComponent } from './core/pages/dialog/document-viewer/document-viewer.component';
import { AuthenticationService } from './core/services/authentication.service';
import { AuthenticateComponent } from './core/components/authenticate/authenticate.component';
import { MasterLayoutComponent } from './core/components/master-layout/master-layout.component';
import { ReworkTableComponent } from './core/pages/tables/rework-table/rework-table.component';
import { GeneralTableComponent } from './core/pages/tables/general-table/general-table.component';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { ReworkReasonComponent } from './core/pages/dialog/rework-reason/rework-reason.component';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    CapturePageComponent,
    AccountTableComponent,
    DetailsPageComponent,
    DetailsSummaryComponent,
    SpoolModalComponent,
    NinValidationComponent,
    DocumentViewerComponent,
    AuthenticateComponent,
    MasterLayoutComponent,
    GeneralTableComponent,
    ReworkTableComponent,
    AccountnameValidationComponent,
    ReworkReasonComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    //FormGroup,
    ReactiveFormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('authorization'),
        allowedDomains: [environment.baseURIHost],
      },
    }),
    
    //ICountry
    //csc
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    CustomerAccountServiceService, 
    SpoolService, 
    ExcelService, 
    NinValidationService,
  AuthenticationService,
  IpServiceService,
  DatePipe,
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
