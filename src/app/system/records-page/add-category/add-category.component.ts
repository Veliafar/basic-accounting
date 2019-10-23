import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.less']
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Output() whenCategoryAdd = new EventEmitter<Category>();
  category: Category;

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    // tslint:disable-next-line: prefer-const
    let { name, capacity } = form.value;
    if (capacity < 0) {
      capacity = capacity * -1;
    }
    this.category = new Category(name, capacity);

    this.categoriesService.addCategory(this.category)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe( (category: Category) => {
        form.reset();
        form.form.patchValue(category);

        this.whenCategoryAdd.emit(category);
      });

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
