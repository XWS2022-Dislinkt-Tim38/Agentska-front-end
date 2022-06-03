import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-link-account',
  templateUrl: './link-account.component.html',
  styleUrls: ['./link-account.component.scss']
})
export class LinkAccountComponent implements OnInit {

  role: string = this.authService.loggedUser?.role
  userId: string = this.authService.loggedUser?.userId
  username: string = ""
  password: string = ""
  
  constructor(private authService: AuthenticationService, private userService: UserService) { }

  ngOnInit(): void {
  }

  linkAccount(): void{
    this.userService.linkAccount(this.username, this.password).subscribe((key: string) => {
      console.log(key)
      if(key === "")
        alert("Credentials are incorrect. Unable to connect accounts!")
      
      this.userService.setKey(this.userId, key).subscribe((updatedUser: UserModel) => {
        alert("Successfully linked accounts!")
        console.log(updatedUser)
      })
    })
  }

}
