import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, map, Observable, tap } from "rxjs";
import { environment } from 'src/environments/environment';
import { Router, ActivatedRoute } from "@angular/router";
import { UserTokenModel } from "../model/userToken";


@Injectable({
    providedIn: 'root'
  })

  

export class AuthenticationService {

  endpoint: string = 'http://localhost:8020/';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  username: string = '';
  

  
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
  isLoggedIn$ = this._isLoggedIn$.asObservable()
  private _isOwner$ = new BehaviorSubject<boolean>(false)
  isOwner = this._isOwner$.asObservable()
  loggedUser: UserTokenModel | null;

  get token(): any {
    return localStorage.getItem('regUserToken');
  }

  constructor(private http: HttpClient, private router: Router,  private activeRoute: ActivatedRoute) { 

    this._isLoggedIn$.next(!!this.token)
    this.loggedUser = this.getUser(this.token)
    this._isOwner$.next(this.loggedUser?.role.includes('OWNER'))
    
  }

  public login(obj: any): Observable<any>{
      this.router.navigate(['/'])
      return this.http.post(environment.baseUrlAuthService + "/login", obj).pipe(
        tap((response: any) => {
                         
          this.storeToken(response.accessToken)
          this.loggedUser = this.getUser(response.accessToken) 
          //console.log("ROLE: " + this.loggedUser?.role);
        })   
                                      
      )
        
  }

  private getUser(token: string): UserTokenModel | null {
    if (!token) {
      return null
    }
    return JSON.parse(atob(this.token.split('.')[1])) as UserTokenModel;
  }

  public storeToken(accessToken: any) {
    this._isLoggedIn$.next(true)
    localStorage.setItem("regUserToken", accessToken)
  }

  public logout() {
    //this.router.navigate(['/login'])
    window.location.href="http://localhost:4200/login"
    localStorage.removeItem("regUserToken")
  }

  public passwordlessLoginSendEmail(email: string): Observable<any>{
    return this.http.post(environment.baseUrlUserService + "/passwordless", email)
    
  }

  public passwordlessLogin(token: string): Observable<any>{
    this.router.navigate(['/'])
    return this.http.post(environment.baseUrlAuthService + "/passwordlesslogin", token).pipe(
      tap((response: any) => {
                     
        this.storeToken(response.accessToken)
        this.loggedUser = this.getUser(response.accessToken)               
        
        console.log(this.loggedUser)
      })                            
    )
  }
    

}