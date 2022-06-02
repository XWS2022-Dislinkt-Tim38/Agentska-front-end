import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestModel } from '../model/request';
import { AuthenticationService } from './authentication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requestUrl = 'http://localhost:8020/request';

  constructor(private http: HttpClient, private auth: AuthenticationService, private userService: UserService){
        
  }

  public createRequest(request: RequestModel): Observable<any>{
      return this.http.post(this.requestUrl, request);
  }

  public getAllRequests() {
    return this.http.get<RequestModel[]>(this.requestUrl);
  }

  public getRequest(id: string) {
      return this.http.get<RequestModel>(`${this.requestUrl}/${id}`);
  }

  public updateRequest(request: RequestModel){
      return this.http.put(this.requestUrl, request);
  }
}
