import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormField, FieldTypes } from '../types';
@Pipe({
  name: 'type'
})
export class TypePipe implements PipeTransform {

  transform(value: any, type?: FieldTypes): any {
    if (!type) type = FieldTypes.String;
    switch (type) {
      case FieldTypes.String: return value ? value.toString() : '';
      case FieldTypes.Date: return value ? this.datePipe.transform(value, 'yyyy-MM-dd hh:mm:ss') : '';
      case FieldTypes.Money: if (typeof value == 'string') value = parseFloat(value); return value.toFixed(2);
      case FieldTypes.CheckBox: return !!value;
    }
    return value;
  }

  constructor(public datePipe: DatePipe) { }

}
