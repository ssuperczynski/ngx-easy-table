import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { flatMap, groupBy, reduce } from 'rxjs/operators';

@Injectable()
export class GroupRowsService {
  public static doGroupRows(data, groupRowsBy) {
    const grouped = [];
    from(data).pipe(
      groupBy((row) => row[groupRowsBy]),
      flatMap((group) => group.pipe(
        reduce((acc: object[], curr) => [...acc, curr], []),
      )),
    ).subscribe((row) => grouped.push(row));

    return grouped;
  }
}