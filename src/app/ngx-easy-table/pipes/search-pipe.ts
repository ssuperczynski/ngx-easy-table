import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService } from '@core/ngx-easy-table/services/filters.service';

@Pipe({
  name: 'search',
})

export class SearchPipe implements PipeTransform {
  transform(value: any, filter?: { value: string, key: string }): any {
    if (typeof value === 'undefined') {
      return;
    }

    if (typeof filter === 'undefined' || Object.keys(filter).length === 0 || filter.value === '') {
      return value;
    }

    const split = filter.key.split('.');
    return value.filter((item) => {
      let element = '';
      const val = FiltersService.getPath(split, item);
      if (typeof val === 'object') {
        element = JSON.stringify(val);
      } else {
        element = val.toString().toLocaleLowerCase();
      }
      return element.indexOf(filter.value.toLocaleLowerCase()) !== -1;
    });
  }
}
