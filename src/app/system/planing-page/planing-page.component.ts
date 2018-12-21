import { Component, OnInit } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'wfm-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit {

  isLoaded = false;

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventService: EventService) { }

  ngOnInit() {
    
  }

}
