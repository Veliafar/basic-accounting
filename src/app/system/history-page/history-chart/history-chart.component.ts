import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.less']
})
export class HistoryChartComponent {

  @Input() data;
  @Input() dataIncome;

  constructor() {
  }
}
