import { Component, NgModule, OnInit } from '@angular/core';
import {Form, FormBuilder, Validators} from "@angular/forms";
import { HoursService } from "../../../shared/services/hours.service";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-hours',
  templateUrl: './add-hours.component.html',
  styleUrls: ['./add-hours.component.scss']
})
export class AddHoursComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private hs: HoursService,
    private ts: ToastrService,
  ) { }

  hoursAddForm = this.fb.group({
    date: ['', Validators.compose([
      Validators.required,
    ])],
    hours: ['', Validators.compose([
      Validators.required,
    ])],
  });

  date = this.hoursAddForm.get('date');
  hours = this.hoursAddForm.get('hours');

  submit() {
    if(this.hoursAddForm.invalid) {
      console.log('Noe');
      return;
    }
    console.log(this.date.value);

    const input = {
      date: this.date.value,
      hours: this.hours.value,
    };

    this.hs.addHours(input)
      .subscribe(
        res => {
          this.ts.success('Hours registered');
          console.log(res);
        },
        err => console.log(err),
      );
  }

  ngOnInit() {
  }

}
