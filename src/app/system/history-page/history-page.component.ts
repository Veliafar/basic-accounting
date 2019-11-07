import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { MoneyEventsService } from '../shared/services/money-events.service';
import { Observable, Subject } from 'rxjs';
import { Category } from '../shared/models/category.model';
import { MoneyOperationEvent } from '../shared/models/money-operation-event.model';
import { takeUntil } from 'rxjs/operators';

import { MoneyOperationType } from './../shared/models/enums/money-operation-type.enum';

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

  chartData = [];

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

      this.calculateChartData();

      this.isLoaded = true;
    })
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach( (category: Category) => {
      const categoryEvent = this.moneyEvents.filter( (moneyEvent: MoneyOperationEvent) => moneyEvent.category === category.id && moneyEvent.type === MoneyOperationType.outcome);

      this.chartData.push({
        name: category.name,
        value: categoryEvent.reduce( (total, el) => {
          return total += el.amount;
        }, 0 )
      });
    })
  }

  private toggleFilterVisibility(direction: boolean) {
    this.isFilterVisible = direction;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {

    console.log(filterData);
    
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
