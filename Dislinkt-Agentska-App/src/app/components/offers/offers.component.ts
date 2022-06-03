import { Component, OnInit } from '@angular/core';
import { OfferModel } from 'src/app/model/offer';
import { UserTokenModel } from 'src/app/model/userToken';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { OfferService } from 'src/app/service/offer.service';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  user?: UserTokenModel
  offers: OfferModel[] = []

  constructor(private authService: AuthenticationService, private offerService: OfferService) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn$){
      this.user = JSON.parse(atob(this.authService.token.split('.')[1])) as UserTokenModel;
    }

    this.offerService.getAllOffers().subscribe((offers: OfferModel[]) => {
        this.offers = offers;
    })


  }

}
