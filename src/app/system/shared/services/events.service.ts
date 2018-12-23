import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BaseApi } from 'src/app/shared/core/base-api';
import { WfmEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable()
export class EventService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: WfmEvent) {
        return this.post('events', event);
    }

    getEvents() {
        return this.get('events');
    }

    //проверка фичи новой версии ангуляр(добавил в BaseApi get1)
    

    getEventById(id: string): Observable<WfmEvent> {
        return this.get1(`events/${id}`);
    }
}