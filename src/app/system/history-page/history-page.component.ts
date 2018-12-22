import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { WfmEvent } from '../shared/models/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded1 = false;
  isLoaded2 = false;

  s1: Subscription;
  s2: Subscription;

  constructor(private categoriesService: CategoriesService,
    private eventsService: EventService) { }

  categories: Category[] = [];
  events: WfmEvent[] = [];

  chartData = [];

  ngOnInit() {
    this.s1 = this.categoriesService.getCategories().subscribe((date: Category[]) => {
      this.categories = date;
      this.isLoaded1 = true;
    });

    this.s2 = this.eventsService.getEvents().subscribe((date: WfmEvent[]) => {
      this.events = date;
      this.isLoaded2 = true;
      this.calculateChartData();
    });
  }

  calculateChartData(): void {
    this.chartData = [];

    console.log(this.isLoaded1)
    if (!this.isLoaded1) {
      console.log("sorry:-/(");
    }

    this.categories.forEach((cat) => {
      const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })
    });
  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
    if (this.s2) this.s2.unsubscribe();
  }

}
