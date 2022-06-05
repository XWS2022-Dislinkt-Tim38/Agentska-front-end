import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { OfferModel } from 'src/app/model/offer';
import { UserModel } from 'src/app/model/user';
import { UserTokenModel } from 'src/app/model/userToken';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { OfferService } from 'src/app/service/offer.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  currentUser: UserModel = new UserModel();
  offer: OfferModel = new OfferModel();
  subs: Subscription[] = [];
  idOffer!: string;
  idCompany!: string;
  flagOwner: boolean = false;
  
  //flagDisabledEdit: boolean = true;
  private _flagDisabledEdit = new BehaviorSubject<boolean>(false)
  flagDisabledEdit = this._flagDisabledEdit.asObservable()
  offerEdit: OfferModel = new OfferModel();
  flagEdit: boolean = false;

  
  //za edit
  title?: string;
  content?: string;
  industry?: string;
  field?: string;
  seniority?: string;
  requirements?: Array<String>;
  workType?: string;
  publishDate?: Date;
  deadlineDate?: Date;
  city?: string;

  constructor(private offerService: OfferService, private router: Router, private route: ActivatedRoute, public auth: AuthenticationService, private userService: UserService) {
    this._flagDisabledEdit.next(true);

   }

  ngOnInit(): void {

    if(this.auth.isLoggedIn$){
      console.log(this.auth.loggedUser)
      this.userService.getUser(this.auth.loggedUser?.sub).subscribe((response: UserModel) => {
         this.currentUser = response;
         if(this.currentUser.role = 'COMPANY_OWNER'){
          this.flagOwner = true;
        } else {
          this.flagOwner = false;
        }
       });
    }

    this.idOffer = this.route.snapshot.params['idOffer'];
    this.idCompany = this.route.snapshot.params['idCompany'];
    console.log(this.idOffer);
    this.getOffer();

  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }
  
  getOffer() {
    this.subs.push(this.offerService.getOffer(this.idCompany, this.idOffer).subscribe((response: OfferModel) => {
      console.log(response);
      this.offer = response;
      this.title = response.title;
      this.industry = response.industry;
      this.field = response.field;
      this.seniority = response.seniority;
      this.requirements = response.requirements;
      this.workType = response.workType;
      this.publishDate = response.publishDate;
      this.deadlineDate = response.deadlineDate;
      this.city = response.city;
      this.content = response.content;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  editOffer(): void {
    this.subs.push(this.offerService.editOffer(this.offer ,this.idCompany).subscribe(response => {
      console.log(response);
    }));
  }

  goBack() : void {
    this.router.navigate(['']);
  }

  public cancelEdit() {
    this.offer.title = this.title;
    this.offer.industry = this.industry;
    this.offer.field = this.field;
    this.offer.seniority = this.seniority;
    this.offer.requirements = this.requirements;
    this.offer.workType = this.workType;
    this.offer.publishDate = this.publishDate;
    this.offer.deadlineDate = this.deadlineDate;
    this.offer.city = this.city;
    this.offer.content = this.content;
    this.subs.push(this.offerService.editOffer(this.offer ,this.idCompany).subscribe(response => {
      console.log(response);
    }));
  }

}
