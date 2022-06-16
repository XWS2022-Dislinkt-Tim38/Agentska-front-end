import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  qrcodeimage: string = ""
  code: string = ""

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {

    this.authService.getQRCode(this.authService.loggedUser?.userId).subscribe(
      {
        next: (qrcode: string) => {console.log(qrcode), this.qrcodeimage = qrcode}
      }
    )
   
  }

  cancel(): void {
    this.router.navigate(['/'])
  }

  confirm(): void {
     this.authService.verifyCode(this.code).subscribe({
      next: () => {
        this.authService.enable2fa(this.authService.loggedUser?.userId).subscribe(
          {
            next: () => 
            {
              alert("Successfully enabled 2FA")
              this.authService.logout()
            },
            error: () => {alert("Invalid code!")}
          }
        )
      }
     })
  }

}
