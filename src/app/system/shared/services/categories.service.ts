import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BaseApi } from 'src/app/shared/core/base-api';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';

@Injectable()

export class CategoriesService extends BaseApi {
    constructor(public httpClient: HttpClient) {
        super (httpClient);
    }

    addCategory(category: Category) {
        return this.post('categories', category);
    }

    getCategories() {
        return this.get('categories');
    }

    updateCategory(category: Category) {
        return this.put(`categories/${+category.id}`, category);
    }

    getCategoryById(id:number) :Observable<Category> {
        return this.get1(`categories/${id}`);
    }
}