import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';



export interface Department {
  departmentCode: string;
  departmentName: string;
  status: string;
  province: string;
  budget: number;
  telephone: string;
  remark: string;
  budgetFrom: number;
  budgetTo: number;
}

export interface JobTitle {
  jobTitleCode: string;
  jobTitleName: string;
  jobType: string;
}

export interface QueryEmployeeByCondition {
  employeeId: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  department: Department;
  jobTitle: JobTitle;
  address: string;
  skills: string;
}

export interface Skill {
  skillId: string;
  employee: { employeeId: string };
  skillName: string;
  skillDesc: string;
}

export interface Employee {
  employeeId: string;
  title: string;
  firstName: string;
  lastName: string;
  gender: string;
  department: Department;
  jobTitle: JobTitle;
  address: string;
  skills: Skill[];
}
export interface SaveEmployee {
  address: string;
  department: SaveDepartmentCode;
  employeeId: string;
  firstName: string;
  gender: string;
  jobTitle: SavejobTitleCode;
  lastName: string;
  title: string;
}
export interface SaveDepartmentCode {
  departmentCode: string;
}
export interface SavejobTitleCode {
  jobTitleCode: string;
}

@Injectable()
export class EmployeeService {


  constructor(private http: HttpClient) { }

  loadDepartmentList(condition = {}) {
    return this.http.get<Department[]>('/workshop-api/api/department', { params: condition });
  }

  loadJobTitleList(condition = {}) {
    return this.http.get<JobTitle[]>('/workshop-api/api/jobTitle', { params: condition });
  }

  loadQueryEmployeeByCondition(condition = {}) {
    return this.http.get<QueryEmployeeByCondition[]>(
      '/workshop-api/api/employee/queryEmployeeByCondition',
      { params: condition });
  }

  loadQueryEmployeeAndSkillById(employeeId: string) {
    console.log(employeeId);
    return this.http.get<Employee>(
    `/workshop-api/api/employee/queryEmployeeAndSkillById/${employeeId}`);
  }

  updateEmployee(saveEmployee: SaveEmployee) {
    return this.http.put('/workshop-api/api/employee', saveEmployee);
  }

  insertEmployee(saveEmployee: SaveEmployee) {
    return this.http.post('/workshop-api/api/employee', saveEmployee);
  }

  insertSkill(skill: Skill) {
    return this.http.post(`/workshop-api/api/skill`, skill);
  }

  updateSkill(skill: Skill) {
    return this.http.put(`/workshop-api/api/skill`, skill);
  }

  deleteEmployee(employeeId: string) {
    return this.http.delete(`/workshop-api/api/employee/${employeeId}`);
  }


}
