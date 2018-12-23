import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Category } from '../shared/models/category.model';
import { WfmEvent } from '../shared/models/event.model';


@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded = false;

  s1: Subscription;
  s2: Subscription;

  constructor(private categoriesService: CategoriesService,
    private eventsService: EventService) { }

  categories: Category[] = [];
  events: WfmEvent[] = [];
  filteredEvents: WfmEvent[] = [];

  chartData = [];

  isFilterVisible = false;

  ngOnInit() {
    //рабочий, но корявый метод

    // this.s1 = this.categoriesService.getCategories().subscribe((date: Category[]) => {
    //   this.categories = date;
    //   this.isLoaded1 = true;
    // });

    // this.s2 = this.eventsService.getEvents().subscribe((date: WfmEvent[]) => {
    //   this.events = date;
    //   this.isLoaded2 = true;
    //   this.calculateChartData();
    // });

    //вложим для синхронизации один subscribe в другой
    this.s1 = this.categoriesService.getCategories().subscribe((date: Category[]) => {
      this.categories = date;
      this.eventsService.getEvents().subscribe((date: WfmEvent[]) => {
        this.events = date;
        this.isLoaded = true;

        this.setOriginalEvents()
        this.calculateChartData();
      });
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
      this.chartData.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total;
        }, 0)
      })
    });
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    console.log(filterData);

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
  }

}
