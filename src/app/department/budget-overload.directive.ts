import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import { Department } from './model/department';

@Directive({
  selector: '[appBudgetOverload]'
})
export class BudgetOverloadDirective implements OnInit {

  @Input() department: Department;
  constructor(private elementRef: ElementRef<HTMLElement>) { }

  ngOnInit(): void {
    if (this.department.budget > 100000) {
      // color: red;
      // font-weight: bold;
      // font-size: 20px;
      this.elementRef.nativeElement.style.setProperty('color', 'red');
      this.elementRef.nativeElement.style.setProperty('font-weight', 'bold');
      this.elementRef.nativeElement.style.setProperty('font-size', '20px');
    }
  }
}
