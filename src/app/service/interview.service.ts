import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CommentModel } from '../model/comment';
import { InterviewModel } from '../model/interview';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  constructor(private http: HttpClient, private auth: AuthenticationService){
        
  }

  public addInterview(comment: CommentModel, companyId?: string, difficulty?: number): Observable<any>{
      return this.http.post(`${environment.baseCommentService}/interviewcomment/${companyId}?difficulty=${difficulty}`, comment);
  }

  public getAllInterviewComments(id: string) {
      return this.http.get<InterviewModel[]>(`${environment.baseCommentService}/interviewcomment/${id}`);
  }

  public getInterview(companyId: string) {
    return this.http.get<InterviewModel>(`${environment.baseCommentService}/interview/${companyId}`);
  }
}
