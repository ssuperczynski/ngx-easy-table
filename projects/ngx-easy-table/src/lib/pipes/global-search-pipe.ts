import { Pipe, PipeTransform } from '@angular/core';
import { Subject } from 'rxjs';
import { Columns } from '../model/columns';

@Pipe({
  name: 'global',
})
export class GlobalSearchPipe implements PipeTransform {

  public transform(array: any[], filter: string, columns: Columns[], filteredCountSubject: Subject<number>): any {
    filteredCountSubject.next(0);
    if (typeof array === 'undefined') {
      return;
    }

    if (typeof filter === 'undefined' || filter === '') {
      filteredCountSubject.next(array.length);
      return array;
    }

    const predicate: (row: any) => boolean = (row: any) => columns.reduce(
      (acc: boolean, curr: Columns) =>
        acc ||
        curr?.searchPredicate?.(row) ||
        (['number', 'boolean', 'string'].includes(typeof row?.[curr.key]) && `${ row?.[curr.key] }`.includes(filter)),
      false
    );

    const arr = array.filter(predicate);
    filteredCountSubject.next(arr.length);

    return arr;
  }
}
