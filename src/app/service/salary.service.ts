import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SalaryModel } from '../model/salary';
import { SalaryDTO } from '../model/salaryDTO';

@Injectable({
  providedIn: 'root'
})
export class SalaryService {

  constructor(private http: HttpClient) { }

  public addSalary(salary: SalaryModel, companyId?: string): Observable<any>{
    return this.http.post(`${environment.baseSalaryService}/companysalary/${companyId}`, salary);
  }

  public getAllCompanySalaries(companyId?: string) {
    return this.http.get<SalaryModel[]>(`${environment.baseSalaryService}/companysalary/${companyId}`);
  }

  public getUniqueCompanySalaries(companyId?: string) {
    return this.http.get<SalaryDTO[]>(`${environment.baseSalaryService}/companysalary/unique/${companyId}`);
  }

}
