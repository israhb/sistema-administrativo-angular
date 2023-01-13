import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformData'
})
export class TransformDataPipe implements PipeTransform {
  transform(value: any, data: any[]): any {
    data.forEach(element => {
      if (element.id === value) {
        value = element.name;
      }
    });
    return value;
  }
}
