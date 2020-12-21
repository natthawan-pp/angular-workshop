import { Directive, ElementRef, Output, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceButton]'
})
export class DebounceButtonDirective {
  @Output() debounceClick = new EventEmitter();

  constructor(private elementRef: ElementRef<any>) {
    console.log('ทดสอบ DebounceButtonDirective', this.elementRef.nativeElement);
    const observable = fromEvent(this.elementRef.nativeElement, 'click').pipe(debounceTime(500));
    observable.subscribe(event => {
      this.debounceClick.emit(event);
    });
  }

}
