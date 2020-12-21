import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from '../department.service';
import { ActivatedRoute } from '@angular/router';
import { Department } from '../model/department';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css']
})
export class ViewDepartmentComponent implements OnInit {
  @ViewChild('searchComponent') searchComponent: SearchComponent;
  constructor(private service: DepartmentService
    ,         private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.service.searchDepartmentList(this.route.snapshot.params).subscribe(response => {
      this.searchComponent.departmentForm.patchValue(response[0]);
    });
  }

}
