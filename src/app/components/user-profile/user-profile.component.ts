import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyModel } from 'src/app/model/company';
import { OfferModel } from 'src/app/model/offer';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CompanyService } from 'src/app/service/company.service';
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
  mfaDisabled: boolean = false
  company: CompanyModel = new CompanyModel()
  offer: OfferModel = new OfferModel()

  constructor(private authService: AuthenticationService, 
              private userService: UserService,  
              private router: Router,
              private offerService: OfferService,
              private companyService: CompanyService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {
   
    this.getUser();
    
  }

  getUser() {
    this.userService.getUser(this.username).subscribe(
    {
      next: (user: UserModel) => {
      
      this.user = user
      console.log(user)
      
      if(this.role === "COMPANY_OWNER" && this.user?.key === '')
        this.isDisabled = false;
 
      this.companyService.getCompanyByOwner(this.user.id).subscribe(
        {
          next: (company: CompanyModel) => 
          {
            company.offers.forEach(offer => {
              offer.publishDateString = this.datePipe.transform(offer.publishDate, 'dd/MM/yyyy') || ''
              offer.deadlineDateString = this.datePipe.transform(offer.deadlineDate, 'dd/MM/yyyy') || ''
              
            });
            this.company = company; 
          },
          error: () => {alert("No companies found")}
        }
      )

      }   
    })
  }

  viewOffer(offerId?: string, compayId?: string) {
    this.router.navigate(['/company/' + compayId + '/offer/' + offerId]);
  }

  //TODO: Prilagoditi za vise kompanija
  share(offerId: string, offer: any): void{

     this.offerService.shareOffer(offer, this.user?.key || '').subscribe({

      next: () => 
      {
        this.offerService.setSharedFlag(this.company.id || '', offerId).subscribe(
          {
            next: response => {if(response) alert ("Successfully shared post!"); else alert ("Couldn't share post... Try again later."); window.location.reload()}
          })
      },
      error: () => {alert("There was an error...")}
    })
  }

  

}
