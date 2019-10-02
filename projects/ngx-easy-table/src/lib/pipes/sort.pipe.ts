import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService } from '../services/filters.service';
import { Config } from '..';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  private defaultArray: any[] = [];

  private static isNaN(aV: any, bV: any): boolean {
    return (isNaN(parseFloat(aV)) || !isFinite(aV)) || (isNaN(parseFloat(bV)) || !isFinite(bV));
  }

  private static compare(a: any[], b: any[], key: string): number {
    const split = key.split('.');
    const aPath = FiltersService.getPath(split, a);
    const bPath = FiltersService.getPath(split, b);
    const aValue = (aPath + '').toLowerCase();
    const bValue = (bPath + '').toLowerCase();
    if (SortPipe.isNaN(aPath, bPath)) {
      return aValue.localeCompare(bValue);
    } else {
      if (parseFloat(aPath) < parseFloat(bPath)) {
        return -1;
      }
      if (parseFloat(aPath) > parseFloat(bPath)) {
        return 1;
      }
    }

    return 0;
  }

  transform(array: any[], filter: { order: string, key: string }, config?: Config): any[] {
    if (this.defaultArray.length === 0) {
      this.defaultArray = array;
    }
    if (!filter.key || filter.key === '') {
      return array;
    }
    if (filter.order === '') {
      return this.defaultArray;
    }
    if (filter.order === 'asc') {
      return this.sortAsc(config, array, filter);
    } else {
      return this.sortDesc(config, array, filter);
    }
  }

  private sortAsc(config: Config, array: any[], filter: { order: string, key: string }): any[] {
    if (config && config.groupRows) {
      return array.map((arr) => arr.sort((a, b) => SortPipe.compare(a, b, filter.key)));
    }
    return array.sort((a, b) => SortPipe.compare(a, b, filter.key));
  }

  private sortDesc(config: Config, array: any[], filter: { order: string, key: string }): any[] {
    if (config && config.groupRows) {
      return array.map((arr) => arr.sort((a, b) => SortPipe.compare(b, a, filter.key)));
    }
    return array.sort((a, b) => SortPipe.compare(b, a, filter.key));
  }
}
