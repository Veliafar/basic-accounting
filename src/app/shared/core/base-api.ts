import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class BaseApi {

    private baseUrl = 'http://localhost:3000/';

    constructor(
        public http: HttpClient
    ) {}

    get(url: string): Observable<any> {
        return this.http.get(this.getUrl(url))
            .map( (res: Response) => res);
    }

    post(url: string, data: any = {}): Observable<any> {
        return this.http.post(this.getUrl(url), data)
            .map( (res: Response) => res);
    }

    put(url: string, data: any = {}): Observable<any> {
        return this.http.put(this.getUrl(url), data)
            .map( (res: Response) => res);
    }


    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }
}
