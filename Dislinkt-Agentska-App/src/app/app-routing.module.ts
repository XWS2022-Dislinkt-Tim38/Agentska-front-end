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
import { OffersComponent } from './components/offers/offers.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';


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

  { path: "offers",
    component: OffersComponent,
  },

  { 
    path: "user/:username",
    component: UserProfileComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
