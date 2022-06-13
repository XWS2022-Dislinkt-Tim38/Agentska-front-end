import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestModel } from 'src/app/model/request';
import { UserModel } from 'src/app/model/user';
import { RequestService } from 'src/app/service/request.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-request-list-user',
  templateUrl: './request-list-user.component.html',
  styleUrls: ['./request-list-user.component.scss']
})
export class RequestListUserComponent implements OnInit {

  requests: RequestModel[] | undefined;
  currentUser: UserModel = new UserModel();
  user: UserModel = new UserModel();
  username?: string;
  subs: Subscription[] = [];
  
  constructor(private requestService: RequestService, private router: Router, private userService: UserService) { }

  get token(): any {
    return localStorage.getItem('regUserToken');
  }

  public getUsername(token: string): string | undefined{
    if (!token) {
      return '';
    }

    this.user = JSON.parse(atob(this.token.split('.')[1])) as UserModel;
    this.username = this.user.sub;
    this.getUser(this.username);

    return this.username;
  }
  
  getUser(username?: string): void {
    this.subs.push(this.userService.getUser(username).subscribe((response: UserModel) => {
      this.currentUser.id = response.id;
    }));
  }

  ngOnInit(): void {

    this.getAllRequests();
    this.getUsername(this.token);
    console.log(this.currentUser.id)
  }

  getAllRequests() {
    this.subs.push(this.requestService.getAllRequests().subscribe((response: RequestModel[]) => {
      this.requests = response;
      //console.log(this.requests)
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    }));
  } 
}
