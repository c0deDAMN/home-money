import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { EventService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { WfmEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: WfmEvent;
  category: Category;
  isLoaded = false;
  s1: Subscription;

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.s1 = this.route.params.subscribe((params: Params) => {
      this.eventService.getEventById(params['id'])
        .subscribe((event: WfmEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event.category)
            .subscribe((category: Category) => {
              this.category = category;
              this.isLoaded = true;
            });
        })
    })


  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
  }
}
