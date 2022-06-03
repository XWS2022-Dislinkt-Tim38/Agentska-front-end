import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  idCompany: string = '';
  company: CompanyModel = new CompanyModel();
  subs: Subscription[] = [];
  date?: Date = new Date();

  constructor(private route: ActivatedRoute, private companyService: CompanyService, private router: Router) { }

  ngOnInit(): void {
    this.idCompany = this.route.snapshot.params['id'];
    this.getCompany();

  }

  getCompany() {
    this.subs.push(this.companyService.getCompany(this.idCompany).subscribe((response: CompanyModel) => {
      this.company = response;
      console.log(this.company);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  goHome() {
    this.router.navigate(['/company/' + this.company.id]);
  }

  goSalaries() {
    this.router.navigate(['/company/' + this.company.id + '/salaries']);
  }

  goInterview() {
    this.router.navigate(['/company/' + this.company.id + '/interview']);
  }

}
