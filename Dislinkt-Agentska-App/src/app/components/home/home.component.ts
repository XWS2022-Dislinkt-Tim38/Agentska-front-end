import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { OfferModel } from 'src/app/model/offer';
import { CompanyService } from 'src/app/service/company.service';
import { OfferService } from 'src/app/service/offer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  companies: CompanyModel[] | undefined;
  offers: OfferModel[] | undefined;
  subs: Subscription[] = [];
  search: string = "";

  constructor(private companyService: CompanyService, private offerService: OfferService, private router: Router) { }

  ngOnInit(): void {
    
    this.getAllCompanies();
    this.getAllOffers();
  }

  getAllCompanies() {
      this.subs.push(this.companyService.getAllCompanies().subscribe((response: CompanyModel[]) => {
        this.companies = response;
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }));
  }

  getAllOffers() {
    this.subs.push(this.offerService.getAllOffers().subscribe((response: OfferModel[]) => {
      this.offers = response;
      console.log(response);
      console.log(this.offers);
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    }));
  }

  viewOffer(offerId?: string, compayId?: string) {
    this.router.navigate(['/company/' + compayId + '/offer/' + offerId]);
  }

  searchCompanies(event: any) {
    if(this.search.length === 0 || this.search === null || this.search === undefined){
      this.getAllCompanies();
    }
    this.companyService.getSearchedCompanies(this.search).subscribe((searchedCompanies: CompanyModel[]) => {
      this.companies = searchedCompanies;
      });
  }

  searchJobs(event: any) {
    if(this.search.length === 0 || this.search === null || this.search === undefined){
      this.getAllOffers();
    }
    this.offerService.getSearchedOffers(this.search).subscribe((searchedOffers: OfferModel[]) => {
      this.offers = searchedOffers;
      });
  }
}
