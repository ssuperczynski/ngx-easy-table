import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService } from '@core/ngx-easy-table/services/filters.service';

@Pipe({
  name: 'render',
})

export class RenderPipe implements PipeTransform {
  transform(row: any, key: string) {
    const split = key.split('.');

    return FiltersService.getPath(split, row);
  }
}
