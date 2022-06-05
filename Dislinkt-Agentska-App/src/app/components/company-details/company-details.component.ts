import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  email?: string;
  phone?: string;

  constructor(private router: Router, private companyService: CompanyService, private route: ActivatedRoute) {
    this._flagDisabledEdit.next(true);
    
   }

  ngOnInit(): void {
    this.idCompany = this.route.snapshot.params['idCompany'];
    console.log(this.idCompany)
    this.getCompany();
    
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }
  
  getCompany() {
    this.subs.push(this.companyService.getCompany(this.idCompany).subscribe((response: CompanyModel) => {
      console.log(response);
      this.company = response;
      this.name = response.companyDetails.name;
      this.city = response.companyDetails.city;
      this.foundation = response.companyDetails.foundation;
      this.numberOfEmployees = response.companyDetails.numberOfEmployees;
      this.country = response.companyDetails.country;
      this.website = response.companyDetails.website;
      this.industry = response.companyDetails.industry;
      this.email = response.companyDetails.email;
      this.phone = response.companyDetails.phone;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  editCompany(): void {
    this.subs.push(this.companyService.editCompany(this.company).subscribe(response => {
      console.log(response);
    }));
  }

  public cancelEdit() {
    this.company.companyDetails.name = this.name;
    this.company.companyDetails.city = this.city;
    this.company.companyDetails.foundation = this.foundation;
    this.company.companyDetails.numberOfEmployees = this.numberOfEmployees;
    this.company.companyDetails.country = this.country;
    this.company.companyDetails.website = this.website;
    this.company.companyDetails.industry = this.industry;
    this.subs.push(this.companyService.editCompany(this.company).subscribe(response => {
      console.log(response);
    }));
  }

  goBack() {
    this.router.navigate(['/companies']);
  }


}
