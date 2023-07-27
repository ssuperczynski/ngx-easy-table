import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Config } from '../..';
import {PaginationControlsDirective} from "../../features/pagination";

export interface PaginationRange {

  page: number;

  limit: number;
}

@Component({
  selector: 'lib-pagination',
  templateUrl: './pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {

  @Input()
  public pagination;

  @Input()
  public config: Config;

  @Input()
  public id;

  @Output()
  public readonly updateRange: EventEmitter<PaginationRange> = new EventEmitter();

  @ViewChild('paginationDirective', {static: true})
  public paginationDirective: PaginationControlsDirective;

  @ViewChild('paginationRange')
  public paginationRange: { nativeElement: { contains: (arg0: any) => any; }; };

  public ranges: number[] = [5, 10, 25, 50, 100];

  public selectedLimit: number;

  public showRange = false;

  public screenReaderPaginationLabel = 'Pagination';

  public screenReaderPageLabel = 'page';

  public screenReaderCurrentLabel = 'You are on page';

  public previousLabel = '';

  public nextLabel = '';

  public directionLinks = true;

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    if (this.paginationRange && !this.paginationRange.nativeElement.contains(targetElement)) {
      this.showRange = false;
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const {config} = changes;
    if (config && config.currentValue) {
      this.selectedLimit = this.config.rows;
    }
  }

  public onPageChange(page: number): void {
    this.updateRange.emit({
      page,
      limit: this.selectedLimit,
    });
  }

  public changeLimit(limit: number, callFromAPI: boolean): void {
    if (!callFromAPI) {
      this.showRange = !this.showRange;
    }
    this.selectedLimit = limit;
    this.updateRange.emit({
      page: 1,
      limit,
    });
  }
}
