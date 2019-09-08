import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HoursRoutingModule} from "./houres-routing.module";
import { AddHoursComponent } from './add-hours/add-hours.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ViewHoursComponent } from './view-hours/view-hours.component';

@NgModule({
  declarations: [AddHoursComponent, ViewHoursComponent],
  imports: [
    CommonModule,
    HoursRoutingModule,
    ReactiveFormsModule,
    NgbModule
  ]
})
export class HoursModule { }
