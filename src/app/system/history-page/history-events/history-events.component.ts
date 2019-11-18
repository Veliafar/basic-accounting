import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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

  searchValue: string = '';
  searchPlaceholder: string = 'Сумма';
  searchType: string = 'amount'

  @Input() moneyEvents: MoneyOperationEvent[] = [];
  @Input() removedEvents: MoneyOperationEvent[] = [];
  @Input() categories: Category[] = [];
  @Output() eventDelete = new EventEmitter<MoneyOperationEvent>();
  @Output() eventReturn = new EventEmitter<MoneyOperationEvent>();

  constructor() { }

  ngOnInit() {

    this.moneyEvents.forEach((event: MoneyOperationEvent) => {

      event.catName = this.categories.find((cat: Category) => cat.id === event.category).name;

    })
  }

  getEventClass(event: MoneyOperationEvent) {
    return {
      'label': true,
      'label-danger': event.type === MoneyOperationType.outcome,
      'label-success': event.type === MoneyOperationType.income
    }
  }

  changeSearchType(searchType: string) {
    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    }
    this.searchPlaceholder = namesMap[searchType]
    this.searchType = searchType;
  }

  remove(moneyEvent) {
    this.eventDelete.emit(moneyEvent);
  }

  return(moneyEvent) {
    this.eventReturn.emit(moneyEvent);
  }

}
