import { Pipe, PipeTransform } from '@angular/core';
import { Modifier } from '../model/modifier';

@Pipe({
  standalone: true,
  name: 'paginate',
})
export class PaginatePipe implements PipeTransform {
  transform(array: any[], pagination: Modifier['pagination']): any[] {
    const { currentPage, itemsPerPage } = pagination;
    if (!array.length) {
      return [];
    }

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return array.slice(startIndex, endIndex);
  }
}
