import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Observable, Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';


@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})



export class BillPageComponent implements OnInit, OnDestroy {


  constructor(private billService: BillService) { }

  bill: Bill;
  currency: any;

  isLoaded = false;

  s1: Subscription;

  ngOnInit() {

    this.s1 = this.billService.getBill().subscribe((data: Bill) => {
      this.bill = data;
      this.billService.getCurrency().subscribe((data: any) => {
        this.currency = data;
        this.isLoaded = true;
      })
    })
  }

  onRefresh() {
    this.isLoaded = false;
    this.billService.getCurrency().subscribe((data: any) => {
      this.currency = data;
      this.isLoaded = true;
    })
  }

  ngOnDestroy(){
    if(this.s1) this.s1.unsubscribe();
  }
}
