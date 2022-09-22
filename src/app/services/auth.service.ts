import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './auth';

export interface AuthData {
  id: string;
  role: string
  userName: string;
  token: string
}

// export interface ReturnUserData {
//   id: string;
//   userName: string;
//   token: string;
// }

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private baseUrl = 'http://localhost:8080/api/users';
  // private isAuthenticated: boolean = false;
  // private userName: string = "";
  // private token: string = "";
  private userData: AuthData = {id: "", role: "", userName: "", token:""};
  private authStatusListener = new Subject<AuthData>();
  // private authStatusListener = new BehaviorSubject<AuthData>(null)
  // private authStatusListener = new Subject<string>();
  constructor(private http: HttpClient) { }

  register(user: User): Observable<object> {
    console.log('****** user ', user);
    return this.http.post(this.baseUrl+'/register', user);
  }

  login(user: User): Observable<object> {
    console.log('****** user 123 ', user);
    return this.http.post(this.baseUrl+'/login', user);
  }

  // getUsers(): Observable<object> {
  //   return this.http.get(this.baseUrl);
  // }

  getUsers(): Observable<object> {
    return this.http.get<{message: string, users: any}>(this.baseUrl).pipe(map(responseData => responseData.users))
  }

  // login(user: User) {
  //   console.log('****** user ', user);
  //   this.http.post(this.baseUrl+'/login', user).subscribe(authData => {
  //     console.log("****** authData ", authData);
  //     this.saveAuthData(authData);
  //   },
  //   error => {
  //     console.log("error ", error);
  //     return error.error.message
  //   })
  // }

  // getToken() {
  //   return this.token;
  // }

  getIsAuth(): AuthData {
    return this.userData;
  }

  // getIsAuth(): string {
  //   return this.userName;
  // }  

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  saveAuthData(data: any) {
    console.log("****** save auth data ", data)
      // this.isAuthenticated = true;
      // this.userName = data.userName;
      this.userData = data;
      this.authStatusListener.next(data);
      // this.authStatusListener.next(data.userName);
      sessionStorage.setItem("userData", JSON.stringify(data));
      // sessionStorage.setItem("token", data.token);
      // sessionStorage.setItem("username", data.userName);
  }

  getAuthData() {
    const tokenValue = sessionStorage.getItem("userData") || '';
    if(tokenValue) {
      const tokenData = JSON.parse(tokenValue);
      return tokenData
    }
    // console.log("****** ", JSON.parse(tokenData));
    // const token = sessionStorage.getItem("token");
    // const userName = sessionStorage.getItem("username");
    // if (!token || !userName) {
    //   return;
    // } 
    // return { token, userName }
    // const test = sessionStorage.getItem("userData")
    // const userData: {
    //   id: string;
    //   token: string;
    //   userName: string;
    // } = JSON.parse(sessionStorage.getItem("userData"));
  }

  clearAuthData() {
    // this.isAuthenticated = false;
    // this.userName = "";
    this.userData = {id: "", role: "", userName: "", token:""};
    this.authStatusListener.next({id: "", role: "", userName: "", token:""});
    // this.authStatusListener.next("");
    sessionStorage.removeItem("userData");
    // sessionStorage.removeItem("token");
    // sessionStorage.removeItem("username");
  }

  autoAuthentication() {
    const authData = this.getAuthData();
    if (!authData) {
      return;
    }
      // this.token = authInformation.token;
      // this.isAuthenticated = true;
      // this.userName = authInformation.userName;
      this.userData = authData;
      this.authStatusListener.next(authData);
      // this.authStatusListener.next(authInformation.userName);
  }
}
