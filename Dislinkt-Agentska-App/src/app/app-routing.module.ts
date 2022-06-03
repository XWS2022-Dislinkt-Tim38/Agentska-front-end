import { NgModule } from '@angular/core';
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
    canActivate: [LoggedInGuard, HasRoleGuard],
    data: { role: 'USER'}
  },

  { path: "adminRequests",
    component: RequestListAdminComponent,
    canActivate: [LoggedInGuard, HasRoleGuard],
    data: { role: 'USER'} 
  },

  { path: "requests",
    component: RequestListUserComponent
    
  },
  
  {
    path: "company/:id",
    component: CompanyHomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
