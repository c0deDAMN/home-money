import { Component, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { Observable } from 'rxjs';
import { Bill } from '../shared/models/bill.model';


@Component({
  selector: 'wfm-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})



export class BillPageComponent implements OnInit {


  constructor(private billService: BillService) { }

  bill: Bill;
  currency: any;

  isLoaded= false;

  ngOnInit() {

    this.billService.getBill().subscribe((data: Bill) => {
      this.bill = data;
    })

    this.billService.getCurrency().subscribe((data: any) => {
      this.currency = data;
      this.isLoaded = true;
    })


    //метод из уроков, загуглить объединение методов сервиса !!!!!!!
    // this.subscription = Observable.combineLatest(
    //     this.billService.getBill()
    //     this.billService.getCurrency(),
    // ).subscribe((data: [Bill, any]) => {
    //   console.log(data);
    // });
  }

  // тоже самое
  // ngOnDestroy(): void {
  // }

  onRefresh(){
    this.isLoaded = false;
    this.billService.getCurrency().subscribe((data: any) => {
      this.currency = data;
      this.isLoaded = true;
    })
  }
}
