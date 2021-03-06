import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Bill } from '../models/bill.model';
import { BaseApi } from 'src/app/shared/core/base-api';
import { Observable } from 'rxjs';

@Injectable()

export class BillService extends BaseApi {
    constructor(public http: HttpClient) {
        super(http);
    }

    getBill() {
        return this.get('bill');
    }

    getCurrency(base: string = 'RUB') {
        return this.http.get('http://data.fixer.io/api/latest?access_key=468e2e3c89cdb61a9ec25e9704efa685&symbols=USD,RUB&format=1');
    }

    updateBill(bill: Bill) {
        return this.put('bill', bill);
    }
}