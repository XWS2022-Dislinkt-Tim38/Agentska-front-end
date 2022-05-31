import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })

export class UserService {

    constructor(private http: HttpClient) { }

    public testAdmin(): Observable<any>{
        return this.http.get(environment.baseUrlUserService + "/role/testadmin");
    }

    public testUser(): Observable<any>{
        return this.http.get(environment.baseUrlUserService + "/role/testuser");
    }

    public testOwner(): Observable<any>{
        return this.http.get(environment.baseUrlUserService + "/role/testowner");
    }

}