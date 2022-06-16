import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  qrcodeimage: string = ""
  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {

    this.authService.enable2fa(this.authService.loggedUser?.userId).subscribe(
      {
        next: (qrcode: string) => {console.log(qrcode), this.qrcodeimage = qrcode}
      }
    )
  }

}
