import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Observable, Subject } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { takeUntil } from 'rxjs/operators';
import { CbData } from '../shared/models/cb-data.module';
import { CbValutes } from '../shared/models/cb-valutes.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.less']
})
export class BillPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  currency: CbValutes[] = new Array<CbValutes>();
  bill: Bill = new Object() as Bill;
  isLoaded = false;
  currentDate: string;

  currencyArr: string[] = ['EUR', 'USD'];

  constructor(
    private billService: BillService
  ) { }
 
  ngOnInit() {
    Observable.combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    )
      .debounceTime(3000)
      .pipe(
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe(
        (data: [Bill, CbData]) => {
          this.bill = data[0];
          this.currency = this.getValutes(data[1]);
          this.currentDate = data[1].Date;
          this.isLoaded = true;
        }
      );
  }

  getValutes(cbData: CbData) {
    const data: { [name: string]: CbValutes } = cbData.Valute;
    const valutes: CbValutes[] = new Array<CbValutes>();

    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key]) {
        valutes.push(data[key]);
      }
    }
    return valutes;
  }

  onRefresh() {
    this.isLoaded = false;
    this.billService.getCurrency()
      .debounceTime(3000)
      .pipe(
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((currency: any) => {
        this.currency = currency;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
