import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prop'
})
export class PropPipe implements PipeTransform {

  transform(arr: any[], filter: Object): any {
    return arr.filter(item => {
      let accept = true;
      for (let key in filter) {
        if (item[key] != filter[key]) {
          accept = false;
        }
      };
      return accept;
    });
  }

}
