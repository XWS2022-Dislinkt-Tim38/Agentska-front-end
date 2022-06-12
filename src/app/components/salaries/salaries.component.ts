import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CompanyModel } from 'src/app/model/company';
import { SalaryModel } from 'src/app/model/salary';
import { SalaryDTO } from 'src/app/model/salaryDTO';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CompanyService } from 'src/app/service/company.service';
import { SalaryService } from 'src/app/service/salary.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-salaries',
  templateUrl: './salaries.component.html',
  styleUrls: ['./salaries.component.scss']
})
export class SalariesComponent implements OnInit {

  idCompany: string = '';
  company: CompanyModel = new CompanyModel();
  subs: Subscription[] = [];
  date?: Date = new Date();
  flagSalary: boolean = false;
  currentUser: UserModel = new UserModel();

  salary: SalaryModel = new SalaryModel();
  salaries: Array<SalaryDTO> = new Array<SalaryDTO>();
  salariesTemp: Array<SalaryModel> = new Array<SalaryModel>();
  averageSalary: number = 0;
  sumSalaries: number = 0;
  salaryDTO: SalaryDTO = new SalaryDTO();
  salariesDTO: Array<SalaryDTO> = new Array<SalaryDTO>();
  salariesPositions: Array<String> = new Array<String>();
  salariesNeto: Array<number> = new Array<number>();
  salariesPositionTemp: Array<String> = new Array<String>();

  //ngModel
  position: String = '';
  netoSalary?: number;


  constructor(private salaryService: SalaryService, private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private auth: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {

    if(this.auth.isLoggedIn$){
      this.userService.getUser(this.auth.loggedUser?.sub).subscribe((response: UserModel) => {
         this.currentUser = response;
       });
     }

    this.idCompany = this.route.snapshot.params['id'];
    this.getCompany();
    this.getUniqueCompanySalaries();
  }
  
  getCompany() {
    this.subs.push(this.companyService.getCompany(this.idCompany).subscribe((response: CompanyModel) => {
      this.company = response;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  getUniqueCompanySalaries() {
    this.subs.push(this.salaryService.getUniqueCompanySalaries(this.idCompany).subscribe((response: SalaryDTO[]) => {
      this.salaries = response;
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  addSalary() {
    if(this.position == '' || this.netoSalary == undefined){
      alert("Invalid input. Try again.");
    } else {
      this.salary.idUser = this.currentUser.id;
      this.salary.position = this.position;
      this.salary.nettoSalary = this.netoSalary;
      this.subs.push(this.salaryService.addSalary(this.salary, this.company.id).subscribe());
      alert("Salary added!");
      this.closeSalaryDialog();
      window.location.reload();
    }
  }
  
  openSalaryDialog() {
    if(this.currentUser.role == 'USER'){
      this.flagSalary = true;
    } else {
      alert("Morate biti ulogovani da biste ostavili komentar.");
    }
  }

  closeSalaryDialog() {
    this.flagSalary = false;
  }

  goHome() {
    this.router.navigate(['/company/' + this.company.id]);
  }

  goComments() {
    this.router.navigate(['/company/' + this.company.id + '/comments']);
  }

  goInterview() {
    this.router.navigate(['/company/' + this.company.id + '/interview']);
  }

  goOffers() {
    this.router.navigate(['/company/' + this.company.id + '/offers']);
  }

}
