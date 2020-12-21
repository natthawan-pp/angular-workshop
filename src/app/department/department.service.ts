import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department } from './model/department';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class DepartmentService {
  projectName = 'ploy Project';
  behaviorDepartment$ = new BehaviorSubject<Department[]>([]);
  constructor(private http: HttpClient) { }

  searchDepartmentList(condition = {}): Observable<Department[]> {
    return this.http.get<Department[]>(
      '/workshop-api/api/department', {params: condition });
  }

  updateDepartment(body: any) {
    return this.http.put(`/workshop-api/api/department`, body);
  }

  insertDepartment(department: Department): Observable<Department> {
    // return this.http.post(`/workshop-api/api/department`, department) as Observable<Department> ;
    return this.http.post<Department>(`/workshop-api/api/department`, department);
  }


  deleteDepartment(departmentCode: string): Observable<any> {
    return this.http.delete(`/workshop-api/api/department/${departmentCode}`);
  }
}
