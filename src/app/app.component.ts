import { Component, ViewChild } from '@angular/core';
import { Department } from './department/model/department';
import { DepartmentTableComponent } from './department/department-table/department-table.component';
import { Router } from '@angular/router';
import { of, interval } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DepartmentService } from './department/department.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // step 1
  // ทำยังไงก็ให้ service ใช้ได้ (provider, inject)
  // step 2 (เช็คข้อมูลว่า ยิง request ได้ data ไหม)
  // ลองสร้าง request get ยิง this.service.searchDepartmentList().subscribe(console.log)
  // step 3 ถ้ายิงจาก step 2 ได้แล้ว ให้สร้าง pipe
  // this.service.searchDepartmentList().pipe(...budget<500.....).subscribe(console.log)
  constructor(private service: DepartmentService) {
    //  const source =  of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
     // ข้อ 1 Hello1 - Hello10
      // source.
     // ข้อ 2 ให้ออกเฉพาะเลขคี่
    //  source.pipe(filter(val => val % 2 === 1)).subscribe(val => console.log(val));
     // ข้อ 2.5
    //  const source2 = of(
    //    {name: 'Rx', code: '01', status: 1},
    //  {name: 'PP', code: '01', status: 2},
    //  {name: 'XX', code: '01', status: 1},
    //  {name: 'GG', code: '01', status: 2},
    //  {name: 'KK', code: '01', status: 2}
    //  )
     // ให้ปล่อยข้อมูล เฉพาะ status เป็น 2
     // จากข้อ 2.5 เอากรองเอาแต่ข้อมูลที่ status เป็น 2 แล้วเอามาแสดงใน console.log โดยใช้ pipe
    //  source2.pipe(filter(d => d.status === 2)).subscribe(val => console.log(val));

    //  const sumFunction = (arr: number[]) => arr.reduce((acc, cur) => cur + acc, 0);

     // ข้อ 2.6
    //  const source3 = of([0, 100, 500, 200, 4400], [200, 500, 1, 3, 4400]);
     // เปลี่ยน ข้อมูล array แต่ละตัว ให้เป็นผลรวมของ array นั้น โดยใช้วิธี pipe
    //  source3.pipe(map(ar => sumFunction(ar))).subscribe(val => console.log);

     // ข้อ 2.7
    //  const source4 = of({debit: 500, credit: 600}, {debit: 100, credit: 1000});
     // เปลี่ยนข้อมูลแต่ละ emit ของ Observable source4 ให้เป็นค่า credit-debit
     // คำตอบ จะได้ 100 , 900
    //  source4.pipe(map(obj => obj.credit - obj.debit)).subscribe(val => console.log);

     // ข้อ 2.8
    //  const response1 = {results: [
    //    {name: 'OT', budget: 100},
    //    {name: 'AB', budget: 500},
    //    {name: 'CC', budget: 1000}
    //  ]};
    //  const response2 = {results: [
    //   {name: 'Cude', budget: 10},
    //   {name: 'Blue', budget: 50},
    //   {name: 'Red', budget: 1}
    // ]};
    //  const source5 = of(response1, response2);
    //  source5.pipe(map(b => {
    //   let sum5 = 0;
    //   b.results.forEach(item => sum5 += item.budget);
    //   return sum5;
    //   })).subscribe(val => console.log(val));
     // เปลี่ยนข้อมูลแต่ละ emit ของ Observable source5 ให้เป็นค่าผลรวมของ budget ของทุก object ใน results
    // source5.pipe(......).subscribe(val=>console.log);
    // คำตอบออก 1600 61

    // ข้อ 2.9
    //  const source6 = interval(1000);
     // 0,1,2,3,4,5,6,7,8,9
    //  source6.pipe(filter(i => i % 4 === 0), map(i => 'Hello')).subscribe(val => console.log(val));
     // จาก source6 ให้ console.log คำว่า Hello ทุกๆ 5 วินาที
    // source5.pipe(......).subscribe(val=>console.log);
    // คำตอบออก Hello....5 วินาที....Hello.....5 วินาที....Hello

    // ข้อ 3 สร้าง request get ไปยิงเอา departmentList มา(ใช้ department.service)
    // ทำเหมือนเดิมตอนค้นหาในตาราง เช่น
    // Department[] คือ response
    //  const logResult = (val: any) => console.log(val);

    //  const ปล่อยlog = console.log;
    //  const budgetน้อยกว่า500 = map(
    //   (response: Department[]) => {
    //      return response.filter(department => department.budget < 500);
    //  }
    // );

    //  const source7$ = this.service.searchDepartmentList()
    //  .pipe(budgetน้อยกว่า500)
    //  .subscribe(ปล่อยlog);


    // source.pipe(.....).subscribe(val=>console.log(val))
    // เอากรองข้อมูลใน pipe ของ Observable จาก source เอาแต่ที่ budget < 500
    // (ข้อมูลสุดท้ายที่ emit มาให้ console.log จะเป็น Department[] ที่ budget< 500)
    // เอามาแสดงใน console.log

  }

}
