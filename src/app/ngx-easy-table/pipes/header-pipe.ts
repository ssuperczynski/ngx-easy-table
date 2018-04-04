import { Pipe, PipeTransform } from '@angular/core';
import { ResourceService } from '../services/resource-service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  constructor(public resource: ResourceService) {
  }

  transform(value: Array<any>, filters: Array<any>) {
    console.log(filters);
    // If there is no value, just return
    if (!value) {
      return;
    }
    // If there are no filters, return a copy of the data
    if (!filters || (filters && filters.length === 0)) {
      return [ ...value ];
    }

    // Map the filters array and filter the data per array;
    return this.filterBy([ ...value ], filters);
  }

  filterBy(array, filters) {
    let filteredArray = [...array];
    for (const filter of filters) {
      filteredArray = filteredArray.filter(item => {
        switch (typeof item[ filter.key ]) {
          case 'string':
            return item[ filter.key ].toLowerCase().indexOf(filter.value.toLowerCase()) > -1;
          case 'object':
            // I have yet to find a usecase that has objects as a searchquery, but this case was in the original, so lets use it
            return JSON.stringify(item[ filter.key ]).indexOf(filter.value.toLowerCase()) > -1;
          case 'number':
          case 'boolean':
            return item[ filter.key ].toString().indexOf(filter.value.toString()) > -1;
          default:
            return false;
        }
      });
    }
    return filteredArray;
  }
}
