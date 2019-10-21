import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Observable, Subject } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.less']
})
export class BillPageComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  currency: any = null;
  bill: Bill = null;
  isLoaded = false;

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
        (data: [Bill, any]) => {
          this.isLoaded = true;
          this.bill = data[0];
          this.currency = data[1];
        }
      );
  }

  onRefresh() {
    this.isLoaded = false;
    this.billService.getCurrency()
      .debounceTime(3000)
      .pipe(
        takeUntil(this.ngUnsubscribe),
      )
      .subscribe((currency: any) => {
        this.isLoaded = true;
        this.currency = currency;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
