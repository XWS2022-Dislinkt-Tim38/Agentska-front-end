import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommentModel } from 'src/app/model/comment';
import { CompanyModel } from 'src/app/model/company';
import { UserModel } from 'src/app/model/user';
import { UserTokenModel } from 'src/app/model/userToken';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { CommentService } from 'src/app/service/comment.service';
import { CompanyService } from 'src/app/service/company.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  idCompany: string = '';
  company: CompanyModel = new CompanyModel();
  subs: Subscription[] = [];
  date?: Date = new Date();
  currentUser: UserModel = new UserModel();
  comment: CommentModel = new CommentModel();
  comments: CommentModel[] = [];

  //form
  flagComment: boolean = false;
  isDisabled: boolean = false;
  title: string = '';
  content: string = '';
  rating: number = 1;
  user?: UserTokenModel;

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private commentService: CommentService, private companyService: CompanyService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {

    if(this.auth.isLoggedIn$){
     this.userService.getUser(this.auth.loggedUser?.sub).subscribe((response: UserModel) => {
        this.currentUser = response;
        console.log(this.currentUser)
      });
    }
    this.idCompany = this.route.snapshot.params['id'];
    this.getCompany();
    this.getAllCompanyComments();

  }

  commentForm = new FormGroup({
    title:  new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    rating: new FormControl(1, Validators.required)
  });

  getCompany() {
    this.subs.push(this.companyService.getCompany(this.idCompany).subscribe((response: CompanyModel) => {
      this.company = response;
      console.log(this.company);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }

  getAllCompanyComments() {
    this.subs.push(this.commentService.getAllCompanyComments(this.idCompany).subscribe((response: CommentModel[]) => {
      this.comments = response;
      
      response.forEach(comment => {
        
        if(comment.idUser === this.currentUser.id){
          this.isDisabled = true;
        }
          
      });
      
      console.log(response);
    }, (error: HttpErrorResponse) => {
      console.log(error);
    }));
  }


  goHome() {
    this.router.navigate(['/company/' + this.company.id]);
  }

  goSalaries() {
    this.router.navigate(['/company/' + this.company.id + '/salaries']);
  }

  goInterview() {
    this.router.navigate(['/company/' + this.company.id + '/interview']);
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

  createComment() {
    if(this.commentForm.valid){
      this.comment.idUser = this.currentUser.id;
      this.comment.username = this.currentUser.username;
      this.comment.title = this.title;
      this.comment.content = this.content;
      this.comment.rating = this.rating;
      this.commentService.addComment(this.comment, this.company.id).subscribe(response => {
        console.log(response);
        alert("Comment sent!")
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
