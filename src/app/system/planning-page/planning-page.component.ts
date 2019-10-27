import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { MoneyEventsService } from '../shared/services/money-events.service';
import { Observable, Subject } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { MoneyOperationEvent } from '../shared/models/money-operation-event.model';
import { Category } from './../shared/models/category.model';
import { takeUntil } from 'rxjs/operators';
import { MoneyOperationType } from '../shared/models/enums/money-operation-type.enum';


@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.less']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  isLoaded: boolean = false;
  bill: Bill;
  categoryArray: Category[] = [];
  moneyEvents: MoneyOperationEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryService: CategoriesService,
    private moneyEventsService: MoneyEventsService
  ) { }

  ngOnInit() {

    Observable
      .combineLatest(
        this.billService.getBill(),
        this.categoryService.getCategories(),
        this.moneyEventsService.getEvents()              
      )
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(
        ( (data: [Bill, Category[], MoneyOperationEvent[]]) => {
          this.bill = data[0];
          this.categoryArray = data[1];
          this.moneyEvents = data[2];

          this.isLoaded = true;
          
        })
      )
  }

  getCategorySpent(category: Category): number {
    const categoryEvents: MoneyOperationEvent[] = this.moneyEvents.filter((event: MoneyOperationEvent) => {
      return event.category === category.id && event.type === MoneyOperationType.outcome;
    });

    return categoryEvents.reduce((total, event) => {
      return total += event.amount;
    }, 0);
  }

  private getPercent(category: Category): number {
    const percent = (100 * this.getCategorySpent(category) / category.capacity );
    return percent > 100 ? 100 : percent;
  }

  getCategoryPercent(category: Category): string {
    return this.getPercent(category) + '%';
  }

  getCategoryColorClass(category: Category): string {
    const percent = this.getPercent(category);
    return percent < 60 ? 'success'
      : percent >= 100 ? 'danger'
      : 'warning';
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
