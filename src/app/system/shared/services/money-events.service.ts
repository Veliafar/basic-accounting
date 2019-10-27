import { BaseApi } from 'src/app/shared/core/base-api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MoneyOperationEvent } from '../models/money-operation-event.model';

@Injectable()
export class MoneyEventsService extends BaseApi{
    constructor(
        public http: HttpClient
    ) {
        super(http);
    }

    addEvent(event: MoneyOperationEvent): Observable<MoneyOperationEvent> {
        return this.post(`events`, event);
    }

    getEvents(): Observable<MoneyOperationEvent[]> {
        return this.get(`events`);
    }


    manageDateToDBFormat() {
        const dt = new Date();
        const formatedDt: string = `${
          (dt.getMonth() + 1).toString().padStart(2, '0')}.${
          dt.getDate().toString().padStart(2, '0')}.${
          dt.getFullYear().toString().padStart(4, '0')} ${
          dt.getHours().toString().padStart(2, '0')}:${
          dt.getMinutes().toString().padStart(2, '0')}:${
          dt.getSeconds().toString().padStart(2, '0')}`
    
        return formatedDt;
      }

}