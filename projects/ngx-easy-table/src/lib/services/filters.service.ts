import { Injectable } from '@angular/core';

@Injectable()
export class FiltersService {
  static getPath(p: string[], o: any): any {
    // https://github.com/dherges/ng-packagr/issues/696
    /* eslint-disable-next-line */
    const result = p.reduce((xs, x) => (xs && typeof xs[x] !== 'undefined' ? xs[x] : null), o);
    return result;
  }
}
