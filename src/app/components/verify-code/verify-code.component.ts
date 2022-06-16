import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.scss']
})
export class VerifyCodeComponent implements OnInit {

  code: string = ""
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  verify(): void{

    this.authService.verifyCode(this.code).subscribe(
      {
        next: () => {alert("Successfully logged in")},
        error: () => {alert("Wrong code!")}
      }
    )
  }
}
