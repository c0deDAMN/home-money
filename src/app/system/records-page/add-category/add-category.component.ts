import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoriesService } from '../../shared/services/categories.service';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wfm-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {
  sub1: Subscription;
  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(private categoriesServices: CategoriesService) { }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0) {
      capacity *= -1;
    }

    var category: Category = { name, capacity };

    this.sub1 = this.categoriesServices.addCategory(category).subscribe((category: Category) => {
      form.reset();
      form.form.patchValue({ capacity: 1 });
      this.onCategoryAdd.emit(category);
    })
  }
  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }
}
