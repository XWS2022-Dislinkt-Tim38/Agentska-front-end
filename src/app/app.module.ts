import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule} from '@angular/material/menu'
import { MatListModule } from '@angular/material/list'
import { MatToolbarModule} from '@angular/material/toolbar'
import { MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatCardModule} from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AddCompanyComponent } from './components/add-company/add-company.component';
import { CompanyDetailsComponent } from './components/company-details/company-details.component';
import { MatNativeDateModule } from '@angular/material/core';
import { CompanyListComponent } from './components/company-list/company-list.component';
import { MakeRequestComponent } from './components/make-request/make-request.component';
import { AuthInterceptorProvider} from './auth.interceptor';
import { RequestListAdminComponent } from './components/request-list-admin/request-list-admin.component';
import { RequestListUserComponent } from './components/request-list-user/request-list-user.component';
import { CompanyHomeComponent } from './components/company-home/company-home.component';
import { CommentsComponent } from './components/comments/comments.component';
import { SalariesComponent } from './components/salaries/salaries.component';
import { InterviewComponent } from './components/interview/interview.component';
import {MatSliderModule} from '@angular/material/slider';
import { OffersComponent } from './components/offers/offers.component';
import { MatChipsModule} from '@angular/material/chips';
import { LinkAccountComponent } from './components/link-account/link-account.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { OfferComponent } from './components/offer/offer.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatTabsModule} from '@angular/material/tabs'
import { DatePipe } from '@angular/common';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    RegistrationComponent,
    LoginComponent,
    AddCompanyComponent,
    CompanyDetailsComponent,
    CompanyListComponent,
    MakeRequestComponent,
    RequestListAdminComponent,
    RequestListUserComponent,
    CompanyHomeComponent,
    CommentsComponent,
    SalariesComponent,
    InterviewComponent,
    OffersComponent,
    UserProfileComponent,
    LinkAccountComponent,
    OfferComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSliderModule,
    MatChipsModule,
    ScrollingModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatTabsModule

  ],
  providers: [AuthInterceptorProvider, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
