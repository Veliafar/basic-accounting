import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
    constructor(
        public http: HttpClient
    ) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill');
    }

    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://data.fixer.io/api/latest?base=${base}`)
            .map( (res) => res);
    }
}
