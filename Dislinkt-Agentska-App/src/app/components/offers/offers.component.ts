import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { OfferModel } from 'src/app/model/offer';
import { UserModel } from 'src/app/model/user';
import { UserTokenModel } from 'src/app/model/userToken';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CompanyService } from 'src/app/service/company.service';
import { OfferService } from 'src/app/service/offer.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {


  offer: OfferModel = new OfferModel();
  user?: UserTokenModel
  offers: OfferModel[] = []
  subs: Subscription[] = [];
  idCompany: string = '';
  companyMod: CompanyModel = new CompanyModel();
  flagOffer: boolean = false;
  currentUser: UserModel = new UserModel();
  requirementsList: Array<string> = new Array<string>();
  
  //ngModel
  title: string = '';
  content: string = '';
  company: string = '';
  industry: string = '';
  field: string = '';
  seniority: string = '';
  requirement: string = '';
  workType: string = '';
  publishDate: Date = new Date();
  deadlineDate: Date = new Date();
  city: string = '';

  constructor(private userService: UserService, private router: Router, private authService: AuthenticationService, private offerService: OfferService, private companyService: CompanyService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    if(this.authService.isLoggedIn$){
      this.userService.getUser(this.authService.loggedUser?.sub).subscribe((response: UserModel) => {
         this.currentUser = response;
         console.log(this.currentUser)
       });
    }
    this.idCompany = this.route.snapshot.params['id'];
    this.getCompany();
    

    this.offerService.getAllOffers().subscribe((offers: OfferModel[]) => {
        this.offers = offers;
    })

  }

  offerForm = new FormGroup({
    title:  new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    company: new FormControl('', Validators.required),
    industry: new FormControl('', Validators.required),
    field: new FormControl('', Validators.required),
    seniority: new FormControl('', Validators.required),
    workType: new FormControl('', Validators.required),
    publishDate: new FormControl('', Validators.required), //datepicker
    deadlineDate: new FormControl('', Validators.required), //datepicker
    city: new FormControl('', Validators.required),
    requirement: new FormControl('', Validators.required)
  });

  getCompany() {
    this.subs.push(this.companyService.getCompany(this.idCompany).subscribe((response: CompanyModel) => {
      this.companyMod = response;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  addRequirement() {
    this.requirementsList.push(this.requirement);
  }

  removeRequirement(name: string) {
    this.requirementsList.forEach((value,index)=>{
      if(value==name) this.requirementsList.splice(index,1);
    });
  }

  goHome() {
    this.router.navigate(['/company/' + this.companyMod.id]);
  }

  goSalaries() {
    this.router.navigate(['/company/' + this.companyMod.id + '/salaries']);
  }

  goInterview() {
    this.router.navigate(['/company/' + this.companyMod.id + '/interview']);
  }

  goComments() {
    this.router.navigate(['/company/' + this.companyMod.id + '/comments']);
  }


  formatLabel(value: number) {
    return value;
  }

  cancelOffer() {
    this.flagOffer = false;
  }

  openOfferDialog() {
    this.flagOffer = true;
  }

  createOffer() {
    if(this.city!='' && this.company!='' && this.content!='' && this.field!='' && this.industry!='' && this.requirementsList!=[] && this.seniority!='' && this.title!='' && this.workType!=''){
      this.offer.city = this.city;
      this.offer.company = this.company;
      this.offer.content = this.content;
      this.offer.deadlineDate = this.deadlineDate;
      this.offer.field = this.field;
      this.offer.industry = this.industry;
      this.offer.publishDate = this.publishDate;
      this.offer.requirements = this.requirementsList;
      this.offer.seniority = this.seniority;
      this.offer.title = this.title;
      this.offer.workType = this.workType;
      this.offerService.addOffer(this.offer, this.companyMod.id).subscribe(response => {
        console.log(response);
        alert("Offer published!")
        this.flagOffer = false;
        window.location.reload();
      });
    }else{
      console.log(this.company + " " + this.workType + " " + this.city+ " " + this.content+" " + this.deadlineDate+" " + this.field+" " + this.industry+" " + this.publishDate+" " + this.requirementsList+" " + this.seniority+" " + this.title);
      console.log('Failed', this.offerForm.invalid);
      alert('Invalid input. Try again');
      return;
    }
  }

}

