import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {
  // statusMapper = {Y: 'Active', N: 'Deactive'};
  // statusThaiMapper = {Y: 'ใช้งาน', N: 'ยกเลิก'};
  statusMapper = {Y: {EN: 'Active', TH: 'ใช้งาน'},
  N: {EN: 'Deactive', TH: 'ยกเลิก'}};
  transform(value: string, lang?: 'TH'|'EN'): any {
    if (value) {
      if (lang && lang === 'TH') {
          return this.statusMapper[value] ? this.statusMapper[value].TH : null;
      }
      return this.statusMapper[value] ? this.statusMapper[value].EN : null;
    }
    return null;
  }

}
