import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, Subscription, tap } from 'rxjs';
import { User } from 'src/app/services/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: any;
  filtersearch: any = '';
  errorMessage: string = '';
  // users$!: Observable<any>;
  userSubscription!: Subscription;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.authService
      .getUsers()
      .subscribe(
        (userData: any) =>
          (this.users = userData.filter((user: User) => user.role == '0')),
          error => {
            this.errorMessage = error.error.message;
          }
      );

    // The below code triggers the API twice
    // this.users$ = this.authService.getUsers().pipe(
    //   map((users: any) => {
    //     console.log('****** users any ', users);
    //     return users.filter((user: User) => user.role == '0');
    //   })
    // );
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
