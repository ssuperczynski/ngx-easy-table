import { Pipe, PipeTransform } from '@angular/core';
import { FiltersService } from '../services/filters.service';

@Pipe({
  name: 'render',
})
export class RenderPipe implements PipeTransform {
  transform(row: any, key: string): string {
    const split = key.split('.');

    return FiltersService.getPath(split, row);
  }
}
