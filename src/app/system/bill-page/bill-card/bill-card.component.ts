import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';
import { CbValutes } from '../../shared/models/cb-valutes.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.less']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: CbValutes[];
  @Input() currencyArr: string[];

  usd: CbValutes = new Object() as CbValutes;
  eur: CbValutes = new Object() as CbValutes;

  valueInUsd: number;
  valueInEur: number;

  constructor() {}

  ngOnInit() {
    this.getValueFromArr();
  }

  getValueFromArr() {

    this.currency.forEach(element => {
      if (element.CharCode === 'EUR') {
        this.valueInEur = this.bill.value / element.Value;
      }
      if (element.CharCode === 'USD') {
        this.valueInUsd = this.bill.value / element.Value;
      }
    });
  }

}
