import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../app.component';

@Pipe({
  name: 'menuSearch',
})
export class MenuSearchPipe implements PipeTransform {
  transform(array: Link[], key: string): Link[] {
    if (!key || key === '') {
      return array;
    }

    return array.filter((item) => item.name.toLocaleLowerCase().includes(key.toLocaleLowerCase()));
  }
}
