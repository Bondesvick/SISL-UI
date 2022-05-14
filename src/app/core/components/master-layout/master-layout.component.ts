import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { ITokenResponse } from '../../models/auth';
import { ModulePages } from '../../models/ITokenResponse';

@Component({
  selector: 'app-master-layout',
  templateUrl: './master-layout.component.html',
  styleUrls: ['./master-layout.component.scss']
})
export class MasterLayoutComponent implements OnInit {
  staffname: string;
  staffemail: string;
  serviceResponse: ITokenResponse;
  response: any;
  res: string;
  component: string;
  branch: string;
  userId: string;
  applicationModules: ModulePages[];

  constructor() { }

  ngOnInit(): void {
    this.staffname = localStorage.getItem('name');
    this.staffemail = localStorage.getItem('email');
    this.component = localStorage.getItem('Modulename');
    this.branch = localStorage.getItem('branch');
    this.userId = localStorage.getItem('userId');
    this.serviceResponse = JSON.parse(localStorage.getItem('response'));

    this.pushValidLinksToRoutes()
    this.applicationModules = [
      
      //...this.getPageMenus(this.serviceResponse),
      // this.getPageMenus(this.serviceResponse).find(x => x.link === "supervisor-table"),
      // this.getPageMenus(this.serviceResponse).find(x => x.link === "compliance-table"),
      // this.getPageMenus(this.serviceResponse).find(x => x.link === "approver-table"),
      ...QUICK_SERVICE_MODULES,
    ];
    console.log(this.applicationModules)
    localStorage.setItem(
      'sislModules',
      JSON.stringify(this.applicationModules)
    );
  }


  get goBackUrl() {
    return localStorage.getItem('callerUrl');
  }

  private getPageMenus(res: ITokenResponse): ModulePages[] | any[] {
    const targetModule = res?.body.modules.find(
      (m) => m.name === this.component.split('/')[0]
    );
    if (targetModule) {
      return targetModule.modulePages.filter(
        (page) => !page.name.includes('Module')
      );
    }
    return [];
  }

  private pushValidLinksToRoutes(){
    if(this.getPageMenus(this.serviceResponse).some(x => x.link === "capture-page")){
      QUICK_SERVICE_MODULES.push(this.getPageMenus(this.serviceResponse).find(x => x.link === "capture-page"))
    }

    if(this.getPageMenus(this.serviceResponse).some(x => x.link === "verifier-table")){
      QUICK_SERVICE_MODULES.push(this.getPageMenus(this.serviceResponse).find(x => x.link === "verifier-table"))
    }

    if(this.getPageMenus(this.serviceResponse).some(x => x.link === "compliance-table")){
      QUICK_SERVICE_MODULES.push(this.getPageMenus(this.serviceResponse).find(x => x.link === "compliance-table"))
    }

    if(this.getPageMenus(this.serviceResponse).some(x => x.link === "authorizer-table")){
      QUICK_SERVICE_MODULES.push(this.getPageMenus(this.serviceResponse).find(x => x.link === "authorizer-table"))
    }

    if(this.getPageMenus(this.serviceResponse).some(x => x.link === "request-table")){
      QUICK_SERVICE_MODULES.push(this.getPageMenus(this.serviceResponse).find(x => x.link === "request-table"))
    }

    if(this.getPageMenus(this.serviceResponse).some(x => x.link === "rework-table")){
      QUICK_SERVICE_MODULES.push(this.getPageMenus(this.serviceResponse).find(x => x.link === "rework-table"))
    }
  }
}

export const QUICK_SERVICE_MODULES: ModulePages[] = [
  // {
  //   name: "Verifier's Page",
  //   role: '',
  //   url: '',
  //   link: '/SislAccountManagement/verifier-table',
  //   icon: 'verified_user'
  // },
  // {
  //   name: "Compliance Page",
  //   role: '',
  //   url: '',
  //   link: '/SislAccountManagement/compliance-table',
  //   icon: 'fact_check'
  // },
  // {
  //   name: "Authorizer's Page",
  //   role: '',
  //   url: '',
  //   link: '/SislAccountManagement/authorizer-table',
  //   icon: 'done'
  // },
  
];
