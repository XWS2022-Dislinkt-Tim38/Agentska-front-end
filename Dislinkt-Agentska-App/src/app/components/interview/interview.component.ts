import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentModel } from 'src/app/model/comment';
import { CompanyModel } from 'src/app/model/company';
import { InterviewModel } from 'src/app/model/interview';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CompanyService } from 'src/app/service/company.service';
import { InterviewService } from 'src/app/service/interview.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-interview',
  templateUrl: './interview.component.html',
  styleUrls: ['./interview.component.scss']
})
export class InterviewComponent implements OnInit {

  idCompany: string = '';
  company: CompanyModel = new CompanyModel();
  subs: Subscription[] = [];
  date?: Date = new Date();
  currentUser: UserModel = new UserModel();
  interview: InterviewModel = new InterviewModel();
  comment: CommentModel = new CommentModel();
  comments: Array<CommentModel> = new Array<CommentModel>();

  //form
  flagComment: boolean = false;
  title: string = '';
  content: string = '';
  rating: number = 1;
  difficulty?: number;
  difficulties: number[] = [1, 2, 3];
  ratingCap: number = 1;

  constructor(private interviewService: InterviewService, private userService: UserService, private route: ActivatedRoute, private companyService: CompanyService, private router: Router, private auth: AuthenticationService) { }

  ngOnInit(): void {

    if(this.auth.isLoggedIn$){
      this.userService.getUser(this.auth.loggedUser?.sub).subscribe((response: UserModel) => {
         this.currentUser = response;
       });
     }

    this.idCompany = this.route.snapshot.params['id'];
    this.getCompany();
    this.getAllInterviewComments();
    this.getInterview();
    this.ratingCap = this.interview.rating * 20;

  }

  commentForm = new FormGroup({
    title:  new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    rating: new FormControl(1, Validators.required),
    difficulty: new FormControl(1, Validators.required)
  });

  getCompany() {
    this.subs.push(this.companyService.getCompany(this.idCompany).subscribe((response: CompanyModel) => {
      this.company = response;
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  getInterview() {
    this.subs.push(this.interviewService.getInterview(this.idCompany).subscribe((response: InterviewModel) => {
      this.interview = response;
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }


  getAllInterviewComments() {
    this.subs.push(this.interviewService.getAllInterviewComments(this.idCompany).subscribe((response: CommentModel[]) => {
      this.comments = response;
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  goHome() {
    this.router.navigate(['/company/' + this.company.id]);
  }

  goComments() {
    this.router.navigate(['/company/' + this.company.id + '/comments']);
  }

  goSalaries() {
    this.router.navigate(['/company/' + this.company.id + '/salaries']);
  }

  goOffers() {
    this.router.navigate(['/company/' + this.company.id + '/offers']);
  }

  formatLabel(value: number) {
    return value;
  }

  cancelComment() {
    this.flagComment = false;
  }

  openCommentDialog() {
    this.flagComment = true;
  }

  createInterview() {
    if(this.commentForm.valid){
      this.comment.idUser = this.currentUser.id;
      this.comment.username = this.currentUser.username;
      this.comment.title = this.title;
      this.comment.content = this.content;
      this.comment.rating = this.rating;
      this.interviewService.addInterview(this.comment, this.idCompany, this.difficulty).subscribe(response => {
        console.log(response);
        alert("Interview sent!")
        this.flagComment = false;
        window.location.reload();
      });
    }else{
      console.log('Failed', this.commentForm);
      alert('Invalid input. Try again');
      return;
    }
  }

}
