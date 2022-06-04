import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CompanyService } from 'src/app/service/company.service';
import { RegistrationService } from 'src/app/service/registration.service';
import { UserService } from 'src/app/service/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})


export class AddCompanyComponent implements OnInit {

  currentUser: UserModel = new UserModel();

  idUser?: string = this.currentUser.id;
  user: UserModel = new UserModel();
  subs: Subscription[] = [];
  flag: boolean = false;
  username: string | undefined;
  companyRegistration: CompanyModel = new CompanyModel();

  name: string = '';
  city: string = '';
  foundation: string = '';
  numberOfEmployees: string = '';
  country: string = '';
  website: string = '';
  industry: string = '';

  get token(): any {
    return localStorage.getItem('regUserToken');
  }

  public getUsername(token: string): string | undefined{
    if (!token) {
      return '';
    }

    this.user = JSON.parse(atob(this.token.split('.')[1])) as UserModel;
    this.username = this.user.sub;
    this.getUser(this.username);

    return this.username;
  }
  
  getUser(username?: string): void {
    this.subs.push(this.userService.getUser(username).subscribe((response: UserModel) => {
      this.currentUser.address = response.address;
      this.currentUser.dateOfBirth = response.dateOfBirth;
      this.currentUser.email = response.email;
      this.currentUser.firstName = response.firstName;
      this.currentUser.id = response.id;
      this.currentUser.isVerified = response.isVerified;
      this.currentUser.key = response.key;
      this.currentUser.lastName = response.lastName;
      this.currentUser.password = response.password;
      this.currentUser.phoneNumber = response.phoneNumber;
      this.currentUser.role = response.role;
      this.currentUser.username = response.username;
    }));
  }

  constructor(private companyService: CompanyService, private auth: AuthenticationService, private http: HttpClient, private userService: UserService) {

  }

  ngOnInit(): void {
    this.flag = false;
    this.getUsername(this.token);

  }

  registerForm = new FormGroup({
    name:  new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    foundation: new FormControl('', Validators.required),
    numberOfEmployees: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    industry: new FormControl('', Validators.required),
    
  });
  
  addCompany(): void {
    
    if (this.registerForm.valid) {
        console.log('Adding company');
        var companyDet = {
          name: this.name,
          city: this.city,
          foundation: this.foundation,
          numberOfEmployees: this.numberOfEmployees,
          country: this.country,
          website: this.website,
          industry: this.industry,
          techStack: new Array<String>(),
          followers: new Array<String>()
        }
        this.companyRegistration = {
          idUser: this.currentUser.id,
          companyDetails: companyDet,
          offers: []
        }
        this.companyService.addCompany(this.companyRegistration).subscribe(response => {
          this.flag = true;
          //alert("Company sent for admin approval.")
          window.location.href="http://localhost:4200/"
        });
    }else{
      console.log('Failed',this.registerForm.invalid);
      alert('Invalid input. Try again');
      return;
    }
  }


}
