import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CategoriesService } from '../shared/services/categories.service';
import { MoneyEventsService } from '../shared/services/money-events.service';
import { Category } from '../shared/models/category.model';
import { MoneyOperationEvent } from '../shared/models/money-operation-event.model';
import { MoneyOperationType } from './../shared/models/enums/money-operation-type.enum';

import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.less']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  isLoaded: boolean = false;

  categories: Category[] = [];
  moneyEvents: MoneyOperationEvent[] = [];

  filteredEvents: MoneyOperationEvent[] = [];

  chartData = [];
  chartDataIncome = [];

  isFilterVisible: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private moneyEventsService: MoneyEventsService
  ) { }

  ngOnInit() {
    Observable.combineLatest(
      [this.categoriesService.getCategories(),
      this.moneyEventsService.getEvents()]
    )
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((data: [Category[], MoneyOperationEvent[]]) => {
        this.categories = data[0];
        this.moneyEvents = data[1];


        this.setOriginalEvents();
        this.calculateChartData();

        this.isLoaded = true;
      })
  }

  private setOriginalEvents() {
    this.filteredEvents = this.moneyEvents.slice();
  }

  calculateChartData(): void {
    this.chartData = [];
    this.chartDataIncome = [];

    this.categories.forEach((category: Category) => {
      const categoryEvent = this.filteredEvents.filter((moneyEvent: MoneyOperationEvent) => moneyEvent.category === category.id && moneyEvent.type === MoneyOperationType.outcome);
      const categoryEventIncome = this.filteredEvents.filter((moneyEvent: MoneyOperationEvent) => moneyEvent.category === category.id && moneyEvent.type === MoneyOperationType.income);

      this.pushChartData(this.chartData, category, categoryEvent);
      this.pushChartData(this.chartDataIncome, category, categoryEventIncome);
    })
  }

  private pushChartData(arr, category, categoryEventIncome) {
    arr.push({
      name: category.name,
      value: categoryEventIncome.reduce((total, el) => {
        return total += el.amount;
      }, 0)
    });
  }

  private toggleFilterVisibility(direction: boolean) {
    this.isFilterVisible = direction;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((event: MoneyOperationEvent) => {
        return filterData.types.indexOf(event.type) !== -1;
      })
      .filter((event: MoneyOperationEvent) => {
        return filterData.categories.indexOf(event.category.toString()) !== -1;        
      })
      .filter((event: MoneyOperationEvent) => {
        const momentDate = moment(new Date(event.date).toISOString());
        return momentDate.isBetween(startPeriod, endPeriod);
      })
    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
