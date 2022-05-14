import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ITokenResponse } from '../../models/auth';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {
  response: any;
  username: string;
  useremail: string;
  serviceResponse: ITokenResponse;
  branch: string;
  branchId: string;
  uamResponse: string;
  userId: string;
  authToken: string;
  callerUrl: string;

  constructor(
    private router: Router,
    private authenticateService: AuthenticationService,
    private snackbar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const xfyuy = 'xfyuy';
    const xzerwq = 'xzerwq';
    const yohgcx = 'yohgcx';
    const kjyfcx = 'kjyfcx';

    this.route.queryParams.subscribe((params) => {
      this.uamResponse = atob(params[xfyuy] || btoa(null));
      this.userId = atob(params[xzerwq] || btoa(null));
      this.authToken = atob(params[yohgcx] || btoa(null));
      this.callerUrl = atob(params[kjyfcx] || btoa(null));

      localStorage.setItem('response', this.uamResponse);
      localStorage.setItem('userId', this.userId);
      localStorage.setItem('authorization', this.authToken);
      localStorage.setItem('callerUrl', this.callerUrl.replace('hash', '#'));

      if (
        this.uamResponse === 'null' ||
        this.userId === 'null' ||
        this.authToken === 'null' ||
        this.callerUrl === 'null'
      ) {
        this.snackbar.open(
          'Something went wrong! Please revalidate by logging into the system again',
          'Ok', {
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 30000,
          }
        );
      } else {
        this.serviceResponse = JSON.parse(localStorage.getItem('response'));
        this.branch = this.serviceResponse?.body.detail.branch;
        this.branchId = this.serviceResponse?.body.detail.branchId;
        this.username = this.serviceResponse?.body.detail.name;
        this.useremail = this.serviceResponse?.body.detail.email;
        localStorage.setItem('name', this.username);
        localStorage.setItem('email', this.useremail);
        localStorage.setItem('branch', this.branch);
        localStorage.setItem('branchId', this.branchId);
        this.LoadComponent('SislAccountManagement');
        // this.LoadComponent('SislAccountManagement/capture-page');
      }
    });
  }

  LoadComponent(componentName): void {
    localStorage.setItem('Modulename', componentName);
    const staffId = localStorage.getItem('userId');
    this.authenticateUser(staffId, componentName);
  }

  authenticateUser(staffId: string, component: string): void {
    this.spinner.show();

    this.authenticateService.tokenAuthorization(staffId).subscribe(
      async (response) => {
        const res = response.data?.newToken;
        if (response.responseCode === '00' && res != null) {
          localStorage.setItem('authorization', res);
          this.spinner.hide();
          await this.router.navigate([component]);
        } else {
          this.spinner.hide();
          this.snackbar.open(
            'Something went wrong! Please revalidate by logging into the system again'
          );
        }
      },
      () => {
        this.spinner.hide();
        this.snackbar.open(
          'Something went wrong. Please ensure you are connected'
        );
      }
    );
  }
}
