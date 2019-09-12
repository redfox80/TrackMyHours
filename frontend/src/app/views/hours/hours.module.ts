import { NgModule, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HoursRoutingModule} from "./houres-routing.module";
import { AddHoursComponent } from './add-hours/add-hours.component';
import {ReactiveFormsModule} from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ViewHoursComponent, NgbdModalContent } from './view-hours/view-hours.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AddHoursComponent,
    ViewHoursComponent,
    NgbdModalContent,
  ],
  imports: [
    CommonModule,
    HoursRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    NgxDatatableModule,
    NgxPaginationModule,
  ],
  entryComponents: [
    NgbdModalContent,
  ],
  providers: [
    ViewHoursComponent,
  ]
})
export class HoursModule { }
