import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  role: string = this.authService.loggedUser?.role
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    console.log("role: " + this.role)
  }

  dosomething():void {
    console.log("???")
  }

}
