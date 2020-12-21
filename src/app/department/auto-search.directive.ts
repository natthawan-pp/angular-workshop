import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appAutoSearch]'
})
export class AutoSearchDirective {
  @Output() autoSearch = new EventEmitter();
  constructor(private elementRef: ElementRef<any>) {
    const source = fromEvent(this.elementRef.nativeElement, 'input');
    const observable = source.pipe(debounceTime(500));
    observable.subscribe(event => {
      console.log('subscribe1', event);
      this.autoSearch.emit(event);
    });

  }

}
