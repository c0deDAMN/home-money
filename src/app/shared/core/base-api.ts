import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bill } from 'src/app/system/shared/models/bill.model';

@Injectable()
export class BaseApi {
    private baseUrl = 'http://localhost:3000/';

    constructor(public http: HttpClient) {}

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }

    
    //можно допилить, добавив во входящие параметры subscribe
    public get(url: string = '') {
        return this.http.get(this.getUrl(url));
    }

    public post(url: string = '', data: any = {}) {
        return this.http.post(this.getUrl(url), data);
    }

    public put(url: string = '', data: any = {}) {
        return this.http.put(this.getUrl(url), data);
    }
//проверка фичи
    public get1(url: string = ''):Observable<any> {
        return this.http.get<any>(this.getUrl(url));
    }
    
}