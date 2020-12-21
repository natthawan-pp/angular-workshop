import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import { SearchComponent } from './search/search.component';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import { DepartmentTableComponent } from './department-table/department-table.component';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { StatusPipe } from './pipe/status.pipe';
import { TranslatePipe } from './pipe/translate.pipe';
import {HttpClientModule} from '@angular/common/http';
import { DepartmentService } from './department.service';
import {CheckboxModule} from 'primeng/checkbox';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToastModule} from 'primeng/toast';
import { ResponsiveGridComponent } from './responsive-grid/responsive-grid.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { ViewDepartmentComponent } from './view-department/view-department.component';
import { EditDepartmentComponent } from './edit-department/edit-department.component';
import { DebounceButtonDirective } from './debounce-button.directive';
import { BudgetOverloadDirective } from './budget-overload.directive';
import { AutoSearchDirective } from './auto-search.directive';
import {ChartModule} from 'primeng/chart';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [PageNotFoundComponent,
     DepartmentComponent, SearchComponent, DepartmentTableComponent,
      StatusPipe, TranslatePipe, ResponsiveGridComponent, ViewDepartmentComponent,
      EditDepartmentComponent,
      DebounceButtonDirective,
      BudgetOverloadDirective,
      AutoSearchDirective],
  imports: [
    CommonModule,
    ButtonModule,
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
    ChartModule,
    InputTextareaModule
  ],
  exports: [DepartmentComponent]
  , providers: [DepartmentService, ConfirmationService, MessageService]
})
export class DepartmentModule { }
