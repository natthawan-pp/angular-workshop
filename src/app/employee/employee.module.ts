import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { TableComponent } from './table/table.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { EmployeeComponent } from './employee.component';
import { EmployeeService } from './employee.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EditemployeeComponent } from './editemployee/editemployee.component';


@NgModule({
  declarations: [EmployeeComponent, SearchComponent, TableComponent, EditemployeeComponent, ],
  imports: [
    CommonModule,
    InputTextModule,
    DropdownModule,
    RadioButtonModule,
    ReactiveFormsModule,
    MessagesModule,
    MessageModule,
    TableModule,
    DialogModule,
    RouterModule,
    HttpClientModule,
    CheckboxModule,
    ToggleButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ChartModule
  ],
  exports: [EmployeeComponent, EditemployeeComponent],
  providers: [EmployeeService, ConfirmationService, MessageService]
})
export class EmployeeModule { }
