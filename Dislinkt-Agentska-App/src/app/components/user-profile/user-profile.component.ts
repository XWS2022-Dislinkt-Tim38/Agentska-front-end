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
  company: CompanyModel = new CompanyModel()

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
      if(this.role === "COMPANY_OWNER" && this.user?.key === '')
        this.isDisabled = false;
      
      this.companyService.getCompanyByOwner(this.user.id).subscribe(
        {
          next: (company: CompanyModel) => 
          {
            this.company = company; 
          }
        }
      )

      }   
    })
  }

  viewOffer(offerId?: string, compayId?: string) {
    this.router.navigate(['/company/' + compayId + '/offer/' + offerId]);
  }

  share(): void{

  }

}
