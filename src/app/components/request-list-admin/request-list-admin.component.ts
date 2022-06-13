import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RequestModel } from 'src/app/model/request';
import { RequestService } from 'src/app/service/request.service';

@Component({
  selector: 'app-request-list-admin',
  templateUrl: './request-list-admin.component.html',
  styleUrls: ['./request-list-admin.component.scss']
})
export class RequestListAdminComponent implements OnInit {

  requests: RequestModel[] | undefined;
  subs: Subscription[] = [];
  
  constructor(private requestService: RequestService, private router: Router) { }

  ngOnInit(): void {

    this.getAllRequests();

  }

  getAllRequests() {
    this.subs.push(this.requestService.getAllRequests().subscribe((response: RequestModel[]) => {
      this.requests = response;
      //console.log(this.requests)
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    }));
  } 

  accept(request: RequestModel) {
    console.log("Approved");
    this.subs.push(this.requestService.updateRequest(true, request.id).subscribe());
    window.location.reload();
  }

  decline(request: RequestModel) {
    console.log("Denied");
    this.subs.push(this.requestService.updateRequest(false, request.id).subscribe());
    window.location.reload();
  }

}
