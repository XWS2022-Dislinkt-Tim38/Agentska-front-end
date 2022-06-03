import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-link-account',
  templateUrl: './link-account.component.html',
  styleUrls: ['./link-account.component.scss']
})
export class LinkAccountComponent implements OnInit {

  role: string = this.authService.loggedUser?.role
  username: string = ""
  password: string = ""
  
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

}
