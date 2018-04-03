import { PipeTransform } from '@angular/core';
import { ResourceService } from '../services/resource-service';
export declare class SearchPipe implements PipeTransform {
    resource: ResourceService;
    constructor(resource: ResourceService);
    transform(value: any, filters: any): any[];
}
