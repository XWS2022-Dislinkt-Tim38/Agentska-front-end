import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  
  constructor(public authService: AuthenticationService) { }

  username?: string = this.authService.loggedUser?.sub;
  userId?: string = this.authService.loggedUser?.userId;

  ngOnInit(): void {
   
  }

}
