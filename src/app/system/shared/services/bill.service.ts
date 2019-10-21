import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable()
export class BillService {
    constructor(
        private http: HttpClient
    ) {}

    getBill(): Observable<Bill> {
        return this.http.get('http://localhost:3000/bill')
            .map( (res: Bill) => res);
    }

    getCurrency(base: string = 'RUB'): Observable<any> {
        return this.http.get(`https://data.fixer.io/api/latest?base=${base}`)
            .map( (res) => res);
    }
}
