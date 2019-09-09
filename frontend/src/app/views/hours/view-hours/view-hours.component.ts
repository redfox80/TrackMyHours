import { Component, OnInit } from '@angular/core';
import { HoursService } from "../../../shared/services/hours.service";
import {LocalStoreService} from "../../../shared/services/local-store.service";

@Component({
  selector: 'app-view-hours',
  templateUrl: './view-hours.component.html',
  styleUrls: ['./view-hours.component.scss']
})
export class ViewHoursComponent implements OnInit {
  hours;

  constructor(
    private hs: HoursService,
    private ls: LocalStoreService,
  ) { }

  ngOnInit() {
    if(this.ls.getItem('hours')) {
      this.hours = this.ls.getItem('hours');
    }

    this.hs.getHours()
      .subscribe(
        res => {
          this.hours = res;
        },
        err => console.log(err)
      );
  }

  test(e) {
    if(e['type'] == 'click') console.log('So you want to edit hour with id ' + e['row']['id'] + ' i see. too bad it don\'t work yet!');
  }

}
