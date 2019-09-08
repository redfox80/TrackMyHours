import { Injectable } from "@angular/core";
import { LocalStoreService } from "./local-store.service";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { delay } from "rxjs/operators";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../../environments/environment";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  //Only for demo purpose
  authenticated = false;

  constructor(
    private store: LocalStoreService,
    private router: Router,
    private http: HttpClient,
    private cookie: CookieService,
  ) {
    this.checkAuth();
  }

  checkAuth() {
    // this.authenticated = this.store.getItem("demo_login_status");
    if(this.cookie.check('token')) {
      this.store.setItem('token', this.cookie.get('token'));
      this.authenticated = true;
    }
  }

  getuser() {
    return of({});
  }

  signin(credentials) {

    let req = this.http.post(environment.apiEndpoint + 'auth/login', credentials);

    req.subscribe(
      (res) => {
        this.cookie.set('token', res['access_token'], 0, '*');
        this.store.setItem('token', res['access_token']);
        this.store.setItem('test', 'This is a test');
        this.authenticated = true;
      },
      err => console.log(err)
    );

    return req;
  }
  signout() {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.store.getItem('token'),
      }),
    };

    this.authenticated = false;
    this.cookie.delete('token');
    this.store.setItem('token', null);
    this.http.get(environment.apiEndpoint + 'auth/logout', httpOptions)
      .subscribe(
        res => console.log(res),
        err => console.log(err),
      );
    this.router.navigateByUrl("/sessions/signin");
  }

  register(name, email, password, c_password) {
    const credentials = {
      name: name,
      email: email,
      password: password,
      password_confirmation: c_password,
    };

    let req = this.http.post(environment.apiEndpoint + 'auth/register', credentials);

    req.subscribe(
      res => {},
      err => console.log(err)
    );

    return req;
  }
}
