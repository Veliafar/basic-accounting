import { Component, OnInit, Input } from '@angular/core';
import { MoneyOperationEvent } from '../../shared/models/money-operation-event.model';
import { MoneyOperationType } from './../../shared/models/enums/money-operation-type.enum';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.less']
})
export class HistoryEventsComponent implements OnInit {

  _enums = {
    MoneyOperationType
  }

  @Input() moneyEvents: MoneyOperationEvent[] = [];
  @Input() categories: Category[] = [];

  constructor() { }

  ngOnInit() {

    this.moneyEvents.forEach( (event: MoneyOperationEvent) => {
      event.catName = this.categories.find( (cat: Category) => cat.id === event.category ).name;
    })
  }

  getEventClass(event: MoneyOperationEvent) {
    return {
      'label': true,
      'label-danger': event.type === MoneyOperationType.outcome,
      'label-success': event.type === MoneyOperationType.income
    }
  }

}
