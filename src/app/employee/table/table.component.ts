import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService, QueryEmployeeByCondition } from '../employee.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SearchComponent } from '../search/search.component';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @ViewChild('searchComponent') searchComponent: SearchComponent;

  showHello = false;
  valueList: QueryEmployeeByCondition[];
  valueList$: Observable<QueryEmployeeByCondition[]>;
  trashList: QueryEmployeeByCondition[] = [];

  displaySelectionDelete = false;
  subscription: Subscription;
  // ใช้เปิดปิด dialog - default ปิด dialog
  displaySearchComponent = false;
  constructor(private service: EmployeeService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService, private router: Router) { }

  ngOnInit() {
    // this.Search();

  }

   Search(event?: any) {
    // const rawValue = this.searchComponent.employeeFormGroup.getRawValue();
    const condition = {};
    Object.keys(event).forEach(key => {
      if (event[key]) {
        condition[key] = event[key];
      }
    });
    this.service.loadQueryEmployeeByCondition(condition)
      .subscribe(dataList => {
        this.valueList = dataList;
      });
  }

  gotoEditPage(employeeId: string) {
    this.router.navigateByUrl(`/employee/edit/${employeeId}`);
  }


  public removeEmployee(employeeId: string) {
    // this.service.deleteEmployee(employeeId).subscribe(response => {
    //   // สั่ง refresh ให้ข้อมูลที่ถูกลบหายออกจากตาราง
    //   this.onSearch();
    //   window.alert('ลบสำเร็จแล้ว');
    // }, error => {
    //   window.alert('ลบไม่ได้ เป็นอะไรไม่รู้');
    // });
  }



}
