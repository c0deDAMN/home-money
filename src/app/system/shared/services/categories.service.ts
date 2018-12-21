import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApi } from 'src/app/shared/core/base-api';
import { Category } from '../models/category.model';

@Injectable()

export class CategoriesService extends BaseApi {
    constructor(public httpClient: HttpClient) {
        super (httpClient);
    }

    addCategory(category: Category) {
        return this.post('categories', category);
    }
}