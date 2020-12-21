import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DepartmentModule } from './department/department.module';
import { TermOfUseComponent } from './term-of-use/term-of-use.component';
import { TestComponent } from './test/test.component';
import { DepartmentService } from './department/department.service';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeModule } from './employee/employee.module';
import { EmployeeService } from './employee/employee.service';
import { EditemployeeComponent } from './employee/editemployee/editemployee.component';


const myRoutes: Routes = [
  { path: '', redirectTo: 'employee', pathMatch: 'full' },
  { path: 'employee', component: EmployeeComponent },
  { path: 'employee/edit/:employeeId', component: EditemployeeComponent },
  { path: 'employee/add', component: EditemployeeComponent },
  { path: '**', component: EmployeeComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    TermOfUseComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    DepartmentModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(myRoutes),
    EmployeeModule
  ],
  providers: [DepartmentService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
