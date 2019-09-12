import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStoreService } from "./local-store.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  constructor(
    private ls: LocalStoreService,
    private http: HttpClient,
  ) { }

  getHours(force=false) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.ls.getItem('token'),
      }),
    };

    let req =  this.http.get(environment.apiEndpoint + 'hours', httpOptions);

    req.subscribe(
      res => {
        this.ls.setItem('hours', res);
      }
    );

    return req;
  }

  addHours(input) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.ls.getItem('token'),
      }),
    };

    return this.http.post(environment.apiEndpoint + 'hours', input, httpOptions);
  }

  updateHours(input) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.ls.getItem('token'),
      }),
    };

    return this.http.patch(environment.apiEndpoint + 'hours', input, httpOptions);
  }

  deleteHours(input) {
    const httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.ls.getItem('token'),
      }),
    };

    return this.http.delete(environment.apiEndpoint + 'hours/' + input['id'], httpOptions);
  }
}
