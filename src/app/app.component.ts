import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'Simple MEAN Stack Application';
  loading$ = this.loader.loading$;
  constructor(private authService: AuthService, private loader: LoadingService) {}

  ngOnInit() {
    this.authService.autoAuthentication();
  }
}
