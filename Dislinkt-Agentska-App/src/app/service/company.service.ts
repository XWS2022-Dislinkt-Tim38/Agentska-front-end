import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { asapScheduler, Observable, Subscription } from "rxjs";
import { LoginComponent } from "../components/login/login.component";
import { CompanyModel } from "../model/company";
import { UserModel } from "../model/user";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    
    private companyUrl = 'http://localhost:8020/company';
    username: string = '';
    subs: Subscription[] = [];
    user: UserModel = new UserModel();

    constructor(private http: HttpClient, private auth: AuthenticationService, private userService: UserService){
        
    }

    public addCompany(company: CompanyModel): Observable<any>{
        return this.http.post(this.companyUrl, company);
    }

}