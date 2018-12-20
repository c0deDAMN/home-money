import { Component, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Observable } from 'rxjs';
import { Bill } from '../shared/models/bill.model';

interface Cur {
  "USD": number, 
  "RUB": number
}

@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})



export class BillPageComponent implements OnInit {

  constructor(private billService: BillService) { }

  bill: Bill;
  currency: Cur;

  //разобраться 
  ngOnInit() {

    this.billService.getBill().subscribe((data: Bill) => {
      this.bill = data;
      console.log(this.bill);
    })

    this.billService.getCurrency().subscribe((data: Cur) => {
      this.currency = data['rates'];
      console.log(this.currency);
    })

    

  }

}
