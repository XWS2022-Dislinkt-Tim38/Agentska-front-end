import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OfferModel } from 'src/app/model/offer';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { OfferService } from 'src/app/service/offer.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  username?: string = this.authService.loggedUser?.sub
  role: string = this.authService.loggedUser?.role
  user?: UserModel
  isDisabled: boolean = true
  offers: OfferModel[] | undefined;

  constructor(private authService: AuthenticationService, 
              private userService: UserService,  
              private router: Router,
              private offerService: OfferService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
   
    this.getUser();
    
  }

  getUser() {
    this.userService.getUser(this.username).subscribe(
    {
      next: (user: UserModel) => {
      
        this.user = user
      if(this.role === "COMPANY_OWNER" && this.user?.key === '')
        this.isDisabled = false;
      
      this.getAllOffers(user.id);
      }   
    })
  }


getAllOffers(userId?: string) {
  this.offerService.getAllOffersByUser(userId).subscribe(
    {
      next: (offers: OfferModel[]) => 
      {       
        offers.forEach(offer => {
          offer.publishDateString = this.datePipe.transform(offer.publishDate, 'dd/MM/yyyy') || ''
          offer.deadlineDateString = this.datePipe.transform(offer.deadlineDate, 'dd/MM/yyyy') || ''
        });

        this.offers = offers; console.log(offers)
      },
      error: (error: HttpErrorResponse) => {alert(error.message);}
    }
  )
 
} 

  viewOffer(offerId?: string, compayId?: string) {
    this.router.navigate(['/company/' + compayId + '/offer/' + offerId]);
  }

}
