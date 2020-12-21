import { Component, OnInit, ViewChild } from '@angular/core';
import { Department } from '../model/department';
import { DepartmentService } from '../department.service';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {
  @ViewChild('searchComponent') searchComponent: SearchComponent;
  department: Department;
  constructor(private service: DepartmentService
    ,         private route: ActivatedRoute,
              private messageService: MessageService) {

  }

  ngOnInit() {
    this.service.searchDepartmentList(this.route.snapshot.params).subscribe(response => {
      this.department = response[0];
      this.searchComponent.departmentForm.patchValue(response[0]);
    });
  }

  saveDepartment(event: any) {
    const newObject2 = {...event};
    delete newObject2.budgetFrom;
    delete newObject2.budgetTo;

    if (event.departmentCode) {
      this.service.updateDepartment(newObject2).subscribe((response: Department) => {
        this.department = response;
        // แสดง message
        this.messageService.add({severity: 'success', summary: 'ข้อความจากระบบ', detail: 'บันทึกสำเร็จ'});
      });
    } else {
      this.service.insertDepartment(newObject2).subscribe(response => {

        // แสดง message
        this.messageService.add({severity: 'success', summary: 'ข้อความจากระบบ', detail: 'บันทึกสำเร็จ'});
      });
    }

  }


}
