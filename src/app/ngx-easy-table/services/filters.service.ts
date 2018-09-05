import { Injectable } from '@angular/core';

@Injectable()
export class FiltersService {
  static getPath(p, o) {
    // https://github.com/dherges/ng-packagr/issues/696
    /* tslint:disable-next-line */
    const result = p.reduce((xs, x) => (xs && typeof xs[x] !== 'undefined') ? xs[x] : null, o);
    return result;
  }
}
