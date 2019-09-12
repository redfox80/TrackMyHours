import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { StatisticsService } from './../../../shared/services/statistics.service';

@Component({
  selector: 'app-period-hours',
  templateUrl: './period-hours.component.html',
  styleUrls: ['./period-hours.component.scss']
})
export class PeriodHoursComponent implements OnInit {
  hours;
  total;

  constructor(
    private fb: FormBuilder,
    private stat: StatisticsService,
  ) { }

  ngOnInit() {
  }

  searchForm = this.fb.group({
    from: ['', Validators.required],
    to: ['', Validators.required],
  });

  searchPeriod() {
    const input = {
      from: this.searchForm.controls['from'].value,
      to: this.searchForm.controls['to'].value,
    }

    this.stat.getPeriodOfHours(input)
      .subscribe(
        res => {
          this.hours = res['hours'];
          this.total = res['total'];
        },
        err => console.log(err),
      );
  }

}
