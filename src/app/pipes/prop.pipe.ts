import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prop'
})
export class PropPipe implements PipeTransform {

  transform(values: any[], filter?: Object): any {
    return values.filter(val => {
      let accept = true;
      for (let key in filter) {

        if (val[key] != filter[key]) {
          accept = false;
        }
      }
      return accept;
    });

  }

}
