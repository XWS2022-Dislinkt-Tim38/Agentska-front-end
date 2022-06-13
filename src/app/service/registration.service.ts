import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })


export class RegistrationService {

    constructor(private http: HttpClient) { }

   public addUser(obj: any): Observable<any>{
        return this.http.post(environment.baseUrlUserService, obj);
    }


    
}