import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentModel } from '../model/comment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private auth: AuthenticationService){
        
  }

  public addComment(comment: CommentModel, id?: string): Observable<any>{
      return this.http.post(`${environment.baseCommentService}/companycomment/${id}`, comment);
  }

  public getAllCompanyComments(id: string) {
      return this.http.get<CommentModel[]>(`${environment.baseCommentService}/companycomment/${id}`);
  }
}
