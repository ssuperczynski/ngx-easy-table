import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService } from '../services/filters.service';
import { Config } from '..';
import { Subject } from 'rxjs';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  private filters: { [key: string]: string } = {};

  transform(
    array: any[],
    filter: Array<{ value: string; key: string }>,
    filteredCountSubject: Subject<number>,
    config?: Config
  ): any {
    filteredCountSubject.next(0);
    if (typeof array === 'undefined') {
      return;
    }
    if (typeof filter === 'undefined') {
      filteredCountSubject.next(array.length);
      return array;
    }
    filter.forEach((f) => {
      this.filters[f.key] = f.value.toString().toLocaleLowerCase();
      if (Object.keys(f).length === 0 || f.value === '') {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete this.filters[f.key];
      }
    });
    if (config && config.groupRows) {
      return array.map((arr) => this.filterGroup(arr, filteredCountSubject));
    }
    return this.filterGroup(array, filteredCountSubject);
  }

  private filterGroup(array: any[], filteredCountSubject: Subject<number>): any[] {
    const arr = array.filter((obj) => {
      return Object.keys(this.filters).every((c) => {
        const split = c.split('.');
        const val = FiltersService.getPath(split, obj);
        const element =
          typeof val === 'object' ? JSON.stringify(val) : val.toString().toLocaleLowerCase();
        const strings = this.filters[c].split(',');
        return strings.some((s) => element.indexOf(s.trim()) > -1);
      });
    });
    filteredCountSubject.next(arr.length);
    return arr;
  }
}
