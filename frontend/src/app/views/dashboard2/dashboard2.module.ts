import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainDashboardComponent } from './main-dashboard/main-dashboard.component';
import { Dashboard2RoutingModule } from './dashboard2-routing.module';

@NgModule({
  declarations: [MainDashboardComponent],
  imports: [
    CommonModule,
    Dashboard2RoutingModule,
  ]
})
export class Dashboard2Module { }
