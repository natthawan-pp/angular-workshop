import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Input() topicHeader: string;
  @Input() showBudget = true;
  @Input() mode = 'search';
  @Input() disabled = false;
  @Input() resetObject = {};
  @Output() searchClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();
  @Output() saveClick = new EventEmitter();

  departmentInput: string;

  employeeFormGroup = new FormGroup({
    departmentCode: new FormControl(),
    jobTitleCode: new FormControl(),
    jobType: new FormControl(),
    lastName: new FormControl(),
    firstName: new FormControl(),
    gender: new FormControl(),
  });
  departmentOptions: SelectItem[] = [
    { label: 'Select Province', value: null },
    { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
  ];
  jobtitleOptions: SelectItem[] = [
    { label: 'Select Province', value: null },
    { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
  ];

  constructor(private service: EmployeeService) { }

  ngOnInit() {
    this.service.loadDepartmentList().subscribe(departmentList => {
      this.departmentOptions = departmentList.map(department => {
        return { label: department.departmentName, value: department.departmentCode };
      });

      this.departmentOptions.unshift({ label: 'Select Department', value: null });
    });

    this.service.loadJobTitleList().subscribe(jobTitleList => {
      this.jobtitleOptions = jobTitleList.map(jobTitle => {
        return { label: jobTitle.jobTitleName, value: jobTitle.jobTitleCode };
      });

      this.jobtitleOptions.unshift({ label: 'Select JobTitle', value: null });
    });
  }


  onSave(event: any) {
    if (this.employeeFormGroup.valid) {
      this.saveClick.emit(this.employeeFormGroup.getRawValue());
    } else {
      Object.values(this.employeeFormGroup.controls)
        .forEach(f => f.markAsDirty());
    }
  }

  myOnInput(event: string) {
    this.departmentInput = event;
  }

  //   @Output() searchClick = new EventEmitter();
  onSearch(event: any) {
    if (this.employeeFormGroup.valid) {
      this.searchClick.emit(this.employeeFormGroup.getRawValue());
    } else {
      Object.values(this.employeeFormGroup.controls)
        .forEach(f => f.markAsDirty());
    }
  }

  onCustomProvince(provinceCustom: boolean) {
    // this.provinceCustom = provinceCustom;
    this.employeeFormGroup.get('province').reset();

  }
  onCustomBudget(provinceBudget: boolean) {
    this.employeeFormGroup.get('budgetFrom').reset();
    this.employeeFormGroup.get('budgetTo').reset();

  }

  onCancel(event: any) {
    this.employeeFormGroup.reset(this.resetObject);
    this.cancelClick.emit(this.departmentInput);
  }

  onBudgetRangeOptionsChange(event: any) {
    const selectedValue = event.value;
    if (selectedValue) {
      const rangeValues = selectedValue.split('-');
      this.employeeFormGroup.get('budgetFrom').setValue(+rangeValues[0]);
      this.employeeFormGroup.get('budgetTo').setValue(rangeValues[1] ? +rangeValues[1] : null);
    } else {
      this.employeeFormGroup.get('budgetFrom').setValue(null);
      this.employeeFormGroup.get('budgetTo').setValue(null);

    }
  }

  control(controlName: string): FormControl {
    return this.employeeFormGroup.get(controlName) as FormControl;
  }

}
