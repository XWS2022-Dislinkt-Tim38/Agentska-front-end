import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HasRoleGuard } from './auth/has-role.guard';
import { LoggedInGuard } from './auth/logged-in.guard';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { MakeRequestComponent } from './components/make-request/make-request.component';
import { RequestListAdminComponent } from './components/request-list-admin/request-list-admin.component';
import { RequestListUserComponent } from './components/request-list-user/request-list-user.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SalariesComponent } from './components/salaries/salaries.component';
import { InterviewComponent } from './components/interview/interview.component';
import { OffersComponent } from './components/offers/offers.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { LinkAccountComponent } from './components/link-account/link-account.component';
import { OfferComponent } from './components/offer/offer.component';
import { QrcodeComponent } from './components/qrcode/qrcode.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';


const routes: Routes = [

  { path: "", component: HomeComponent },
  { path: "registration", component: RegistrationComponent},
  { path: "login", component: LoginComponent},

  { path: "addCompany", 
    component: AddCompanyComponent,
    canActivate: [LoggedInGuard, HasRoleGuard],
    data: { role: 'USER' }
  },

  { path: "companies", 
    component: CompanyListComponent
  },

  {
    path: "companies/:idCompany",
    component: CompanyDetailsComponent
  },

  { path: "request",
    component: MakeRequestComponent,
    canActivate: [LoggedInGuard]
  },

  { path: "adminRequests",
    component: RequestListAdminComponent,
    canActivate: [LoggedInGuard, HasRoleGuard],
    data: { role: 'ADMIN'} 
  },

  { path: "requests",
    component: RequestListUserComponent
    
  },
  
  {
    path: "company/:id",
    component: CompanyHomeComponent
  },
  
  {
    path: "company/:id/comments",
    component: CommentsComponent
  },

  {
    path: "company/:id/salaries",
    component: SalariesComponent
  },

  {
    path: "company/:id/interview",
    component: InterviewComponent
  },

  { path: "company/:id/offers",
    component: OffersComponent,
  },

  { 
    path: "user/:username",
    canActivate: [LoggedInGuard],
    component: UserProfileComponent,
  },

  { path: "user/:username/linkaccount",
    canActivate: [LoggedInGuard, HasRoleGuard],
    component: LinkAccountComponent,
    data: { role: 'COMPANY_OWNER'}
  },

  { path: "company/:idCompany/offer/:idOffer",
    component: OfferComponent,
  },
  {
    path: "user/:username/2faconfig",
    canActivate: [LoggedInGuard],
    component: QrcodeComponent
  },
  {
    path: "verifyCode",
    component: VerifyCodeComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
