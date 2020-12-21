import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { EmployeeService, Skill, SaveEmployee } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {
  displaySkillDialog = false;
  valueList: Skill[];
  rowSelectedObject = {};

  skillFormGroup = new FormGroup({
    skillId: new FormControl(),
    skillDesc: new FormControl(null, Validators.required),
    skillName: new FormControl(null, Validators.required)
  });
  editFormGroup = new FormGroup({
    department: new FormControl(null, Validators.required),
    jobTitle: new FormControl(null, Validators.required),
    gender: new FormControl(null, Validators.required),
    title: new FormControl(null, Validators.required),
    firstName: new FormControl(null, Validators.required),
    lastName: new FormControl(null, Validators.required),
    address: new FormControl(null, Validators.required),
  });

  departmentOptions: SelectItem[] = [
    { label: 'Select Province', value: null },
    { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
  ];
  jobtitleOptions: SelectItem[] = [
    { label: 'Select Province', value: null },
    { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
  ];
  titleOptions: SelectItem[] = [
    { label: 'Select Title', value: null },
    { label: 'MR', value: 'MR' },
    { label: 'MISS', value: 'MISS' },
    { label: 'MRS', value: 'MRS' }
  ];

  constructor(private service: EmployeeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.editFormGroup.reset();

    this.loadEmployeeById();

    this.service.loadDepartmentList().subscribe(departmentList => {
      this.departmentOptions = departmentList.map(department => {
        return { label: department.departmentName, value: department.departmentCode };
      });

      this.departmentOptions.unshift({ label: 'Select Department', value: null });
    });

    this.service.loadJobTitleList().subscribe(jobTitleList => {
      this.jobtitleOptions = jobTitleList.map(jobTitle => {
        return { label: jobTitle.jobTitleName, value: jobTitle.jobTitleCode };
      });

      this.jobtitleOptions.unshift({ label: 'Select JobTitle', value: null });
    });

  }

    loadEmployeeById() {
    const employeeIdFromUrl = this.route.snapshot.params.employeeId;

    if (employeeIdFromUrl) {
       this.service.loadQueryEmployeeAndSkillById(employeeIdFromUrl).subscribe(response => {
       this.valueList = response.skills;
       const rawValueToPatch = {
        department: response.department.departmentCode,
        jobTitle: response.jobTitle.jobTitleCode,
        gender: response.gender,
        title: response.title,
        firstName: response.firstName,
        lastName: response.lastName,
        address: response.address
      };
       this.rowSelectedObject  = rawValueToPatch;
       this.editFormGroup.patchValue(rawValueToPatch);
    });
    }
  }

  onSubmit() {
   // employeeId จาก url
    const employeeIdFromUrl = this.route.snapshot.params.employeeId;
    const rawValue = this.editFormGroup.getRawValue();
    // หน้าตา object จาก rawValue ของ formGroup
    // { "department": "001", "jobTitle": "004", "gender": "F",
    // "title": "MISS", "firstName": "asd", "lastName": "asd", "address": "asd" }
    // แปลงข้อมูลให้เป็น object สำหรับส่งไปบันทึก
    const saveEmployee: SaveEmployee = {
      address: rawValue.address,
      department: {departmentCode: rawValue.department},
      employeeId: employeeIdFromUrl,
      firstName: rawValue.firstName,
      lastName: rawValue.lastName,
      gender: rawValue.gender,
      jobTitle: {jobTitleCode: rawValue.jobTitle},
      title: rawValue.title
    };

    if (employeeIdFromUrl) {

      this.service.updateEmployee(saveEmployee).subscribe(response => window.alert('บันทึกสำเร็จ'));
    } else {
      this.service.insertEmployee(saveEmployee).subscribe(response => {
        this.editFormGroup.reset();
        window.alert('บันทึกสำเร็จ');
      });
    }
  }
  onClear(event: any) {
    this.editFormGroup.reset();
    this.editFormGroup.patchValue(this.rowSelectedObject);
  }
  onBack(event: any) {
    this.router.navigateByUrl(`/employee/`);
  }

  saveSkill(event: any) {
    const skillRawValue = this.skillFormGroup.getRawValue();
    // หน้าตา object จาก rawValue
    // { "department": "001", "jobTitle": "004",
    // "gender": "M", "title": "MISS", "firstName": "Hugf1",
    //  "lastName": "Jackman", "address": "ทดสอบ address" }

    if (skillRawValue.skillId) {
      const skill: Skill = {
        employee: { employeeId: this.route.snapshot.params.employeeId },
        skillId: skillRawValue.skillId,
        skillDesc: skillRawValue.skillDesc,
        skillName: skillRawValue.skillName
      };
      this.service.updateSkill(skill).subscribe(response => {
        this.displaySkillDialog = false;
        this.skillFormGroup.reset();
        this.loadEmployeeById();
        window.alert('บันทึก skill สำเร็จ');
      });
    } else {
      const skill: Skill = {
        employee: { employeeId: this.route.snapshot.params.employeeId },
        skillId: null,
        skillDesc: skillRawValue.skillDesc,
        skillName: skillRawValue.skillName
      };
      this.service.insertSkill(skill).subscribe(response => {
        this.displaySkillDialog = false;
        this.loadEmployeeById();
        this.skillFormGroup.reset();
        window.alert('บันทึก skill สำเร็จ');
      });
    }

  }
  cancelSkill() {
    this.displaySkillDialog = false;
  }

  onRowSkillSelect(event: any) {
    this.displaySkillDialog = true;
    const data = event.data;
    this.skillFormGroup.patchValue(data);
  }

  isEditMode() {
    const employeeIdFromUrl = this.route.snapshot.params.employeeId;
    if (employeeIdFromUrl) {
        return true;
    } else {
        return false;
    }
  }

}
