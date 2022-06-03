import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OfferModel } from "../model/offer";

@Injectable({
    providedIn: 'root'
  })


export class OfferService {

    constructor(private http: HttpClient) { }

    public getAllOffers(): Observable<any> {
        return this.http.get(environment.baseUrlOfferService);
      }


    
}