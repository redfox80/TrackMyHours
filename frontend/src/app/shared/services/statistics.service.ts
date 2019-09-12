import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LocalStoreService } from './local-store.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(
    private http: HttpClient,
    private ls: LocalStoreService,
  ) { }

  getTotalHours() {
    let httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.ls.getItem('token'),
      }),
    };

    return this.http.get(environment.apiEndpoint + 'statistics/hours/total', httpOptions);
  }

  getPeriodOfHours(input) {
    let httpOptions = {
      headers: new HttpHeaders({
        'authorization': 'Bearer ' + this.ls.getItem('token'),
      }),
    };

    return this.http.post(environment.apiEndpoint + 'statistics/hours/period', input, httpOptions);
  }
}
