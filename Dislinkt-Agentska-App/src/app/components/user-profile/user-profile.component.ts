import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  username?: string = this.authService.loggedUser?.sub
  role: string = this.authService.loggedUser?.role
  user?: UserModel
  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
    console.log("role: " + this.role)
    this.userService.getUser(this.username).subscribe((user: UserModel) => {
    
      this.user = user
      console.log(user)
  })
 
  }

}
