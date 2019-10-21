import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';
import { CbValutes } from '../../shared/models/cb-valutes.model';
import { CbData } from '../../shared/models/cb-data.module';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.less']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill = new Object as Bill;
  @Input() currency: CbValutes[] = new Array<CbValutes>();

  usd: CbValutes = new Object as CbValutes;
  eur: CbValutes = new Object as CbValutes;
  valueInUsd: number;
  valueInEur: number;

  constructor() { }

  ngOnInit() {
      
    this.usd = this.currency.find( el => {
      return el.CharCode === 'USD'
    })
    this.valueInUsd = this.bill.value / this.usd.Value;

    this.eur = this.currency.find( el => {
      return el.CharCode === 'EUR'
    })    
    this.valueInEur = this.bill.value / this.eur.Value;
    
  }

}
