import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
export interface ReturnUserData {
  id?: string;
  role?: string;
  userName?: string;
  token?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  errorMessage: string = "";
  getUserData : ReturnUserData = {};

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    // Logging out the User if he/she enters login URL manually after logged-in
    this.authService.clearAuthData();
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]{5,}$')]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9\.\-_$*#@!+]{8,33}$')]]
  });
}

get loginFormFn(): any { return this.loginForm.controls; }

  onSubmit() {
    console.log(this.loginForm.value);
    // this.authService.login(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(data =>
      {    
        this.getUserData = { ...data };
        console.log(" this.getUserData 123 data ", this.getUserData)
        // console.log('****** login dataa ', data.id);
        this.authService.saveAuthData(data);
        if(this.getUserData.role === "1") {
          this.gotoUserList();
        } else {
          this.gotoDashboard(); 
        }   
      },
      error => {
        console.log("error ", error);
        this.errorMessage = error.error.message
      });
  }

  gotoDashboard() {
    this.router.navigate(['/dashboard']);
  }

  gotoUserList() {
    this.router.navigate(['/users']);
  }
}
