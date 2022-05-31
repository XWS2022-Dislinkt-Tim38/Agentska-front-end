import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { environment } from 'src/environments/environment';
import {Router, ActivatedRoute } from "@angular/router";
import { UserModel } from "../model/user";


@Injectable({
    providedIn: 'root'
  })

  

export class AuthenticationService {

    loggedUser: UserModel | null
    private _isLoggedIn$ = new BehaviorSubject<boolean>(false)
    isLoggedIn$ = this._isLoggedIn$.asObservable()

    get token(): any {
      return localStorage.getItem('regUserToken');
    }

    constructor(private http: HttpClient, private router: Router,  private activeRoute: ActivatedRoute) { 

      this._isLoggedIn$.next(!!this.token)
      this.loggedUser = this.getUser(this.token)
    
    }

    
   public login(obj: any): Observable<any>{
        this.router.navigate(['/'])
        return this.http.post(environment.baseUrlAuthService + "/login", obj).pipe(
          tap((response: any) => {
                         
            this.storeToken(response.accessToken)
            this.loggedUser = this.getUser(response.accessToken)               
            
            console.log(this.loggedUser)
          
          })   
                                      
        )
        
    }

    private getUser(token: string): UserModel | null {
      if (!token) {
        return null
      }
      return JSON.parse(atob(token.split('.')[1])) as UserModel;
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

    reloadCurrentPage(){
      let currentUrl = this.router.url;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
      });
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