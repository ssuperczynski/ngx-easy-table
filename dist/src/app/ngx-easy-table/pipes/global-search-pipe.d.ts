import { PipeTransform } from '@angular/core';
import { ResourceService } from '../services/resource-service';
export declare class GlobalSearchPipe implements PipeTransform {
    resource: ResourceService;
    constructor(resource: ResourceService);
    transform(dataArr: any, filter: any): any;
}
