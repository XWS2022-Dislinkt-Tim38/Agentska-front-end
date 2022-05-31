import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string = '';
  password: string = '';
  email: string = '';
  isPasswordless: boolean = false;

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9.]{4,9}$')]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')])
  });

  passwordlessLoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
 
  });

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.isPasswordless = false
  }

  onSubmit(): void {
    if(this.loginForm.invalid){
      alert('Invalid input. Try again.');
      return;
    }else{
      console.log('Works');
      var login = {
        username: this.username,
        password: this.password
        
      }
      console.log(login);
      this.authService.login(login).subscribe()
    }
  
  }

  setToPasswordless(): void{
    this.isPasswordless = true
  }

  loginPasswordless(): void{
    this.authService.passwordlessLoginSendEmail(this.email).subscribe(response => {
      if(response) alert('Successfully sent email to the user')
      else alert ("User can not be found")

      window.location.href="http://localhost:4200/login"
    })
  }
}
