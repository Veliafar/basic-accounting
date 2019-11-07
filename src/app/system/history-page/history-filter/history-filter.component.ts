import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Category } from '../../shared/models/category.model';

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.less']
})
export class HistoryFilterComponent {

  @Output() onFilterCancel = new EventEmitter<any>();
  @Output() onFilterApply = new EventEmitter<any>();

  @Input() categories: Category[] = [];

  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  timePeriods = [
    { type: 'd', label: 'День' },
    { type: 'w', label: 'Неделя' },
    { type: 'M', label: 'Месяц' }
  ];

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ]

  closeFilter() {

    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];

    this.onFilterCancel.emit();
  }

  handleSelectedChange({ checked, value }, nameOfArr: string) {
    if (checked) {
      this[nameOfArr].indexOf(value) === -1 ? this[nameOfArr].push(value) : null

    } else {
      this[nameOfArr] = this[nameOfArr].filter(type => type !== value);
    }
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    })
  }

}
