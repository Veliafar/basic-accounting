import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Category } from '../../shared/models/category.model';
import { MoneyOperation } from '../../shared/models/money-operation.model';
import { MoneyOperationEvent } from '../../shared/models/money-operation-event.model';
import { MoneyEventsService } from '../../shared/services/money-events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { MoneyOperationType } from '../../shared/models/enums/money-operation-type.enum';
import { Message } from 'src/app/shared/services/models/message.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.less']
})
export class AddEventComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() categories: Category[] = [];

  moneyOperationEvent: MoneyOperationEvent = new MoneyOperationEvent();

  types: MoneyOperation[] = [
    { type: MoneyOperationType.income, label: 'Доход' },
    { type: MoneyOperationType.outcome, label: 'Расход' }
  ];

  message: Message = new Message('', 'danger');

  defaultForm = {
    amount: 0,
    description: '',
    category: 1,
    type: MoneyOperationType.outcome
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 5000);
  }

  constructor(
    private moneyEventsService: MoneyEventsService,
    private billService: BillService
  ) { }

  ngOnInit() {


  }

  clear(form: NgForm) {
    form.setValue(this.defaultForm);
  }

  onSubmit(form: NgForm) {

    console.log(form);
    
    this.moneyOperationEvent =
      Object.assign({}, form.value);

    this.moneyOperationEvent.category =
      +this.moneyOperationEvent.category;

    if (this.moneyOperationEvent.category < 0)
      this.moneyOperationEvent.category *= -1;

    this.moneyOperationEvent.date =
      this.moneyEventsService.manageDateToDBFormat();


    this.billService.getBill()
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((bill: Bill) => {
        let value = 0;
        if (this.moneyOperationEvent.type === MoneyOperationType.outcome) {
          if (this.moneyOperationEvent.amount > bill.value) {
            this.showMessage(`На счету недостаточно средств. Необходимо: 
              ${this.moneyOperationEvent.amount - bill.value}`)
            return;
          } else {
            value = bill.value - this.moneyOperationEvent.amount;
          }
        } else {
          value = bill.value + this.moneyOperationEvent.amount;
        }

        this.billService.updateBill({ value, currency: bill.currency })
          .mergeMap(() => this.moneyEventsService.addEvent(this.moneyOperationEvent))
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(() => {
            form.setValue(this.defaultForm);
          });
      })

  }


  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
