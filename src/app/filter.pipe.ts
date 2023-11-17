import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args: any, property:any): any {
    return value? value.filter((e:any)=>e[property].toLowerCase().includes(args.toLowerCase())):[];
  }

}
