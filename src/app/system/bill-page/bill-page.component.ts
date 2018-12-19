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


  //разобраться 
  ngOnInit() {
    // Observable.
    
    // (
    //   this.billService.getBill(),
    //   this.billService.getCurrency(),
    // ).subscribe((data: [Bill, any]) => {

    // })

  }

}
