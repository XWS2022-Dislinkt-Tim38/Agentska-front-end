import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { RequestModel } from 'src/app/model/request';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CompanyService } from 'src/app/service/company.service';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.scss']
})
export class MakeRequestComponent implements OnInit {

  currentUser: UserModel = new UserModel();
  idUser?: string = this.currentUser.id;
  user: UserModel = new UserModel();
  subs: Subscription[] = [];
  flag: boolean = false;
  username: string | undefined;
  companyRegistration: CompanyModel = new CompanyModel();
  request: RequestModel = new RequestModel();

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
    this.subs.push(this.userService.getUser(this.username).subscribe((response: UserModel) => {
      this.currentUser.id = response.id;
    }));

    return this.username;
  }
  
  constructor(private companyService: CompanyService, private auth: AuthenticationService, private http: HttpClient, private userService: UserService, private requestService: RequestService) {

  }

  ngOnInit(): void {
    this.flag = false;
    this.getUsername(this.token);

  }

  requestForm = new FormGroup({
    name:  new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    foundation: new FormControl('', Validators.required),
    numberOfEmployees: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    industry: new FormControl('', Validators.required),
    
  });
  
  createRequest(): void {
    
    if (this.requestForm.valid) {
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
          companyDetails: companyDet
        }
        this.request = {
          idUser: this.currentUser.id,
          companyDTO: this.companyRegistration
        }
        this.requestService.createRequest(this.request).subscribe(response => {
          alert("Company sent for admin approval.")
          window.location.href="http://localhost:4200/"
        });
    }else{
      console.log('Failed', this.requestForm.invalid);
      alert('Invalid input. Try again');
      return;
    }
  }

}
