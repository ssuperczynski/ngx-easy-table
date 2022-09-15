import { Injectable } from '@angular/core';

@Injectable()
export class FiltersService {

  public static getPath(p: string[], o: any): any {
    // https://github.com/dherges/ng-packagr/issues/696
    /* eslint-disable-next-line */
    return p.reduce((xs: string, x: string) => (xs && typeof xs[x] !== 'undefined' ? xs[x] : null), o);
  }
}
