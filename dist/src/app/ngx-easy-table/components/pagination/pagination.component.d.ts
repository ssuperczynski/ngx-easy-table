import { EventEmitter, OnInit } from '@angular/core';
import { Config } from '../../model/config';
export declare class PaginationComponent implements OnInit {
    pagination: any;
    id: any;
    updateRange: EventEmitter<{}>;
    config: Config;
    ranges: number[];
    limit: number;
    showRange: boolean;
    onPageChange($event: any): void;
    changeLimit(limit: any): void;
    ngOnInit(): void;
}
