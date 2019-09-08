import { Component, OnInit } from '@angular/core';
import { HoursService } from "../../../shared/services/hours.service";
import {LocalStoreService} from "../../../shared/services/local-store.service";
import { ToastrService } from "ngx-toastr";

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
    private ts: ToastrService,
  ) { }

  ngOnInit() {
    if(this.ls.getItem('hours')) {
      this.hours = this.ls.getItem('hours');
    }

    this.hs.getHours()
      .subscribe(
        res => {
          this.ts.success('Hours registered');
          this.hours = res;
        },
        err => console.log(err)
      );
  }

}
