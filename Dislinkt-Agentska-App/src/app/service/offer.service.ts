import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OfferModel } from "../model/offer";

@Injectable({
    providedIn: 'root'
  })


export class OfferService {

  private offerUrl = 'http://localhost:8020/offer'

  constructor(private http: HttpClient) { }

  public getAllOffers(): Observable<any> {
    return this.http.get(environment.baseUrlOfferService);
  }

  public getSearchedOffers(search: string) : Observable<any>{
    return this.http.get<OfferModel[]>(environment.baseUrlOfferService + "/search/" + search);
}

  public getAllOffersByCompany(idCompany?: string): Observable<any> {
    return this.http.get(`${environment.baseUrlOfferService}/${idCompany}`);
  }

  public getAllOffersByUser(idUser?: string): Observable<any> {
    return this.http.get(`${environment.baseUrlOfferService}/user/${idUser}`);
  }

  public addOffer(offer?: OfferModel, id?: string): Observable<any>{
    return this.http.post(`${this.offerUrl}/${id}`, offer);
  }

  public getOffer(companyId: string, offerId: string) {
    return this.http.get<OfferModel>(`${this.offerUrl}/${companyId}/${offerId}`);
  }

  public editOffer(offer: OfferModel, companyId: string){
    return this.http.put(`${this.offerUrl}/${companyId}`, offer);
  }

  public setSharedFlag(companyId: string, offerId: string): Observable<Boolean>{
    return this.http.put<Boolean>(`${this.offerUrl}/sharing/${companyId}/${offerId}`, null);
  }
    
}