import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // isAuthStatus: any;
  isAuthenticated: boolean = false;
  userName: String = "";
  userId: String = "";
  private authStatusSubscription!: Subscription;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log("****** this.isAuthenticated 1 ", this.isAuthenticated, this.userName);

    console.log("****** isAuth ", this.authService.getIsAuth());



    // this.isAuthStatus = this.authService.getIsAuth();
    // this.isAuthenticated = this.isAuthStatus.isAuth;
    // this.userName = this.isAuthStatus.userName;
    this.userId = this.authService.getIsAuth().id;
    this.userName = this.authService.getIsAuth().userName;
    this.isAuthenticated = !!this.userName;

    console.log("****** this.isAuthenticated 2 ", this.isAuthenticated, this.userName);



    // this.authStatusSubscription = this.authService
    //   .getAuthStatusListener()
    //   .subscribe(data => {
    //     console.log("****** this.isAuthenticated 3 ", data.isAuth, this.userName)
    //     this.isAuthenticated = data.isAuth;
    //     this.userName = data.userName;
    //   });

    this.authStatusSubscription = this.authService
      .getAuthStatusListener()
      .subscribe(userData => {
        console.log("****** getUserName ", userData.userName, this.isAuthenticated);
        this.isAuthenticated = !!userData.userName;
        this.userName = userData.userName;
        this.userId = userData.id;
        console.log("****** getUserName ", userData.userName, this.isAuthenticated);
      });
  }

  logout() {
    console.log("****** logging out")
    this.authService.clearAuthData();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() {
    this.authStatusSubscription.unsubscribe();
  }

}
