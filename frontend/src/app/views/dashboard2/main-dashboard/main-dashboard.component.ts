import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../../shared/services/statistics.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {
  totalHours: Object;

  constructor(
    private stats: StatisticsService,
  ) { }

  ngOnInit() {
    this.stats.getTotalHours().subscribe(h => this.totalHours = h);
  }

}
