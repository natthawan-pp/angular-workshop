import { Component, OnInit, ViewChild } from '@angular/core';
import { TableComponent } from './table/table.component';
import { EmployeeService, QueryEmployeeByCondition } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  @ViewChild('table') table: TableComponent;

  constructor(private service: EmployeeService) { }

  ngOnInit() {
  }

  protected fromSearchClick(event: any) {
    const noNullObject = {};
    Object.keys(event).forEach(key => {
      if (event[key]) {
        noNullObject[key] = event[key];
      }
    });
    console.log(noNullObject);
    this.table.Search(noNullObject);
  }

  protected fromCancelClick(event: string) {

  }

}
