import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private eventService: EventService,
    private categoriesService: CategoriesService) { }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   console.log(params['id']);
    // })
    // this.route.params.mergeMap((params: Params) => {
    //   this.eventService.getEventById(params['id'])
    // })
    // this.route.params.pipe(this.eventService.getEventById(params['id']));
  }

}
