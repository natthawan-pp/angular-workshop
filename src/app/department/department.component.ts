import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from './model/department';
import { DepartmentTableComponent } from './department-table/department-table.component';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  title = 'NProject';
  @ViewChild('departmentTable') table: DepartmentTableComponent;
  data: any;


  constructor(private service: DepartmentService) {
    this.service.behaviorDepartment$.subscribe(departmentList => {

      this.data = {
        labels: departmentList.map(department => department.departmentName),
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
                data: departmentList.map(department => department.budget)
            }
        ]
    };
    });
  }

  ngOnInit() {
  }

  protected fromSearchClick(event: Department) {
    const noNullObject = {};
    Object.keys(event).forEach(key => {
      if (event[key]) {
        noNullObject[key] = event[key];
      }
    });

    this.table.search(noNullObject);
  }

  protected fromCancelClick(event: string) {

  }

}
