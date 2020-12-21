import { Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import { Department } from '../model/department';
import { DepartmentService } from '../department.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SearchComponent } from '../search/search.component';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-department-table',
  templateUrl: './department-table.component.html',
  styleUrls: ['./department-table.component.css']
})
export class DepartmentTableComponent implements OnInit, OnDestroy {

  @ViewChild('searchComponent') searchComponent: SearchComponent;

  showHello = false;
  valueList: Department[];
  valueList$: Observable<Department[]>;
  trashList: Department[] = [];
  rowSelectedObject = {};
  displaySelectionDelete = false;
  subscription: Subscription;
  // ใช้เปิดปิด dialog - default ปิด dialog
  displaySearchComponent = false;

  constructor(private service: DepartmentService, private confirmationService: ConfirmationService
    ,         private messageService: MessageService) {}

  ngOnInit() {
    this.valueList$ = this.service.behaviorDepartment$;

    // console.log('projectName', this.service.projectName);
    this.search();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  openDialogForAdd() {
    // เปิด dialog
    this.displaySearchComponent = true;
    // ล้าง form
    this.searchComponent.departmentForm.reset();

  }

  onTableRowSelect(event: any) {
    // เก็บค่า backup data ไว้สำหรับกดปุ่ม cancel
    this.rowSelectedObject = event.data;
    // console.log('data', event.data);
    this.searchComponent.departmentForm.patchValue(event.data);
    // console.log('ข้อมูล row ที่เราเลือก:', event.data);
    // this.searchComponent.departmentForm.patchValue(event.data);

    // เปิด p-dialog
    this.displaySearchComponent = true;
  }

  openTrashList() {
    this.displaySelectionDelete = !this.displaySelectionDelete;
  }

  search(condition = {}) {
    this.service.searchDepartmentList(condition)
    .subscribe(response => {
      this.service.behaviorDepartment$.next(response);
    });
  }

  onSaveDepartment(event: any) {

    const newObject2 = {...event};
    delete newObject2.budgetFrom;
    delete newObject2.budgetTo;

    if (event.departmentCode) {
      this.service.updateDepartment(newObject2).subscribe((response: Department) => {
        // หา Index ว่าตัวที่เราแก้อยู่ index อะไรของ valueList (valueList ข้อมูลที่แสดงในตาราง)
        const index = this.valueList.findIndex(d => d.departmentCode === response.departmentCode);
        // replace ข้อมูลที่ถูกบันทึกไปแทน (เพื่อให้ตารางแสดงผลตัวใหม่)
        this.valueList.splice(index, 1, response);
        this.service.behaviorDepartment$.next(this.valueList);
        // ปิด dialog
        this.displaySearchComponent = false;
        // แสดง message
        this.messageService.add({severity: 'success', summary: 'ข้อความจากระบบ', detail: 'บันทึกสำเร็จ'});
      });
    } else {
      this.service.insertDepartment(newObject2).subscribe(response => {
        // เพิ่มตัวใหม่ลงตาราง
        this.valueList.push(response);
        this.service.behaviorDepartment$.next(this.valueList);

        // ปิด dialog
        this.displaySearchComponent = false;
        // แสดง message
        this.messageService.add({severity: 'success', summary: 'ข้อความจากระบบ', detail: 'บันทึกสำเร็จ'});
      });
    }

  }

  onRecover(rowIndex: number) {
    const department = this.trashList[rowIndex] as Department & {budgetFrom: number, budgetTo: number};
    const body = {...department};
    delete body.budgetFrom;
    delete body.budgetTo;
    delete body.departmentCode;
    this.service.insertDepartment(body).subscribe(response => {
      this.valueList = [response, ...this.valueList];
      this.trashList.splice(rowIndex, 1);
      this.trashList = [...this.trashList];
      // this.table.cd.markForCheck();
      this.messageService.add({severity: 'success', summary: 'ข้อความจากระบบ', detail: 'กู้ข้อมูลสำเร็จ'});
    });
  }

  onDeleteTrash(rowIndex: number) {
    this.trashList.splice(rowIndex, 1);
  }

  onRemoveBtnClick(departmentCode: string, rowIndex: number) {

  //   this.confirmationService.confirm({
  //     message: 'แน่ใจนะว่าจะลบ? จริงดิ',
  //     accept: () => {
  //         this.service.deleteDepartment(departmentCode).subscribe(response => {
  //           this.messageService.add({severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลบข้อมูลสำเร็จ'});
  //           // ได้ index ข้อมูลที่ถูกลบไปแล้ว ในตาราง
  //           const index = this.valueList.findIndex(dept => dept.departmentCode === departmentCode);
  //           // สั่งลบข้อมูล ใน array valueList
  //           this.valueList.splice(index, 1);
  //         });
  //     }
  // });

    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        const department = this.valueList[rowIndex];
        this.service.deleteDepartment(department.departmentCode).subscribe(response => {
          // เอาลงถังขยะ
          this.trashList = [department, ...this.trashList];
          // ลบ row
          this.valueList.splice(rowIndex, 1);
          this.valueList = [...this.valueList];
          this.service.behaviorDepartment$.next(this.valueList);

          this.messageService.add({severity: 'success', summary: 'ข้อความจากระบบ', detail: 'ลบข้อมูลสำเร็จ'});
        });
      },
      reject: () => {
          // this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
      }
  });
  }
}
