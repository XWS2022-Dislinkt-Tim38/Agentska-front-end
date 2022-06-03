import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from '../model/comment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private commentUrl: string = 'http://localhost:8020/comment';

  constructor(private http: HttpClient, private auth: AuthenticationService){
        
  }

  public addComment(comment: CommentModel, id?: string): Observable<any>{
      return this.http.post(`${this.commentUrl}/companycomment/${id}`, comment);
  }

  public getAllCompanyComments(id: string) {
      return this.http.get<CommentModel[]>(`${this.commentUrl}/companycomment/${id}`);
  }
}
