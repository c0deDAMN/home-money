import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from 'src/app/shared/core/base-api';
import { WfmEvent } from '../models/event.model';

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
}