import { Component, OnInit, OnDestroy } from '@angular/core';

import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Subscription } from 'rxjs';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { WfmEvent } from '../shared/models/event.model';

@Component({
  selector: 'wfm-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  //исправить когда найду как синхронизировать асинхронные запросы, а пока на каждый запрос свой флаг загрузки
  isLoaded1 = false;
  isLoaded2 = false;
  isLoaded3 = false;

  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  bill: Bill;
  categories: Category[] = [];
  events: WfmEvent[] = [];

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventService: EventService) { }

  ngOnInit() {
    this.sub1 = this.billService.getBill().subscribe((data: Bill) => {
      this.bill = data;
      this.isLoaded1 = true;
    });
    this.sub2 = this.categoriesService.getCategories().subscribe((data: Category[]) => {
      this.categories = data;
      this.isLoaded2 = true;
    });
    this.sub3 = this.eventService.getEvents().subscribe((data: WfmEvent[]) => {
      this.events = data;
      this.isLoaded3 = true;
    });
  }

  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => (e.category === cat.id && e.type === "outcome"));

    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
    if (this.sub2) this.sub2.unsubscribe();
    if (this.sub3) this.sub3.unsubscribe();
  }


}
