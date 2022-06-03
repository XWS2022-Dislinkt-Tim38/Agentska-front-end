import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-company-home',
  templateUrl: './company-home.component.html',
  styleUrls: ['./company-home.component.scss']
})
export class CompanyHomeComponent implements OnInit {

  idCompany: string = '';
  company: CompanyModel = new CompanyModel();
  subs: Subscription[] = [];

  constructor(private route: ActivatedRoute, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.idCompany = this.route.snapshot.params['id'];
    this.getCompany();
  }

  getCompany() {
    this.subs.push(this.companyService.getCompany(this.idCompany).subscribe((response: CompanyModel) => {
      this.company = response;
      console.log(this.company);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

}
