import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  translateMap = {Active: 'ใช้งาน', Deactive: 'ยกเลิก'};
  transform(value: any, args?: any): any {
    return this.translateMap[value];
  }

}
