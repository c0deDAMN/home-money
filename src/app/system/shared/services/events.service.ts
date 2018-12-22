import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from 'src/app/shared/core/base-api';
import { WfmEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable()
export class EventService extends BaseApi {

    constructor(public httpClient: HttpClient) {
        super(httpClient);
    }

    addEvent(event: WfmEvent) {
        return this.post('events', event);
    }

    getEvents() {
        return this.get('events');
    }

    getEventById(id: string): Observable<any> {
        return this.get(`events/${id}`);
    }
}