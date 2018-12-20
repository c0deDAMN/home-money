import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

@Injectable()

export class BillService {
    constructor(private http: HttpClient) { }

    getBill() {
        return this.http.get('http://localhost:3000/bill');
    }

    getCurrency(base: string = 'RUB') {
        return this.http.get('http://data.fixer.io/api/latest?access_key=468e2e3c89cdb61a9ec25e9704efa685&symbols=USD,RUB&format=1');
    }
}