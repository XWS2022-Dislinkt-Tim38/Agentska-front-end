import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/service/registration.service';

export class User{
  constructor(
    public username: string,
    public email: string,
    public password: string
  ){}
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})


export class RegistrationComponent implements OnInit {

  //hide1 = true;
  //hide2 = true;
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  email: string = '';
  password: string = '';
  phoneNumber: string = '';
  address: string = '';
  confirmPassword: string = '';
  dateOfBirth: string = '';
  role: string = '';

  registerForm = new FormGroup({
    firstname:  new FormControl('', [Validators.required, Validators.pattern('^[A-Z][A-za-z ]{1,15}')]),
    lastname:  new FormControl('', [Validators.required, Validators.pattern('^[A-Z][A-za-z ]{1,15}')]),
    //dateOfBirth: new FormControl('', [Validators.required, Validators.pattern('^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$')]),
    dateOfBirth: new FormControl('', Validators.required),
    phoneNumber:  new FormControl('', [Validators.required, Validators.pattern('[0-9]{6,12}')]),
    address:  new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9 ]{4,20}$')]),
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9.]{4,9}$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z]).{8,}$')]),
    confirmPassword: new FormControl('', Validators.required)
  });
  
  constructor(private registrationService: RegistrationService, private router: Router
  ) { }

  regSuccess:boolean = false;

  ngOnInit(): void {
    this.regSuccess = false;
  }

  
  register(): void {
    
    if (this.registerForm.valid && (this.password === this.confirmPassword)) {
        console.log('Works');

        var registration = {
          username: this.username,
          email: this.email,
          password: this.password,
          firstName: this.firstname,
          lastName: this.lastname,
          phoneNumber: this.phoneNumber,
          address: this.address,
          dateOfBirth: this.dateOfBirth
        }
        console.log(registration);
        this.registrationService.addUser(registration).subscribe(response => {
          this.regSuccess = true;
          alert("Confirmation email sent!")
          this.router.navigate(['/login']);
        });
      
    }else{
      console.log('Failed',this.registerForm.invalid);
      alert('Invalid input. Try again');
      return;
    }
  }


}
