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
}
