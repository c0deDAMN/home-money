import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';

import { Bill } from '../../shared/models/bill.model';
import { BillService } from '../../shared/services/bill.service';


@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  dollar: number;
  euro: number;
 
  ngOnInit() {
    // почему то массив перестает оперделятся после первой ссылки на него
    // в уроках через const { rates } --не работет нихрена 

    var cur = this.currency;

    this.euro = this.bill.value / cur.rates.RUB;
    this.dollar = this.bill.value / cur.rates.RUB / cur.rates.USD;
  }

}
