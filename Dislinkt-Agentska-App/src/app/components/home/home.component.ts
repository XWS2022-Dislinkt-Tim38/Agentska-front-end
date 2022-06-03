import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companies: CompanyModel[] | undefined;
  subs: Subscription[] = [];

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    
    this.getAllCompanies();
    
  }

  getAllCompanies() {
      this.subs.push(this.companyService.getAllCompanies().subscribe((response: CompanyModel[]) => {
        this.companies = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }));
  }
}
