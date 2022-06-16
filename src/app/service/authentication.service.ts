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
  private _isUser = new BehaviorSubject<boolean>(false)
  isUser = this._isUser.asObservable()
  loggedUser: UserTokenModel | null;

  inputUsername: string = ""
  inputPassword: string = ""

  get token(): any {
    return localStorage.getItem('regUserToken');
  }

  constructor(private http: HttpClient, private router: Router) { 

    this._isLoggedIn$.next(!!this.token)
    this.loggedUser = this.getUser(this.token)
    this._isOwner$.next(this.loggedUser?.role.includes('COMPANY_OWNER'))
    this._isUser.next(this.loggedUser?.role.includes('USER'))
    
  }

  public login(obj: any): Observable<any>{   
       
      return this.http.post(environment.baseUrlAuthService + "/login", obj).pipe(
        tap((response: any) => {
          if(response == null){
              
            this.inputUsername = obj.username,
            this.inputPassword = obj.password     
            this.router.navigate(['/verifyCode'])
          } else {
            this.inputUsername = obj.username,
            this.inputPassword = obj.password 
            this.storeToken(response.accessToken)
            this.loggedUser = this.getUser(response.accessToken) 
            this.router.navigate(['/'])  
            window.location.href= environment.baserUrlWebsite   
            
          }        
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
    window.location.href= environment.baserUrlWebsite + "/login"
    localStorage.removeItem("regUserToken")
  }

  public getQRCode(userId: string): Observable<any>{
    return this.http.put(environment.baseUrlAuthService + "/generateQRCode/" + userId, null, {responseType: 'text' })
  }

  public enable2fa(userId: string): Observable<any>{
    return this.http.put(environment.baseUrlAuthService + "/enable2fa/" + userId, null)
  }

  public login2fa(code: string): Observable<any>{
    var request = {
      username: this.inputUsername,
      password: this.inputPassword,
      mfaCode: code
    }
    console.log("REQUEST:")
    console.log(request)
    return this.http.post(environment.baseUrlAuthService + "/login/2fa", request).pipe(
      tap((response: any) => {
          this.storeToken(response.accessToken)
          this.loggedUser = this.getUser(response.accessToken)  
          this.router.navigate(['/'])  
          window.location.href= environment.baserUrlWebsite          
      })                                   
    )
  }

  public verifyCode(code: string, password: string): Observable<any>{
    var request = {
      username: this.loggedUser?.sub,
      password: password,
      mfaCode: code
    }
    console.log(request)
    return this.http.post(environment.baseUrlAuthService + "/verify2fa", request)                                              
  }

}