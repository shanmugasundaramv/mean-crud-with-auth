import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { finalize } from "rxjs";

import { AuthService } from "./auth.service";
import { LoadingService } from "./loading.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private loader: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authData = this.authService.getAuthData();
    console.log("****** authToken ", authData);
    this.loader.show();
    if(authData && authData.token) {
      const authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + authData.token)
      });
      return next.handle(authRequest).pipe(
        finalize(() => this.loader.hide())
      );
    }
    else {
      return next.handle(req).pipe(
        finalize(() => this.loader.hide())
      );
    }
  }
}
