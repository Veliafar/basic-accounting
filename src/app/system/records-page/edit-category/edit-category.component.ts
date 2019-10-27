import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../shared/models/category.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Message } from 'src/app/shared/services/models/message.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.less']
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  @Input() categories: Category[] = new Array<Category>();
  @Output() onCategoryEdit = new EventEmitter<Category>();

  currentCategoryId = 1;
  currentCategory: Category;
  message: Message;

  constructor(
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.message = new Message('success', '');
    this.onCategoryChange();
  }

  
  onCategoryChange() {
    console.log(this.currentCategoryId);
    this.currentCategory = this.categories
      .find( category => category.id === +this.currentCategoryId)
    
  }

  onSubmit(form: NgForm) {
     // tslint:disable-next-line: prefer-const
     let { name, capacity } = form.value;
     if (capacity < 0) {
       capacity = capacity * -1;
     }
     this.currentCategory = new Category(name, capacity, +this.currentCategoryId);
 
     this.categoriesService.updateCategory(this.currentCategory)
       .pipe(
         takeUntil(this.ngUnsubscribe)
       )
       .subscribe((category: Category) => {
         this.onCategoryEdit.emit(category);
         this.message.text = 'Категория успешно отредактирована';
         window.setTimeout(() => this.message.text = '', 5000);
       });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
