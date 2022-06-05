import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CompanyService } from 'src/app/service/company.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {
  
  companies: CompanyModel[] | undefined;
  subs: Subscription[] = [];
  ownerCompanies: CompanyModel[] | undefined;
  currentUser: UserModel = new UserModel();
  userId?: string;

  constructor(private router: Router, private userService: UserService, private authService: AuthenticationService, private companyService: CompanyService) { }

  ngOnInit(): void {
    
    if(this.authService.isLoggedIn$){
      this.userService.getUser(this.authService.loggedUser?.sub).subscribe((response: UserModel) => {
         this.currentUser = response;
         
         this.getUserCompanies(this.currentUser.id);
       });
    }

    
  }

  getUserCompanies(id?: string) {
      this.subs.push(this.companyService.getUserCompanies(id).subscribe((response: CompanyModel[]) => {
        this.companies = response;
        console.log(response);
      }, (error: HttpErrorResponse) => {
        alert(error.message);
      }));
  } 

  companyDetails(id?: string){
    this.router.navigate(['/company/' + id]);
  }

}
