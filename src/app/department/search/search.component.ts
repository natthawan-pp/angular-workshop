import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DepartmentService } from '../department.service';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {

  departmentForm = new FormGroup({
    departmentCode: new FormControl(),
    departmentName: new FormControl(null, [
      Validators.minLength(3)]),
    province: new FormControl(),
    status: new FormControl(),
    remark: new FormControl(null),
    telephone: new FormControl(),
    budget: new FormControl(null, Validators.pattern(/^\d+$/)),
    budgetFrom: new FormControl(null, Validators.pattern(/^\d+$/)),
    budgetTo: new FormControl(null, Validators.pattern(/^\d+$/))
  });

  customBudgetControl = new FormControl(false);

  @Input() topicHeader: string;
  @Input() showBudget = true;
  @Input() mode = 'search';
  @Input() disabled = false;
  @Input() resetObject = {};
  @Output() searchClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();
  @Output() saveClick = new EventEmitter();

  animal = 'new';
  counter = 0;
  departmentInput: string;
  dropdownOptions: SelectItem[] = [
    {label: 'Select Province', value: null},
    {label: 'New York', value: 'Bangkok1'},
    {label: 'Rome', value: 'Bangkok2'},
    {label: 'London', value: 'Bangkok3'},
    {label: 'Istanbul', value: 'Bangkok4'},
    {label: 'Paris', value: 'Bangkok5'}
  ];
budgetRangeOptions: SelectItem[] = [
    {label: 'Select Range', value: null},
    {label: '0-100', value: '0-100'},
    {label: '100-1000', value: '100-1000'},
    {label: '1000-5000', value: '1000-5000'},
    {label: '5000-10000', value: '5000-10000'},
    {label: '10000-50000', value: '10000-50000'},
    {label: 'more than 50000', value: '50000-'},
];
  provinceCustom: boolean;
  constructor(private service: DepartmentService) { }

  ngOnInit() {
    this.departmentForm.get('remark').disable();
    if (this.disabled) {
      this.departmentForm.disable();
    }
  }

  ngAfterViewInit(): void {
    // const searchButtonElement = document.getElementById('searchButton');
    // const observable = fromEvent(searchButtonElement, 'click');
    // observable.pipe(debounceTime(500)).subscribe(event => {
    //   this.onSearch(event);
    // });
  }


  onRadioClick(radioValue: string) {
    // ถ้า Y ให้ disabled
    // ถ้า N หรือ other enable
    if (radioValue === 'Y') {
      this.departmentForm.get('remark').disable();
      this.departmentForm.get('remark').setValue(null);
    } else {
      this.departmentForm.get('remark').enable();
    }
  }

  onSave(event: any) {
    if (this.departmentForm.valid) {
      this.saveClick.emit(this.departmentForm.getRawValue());
    } else {
      Object.values(this.departmentForm.controls)
      .forEach(f => f.markAsDirty());
    }
  }

  myOnInput(event: string) {
    this.departmentInput = event;
  }

  onClick() {
    this.animal = 'dog dog cat';
  }

  onClick2() {
    this.animal = 'cat cat dog dog';
  }
  addCount() {
    this.counter++;
    // this.animal = 'cat cat dog dog';
  }
  substractCount() {
    if (this.counter - 1 >= 0) {
    this.counter--;
    }
  }
//   @Output() searchClick = new EventEmitter();
  onSearch(event: any) {
    if (this.departmentForm.valid) {
      this.searchClick.emit(this.departmentForm.getRawValue());
    } else {
      Object.values(this.departmentForm.controls)
      .forEach(f => f.markAsDirty());
    }
  }

  onCustomProvince(provinceCustom: boolean) {
    this.provinceCustom = provinceCustom;
    this.departmentForm.get('province').reset();

  }
  onCustomBudget(provinceBudget: boolean) {
    this.departmentForm.get('budgetFrom').reset();
    this.departmentForm.get('budgetTo').reset();

  }

  onCancel(event: any) {
    this.departmentForm.reset(this.resetObject);
    this.cancelClick.emit(this.departmentInput);
  }

  onBudgetRangeOptionsChange(event: any) {
    const selectedValue = event.value;
    if (selectedValue) {
      const rangeValues = selectedValue.split('-');
      this.departmentForm.get('budgetFrom').setValue(+rangeValues[0]);
      this.departmentForm.get('budgetTo').setValue(rangeValues[1] ? +rangeValues[1] : null);
    } else {
      this.departmentForm.get('budgetFrom').setValue(null);
      this.departmentForm.get('budgetTo').setValue(null);

    }
  }

  control(controlName: string): FormControl {
    return this.departmentForm.get(controlName) as FormControl;
  }

}
