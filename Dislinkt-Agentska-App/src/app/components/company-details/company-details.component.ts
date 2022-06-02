import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  company: CompanyModel = new CompanyModel();
  subs: Subscription[] = [];
  idCompany!: string;
  //flagDisabledEdit: boolean = true;
  private _flagDisabledEdit = new BehaviorSubject<boolean>(false)
  flagDisabledEdit = this._flagDisabledEdit.asObservable()
  companyEdit: CompanyModel = new CompanyModel();

  
  //za edit
  name?: string;
  city?: string;
  foundation?: string;
  numberOfEmployees?: string;
  country?: string;
  website?: string;
  industry?: string;
  /*
  //forma
  companyUpdateForm = new FormGroup({
    name:  new FormControl('', Validators.required),
    city: new FormControl('', Validators.required),
    foundation: new FormControl('', Validators.required),
    numberOfEmployees: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    website: new FormControl('', Validators.required),
    industry: new FormControl('', Validators.required)
  });
  */


  constructor(private companyService: CompanyService, private route: ActivatedRoute) {
    this._flagDisabledEdit.next(true);
    
   }

  ngOnInit(): void {
    this.idCompany = this.route.snapshot.params['idCompany'];
    this.getCompany();
    
  }

  getCompany() {
    this.subs.push(this.companyService.getCompany(this.idCompany).subscribe((response: CompanyModel) => {
      this.company = response;
      this.name = response.companyDetails.name;
      this.city = response.companyDetails.city;
      this.foundation = response.companyDetails.foundation;
      this.numberOfEmployees = response.companyDetails.numberOfEmployees;
      this.country = response.companyDetails.country;
      this.website = response.companyDetails.website;
      this.industry = response.companyDetails.industry;
      console.log(this.company);
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    }));
  }

  editCompany(): void {
    this.subs.push(this.companyService.editCompany(this.company).subscribe());
  }

  public cancelEdit() {
    this.company.companyDetails.name = this.name;
    this.company.companyDetails.city = this.city;
    this.company.companyDetails.foundation = this.foundation;
    this.company.companyDetails.numberOfEmployees = this.numberOfEmployees;
    this.company.companyDetails.country = this.country;
    this.company.companyDetails.website = this.website;
    this.company.companyDetails.industry = this.industry;
  }


}
