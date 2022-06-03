import { HttpClient, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subscription } from "rxjs";
import { environment } from "src/environments/environment";
import { UserModel } from "src/app/model/user";
import { AuthenticationService } from "./authentication.service";
import { async } from "@angular/core/testing";
import { UserTokenModel } from "../model/userToken";

@Injectable({
    providedIn: 'root'
  })

export class UserService {
    private token = this.auth.token;
    private reqHeader = new HttpHeaders().set('Authorization', 'Bearer' + this.token);
    user: Observable<UserModel> = new Observable<UserModel>();
    userToken: UserTokenModel | undefined;
    currentUser: UserModel = new UserModel();
    subs: Subscription[] = [];

    constructor(private http: HttpClient, private auth: AuthenticationService) { }
    
    public loadUser(): UserModel | undefined{
        if (!this.token) {
          return;
        }
        this.userToken = JSON.parse(atob(this.token.split('.')[1])) as UserTokenModel;
        var username = this.userToken.sub;
        this.subs.push(this.getUser(username).subscribe((response: UserModel) => {
          this.currentUser = response;
        }));
    
        return this.currentUser;
    }

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

}