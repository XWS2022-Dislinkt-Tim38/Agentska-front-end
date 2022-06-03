import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { UserModel } from "src/app/model/user";
import { AuthenticationService } from "./authentication.service";
import { async } from "@angular/core/testing";

@Injectable({
    providedIn: 'root'
  })

export class UserService {
    private token = this.auth.token;
    private reqHeader = new HttpHeaders().set('Authorization', 'Bearer' + this.token);
    user: Observable<UserModel> = new Observable<UserModel>();

    constructor(private http: HttpClient, private auth: AuthenticationService) { }

    public testAdmin(): Observable<any>{
        return this.http.get(environment.baseUrlUserService + "/role/testadmin");
    }

    public testUser(): Observable<any>{
        return this.http.get(environment.baseUrlUserService + "/role/testuser");
    }

    public testOwner(): Observable<any>{
        return this.http.get(environment.baseUrlUserService + "/role/testowner");
    }

    public getUser(username?: string) {
        //console.log("Username je:" + username + ". Nabavljam user-a");
        this.user = this.http.get<UserModel>(`${environment.baseUrlUserService}/username/${username}`, {headers: this.reqHeader});
        //console.log("Nabavio user-a: " + this.user);
        
        return this.user;
    }

    public linkAccount(username: string, password: string): Observable<any>{
        return this.http.put(environment.baseUrlUserMicroservice + "/link", {username, password}, {responseType: 'text'})
    }

    public setKey(userId: string, keyValue: string): Observable<any>{
        return this.http.put(environment.baseUrlUserService + "/key", {userId, keyValue})
    }

}