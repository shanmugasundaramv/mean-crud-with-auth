import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  errorMessage: string = "";

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    // Logging out the User if he/she enters login URL manually after logged-in
    this.authService.clearAuthData();    
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{5,}$')]],
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      contactNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],      
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\.\-_$*#@!+]{8,33}$')]],
      address: ['', [Validators.required]],
      role: ['', [Validators.required]]
  });
}

get registerFormFn(): any { return this.registerForm.controls; }


onSubmit() {
  console.log(this.registerForm.value);
  this.authService.register(this.registerForm.value).subscribe(data =>
    {    
      console.log('****** create ', data);
      this.gotoLogin();
    },
    error => {
      console.log("error ", error);
      this.errorMessage = error.error.message
    });
}

gotoLogin() {
  this.router.navigate(['/login']);
}

}
