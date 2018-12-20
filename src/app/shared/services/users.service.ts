import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/user.model';
import { BaseApi } from '../core/base-api';



//HttpClientModule

@Injectable()
export class UsersService extends BaseApi {

    constructor(public http: HttpClient) { 
        super(http);
    }

    // getUserByEmail(email: string) {
    //     return this.http.get(`http://localhost:3000/users?email=${email}`);
    // }
    getUserByEmail(email: string) {
        return this.get(`users?email=${email}`);
    }

    createNewUser(user: User){
        return this.post(`users`, user);
    }
}