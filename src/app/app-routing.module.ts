import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountTableComponent } from './core/pages/tables/account-table/account-table.component';
import { CapturePageComponent } from './core/pages/capture-component/capture-component.component';
import { DetailsPageComponent } from './core/pages/details/details-page/details-page.component';
import { DetailsSummaryComponent } from './core/pages/details/details-summary/details-summary.component';
import { NotFoundComponent } from './core/pages/not-found/not-found.component';
import { AuthenticateComponent } from './core/components/authenticate/authenticate.component';
import { AuthGuard } from './core/guards';
import { MasterLayoutComponent } from './core/components/master-layout/master-layout.component';
import { ReworkTableComponent } from './core/pages/tables/rework-table/rework-table.component';
import { GeneralTableComponent } from './core/pages/tables/general-table/general-table.component';

const routes: Routes = [
  // {
  //   path:"",
  //   redirectTo:"authenticate",
  //   pathMatch: "full"
  // },

  {
    path: 'Authenticate',
    component: AuthenticateComponent,
  },
  {
    path: "SislAccountManagement",
    component: MasterLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path:"capture-page",
            component: CapturePageComponent,
            pathMatch: "full",
            canActivate: [AuthGuard],
          },

          {
            path:"request-table",
            component: AccountTableComponent,
            pathMatch: "full",
            canActivate: [AuthGuard],
          },
          {
            path:"request-table/:id",
            component: DetailsSummaryComponent,
            canActivate: [AuthGuard],
          },

          {
            path:"rework-table",
            component: ReworkTableComponent,
            pathMatch: "full",
            canActivate: [AuthGuard],
          },
       
        {
          path: ':moduleLink',
          component: GeneralTableComponent,
          canActivate: [AuthGuard],
        },
        {
          path: ':moduleLink/:id',
          component: DetailsPageComponent,
          canActivate: [AuthGuard],
        },
          ]
      }
     
    ]
  },
    
  /////////////////////////////////////////////
  {
    path: '**', component: NotFoundComponent, pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true, 
    relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
