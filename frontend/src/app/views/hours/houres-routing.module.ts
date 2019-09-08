import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddHoursComponent } from "./add-hours/add-hours.component";
import {ViewHoursComponent} from "./view-hours/view-hours.component";

const routes: Routes = [
  {
    path: 'view',
    component: ViewHoursComponent,
  },
  {
    path: 'add',
    component: AddHoursComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HoursRoutingModule { }
