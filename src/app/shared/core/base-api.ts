import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BaseApi {
    private baseUrl = 'http://localhost:3000/';

    constructor(public httpClient: HttpClient) {}

    private getUrl(url: string = ''): string {
        return this.baseUrl + url;
    }

    

    //можно допилить, добавив во входящие параметры subscribe
    public get(url: string = '') {
        return this.httpClient.get(this.getUrl(url));
    }

    public post(url: string = '', data: any = {}) {
        return this.httpClient.post(this.getUrl(url), data);
    }

    public put(url: string = '', data: any = {}) {
        return this.httpClient.put(this.getUrl(url), data);
    }

    
}