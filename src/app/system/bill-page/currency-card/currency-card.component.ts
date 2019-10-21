import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';
import { CbValutes } from '../../shared/models/cb-valutes.model';
import { element } from 'protractor';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.less']
})
export class CurrencyCardComponent implements OnInit {

  @Input() currency: CbValutes[] = new Array<CbValutes>();
  @Input() currentDate: string;

  usd: CbValutes = new Object as CbValutes;
  eur: CbValutes = new Object as CbValutes;
  valueInUsd: number;
  valueInEur: number;

  currencyArr: string[] = ['EUR', 'USD'];


  constructor() { }

  ngOnInit() {    
  }

  getCurrencyFromArr(currencyCode: string): CbValutes {
    return this.currency.find((el: CbValutes) => {
      return el.CharCode === currencyCode;
    })
  }

}
