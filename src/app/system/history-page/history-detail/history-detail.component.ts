import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MoneyEventsService } from '../../shared/services/money-events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { MoneyOperationEvent } from '../../shared/models/money-operation-event.model';
import { Category } from '../../shared/models/category.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MoneyOperationType } from '../../shared/models/enums/money-operation-type.enum';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.less']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  event: MoneyOperationEvent;
  category: Category;
  isLoaded: boolean = false;

  _enums = {
    MoneyOperationType
  } 

  constructor(
    private route: ActivatedRoute,
    private moneyEventService: MoneyEventsService,
    private categoryService: CategoriesService
  ) { }

  ngOnInit() {
    this.route.params
      .mergeMap((params: Params) => this.moneyEventService.getEventById(params.id))
      .mergeMap((event: MoneyOperationEvent) => {
        this.event = event;
        return this.categoryService.getCategoryById(event.category);
      })
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
