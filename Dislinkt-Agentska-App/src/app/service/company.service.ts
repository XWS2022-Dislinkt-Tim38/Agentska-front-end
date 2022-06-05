import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { CompanyModel } from "../model/company";
import { UserModel } from "../model/user";
import { AuthenticationService } from "./authentication.service";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class CompanyService {
    
    private companyUrl = 'http://localhost:8020/company';
    private token = this.auth.token;
    private reqHeader = new HttpHeaders().set('Authorization', 'Bearer ' + this.token);
    username: string = '';
    subs: Subscription[] = [];
    user: UserModel = new UserModel();

    constructor(private http: HttpClient, private auth: AuthenticationService, private userService: UserService){
        
    }

    public addCompany(company: CompanyModel): Observable<any>{
        return this.http.post(this.companyUrl, company);
    }

    public getAllCompanies() {
        return this.http.get<CompanyModel[]>(this.companyUrl);
    }

    public getUserCompanies(userId?: string) {
        return this.http.get<CompanyModel[]>(`${this.companyUrl}/usercompanies/?userId=${userId}`);
    }

    public getCompany(id: string) {
        return this.http.get<CompanyModel>(`${this.companyUrl}/${id}`);
    }

    public editCompany(company: CompanyModel){
        return this.http.put(this.companyUrl, company);
    }
}