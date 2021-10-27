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
import { PaginationControlsDirective } from 'ngx-pagination';

export interface PaginationRange {
  page: number;
  limit: number;
}

@Component({
  selector: 'pagination',
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent implements OnChanges {
  private currentPage = 1;
  @ViewChild('paginationDirective', { static: true })
  paginationDirective: PaginationControlsDirective;
  @ViewChild('paginationRange') paginationRange;
  @Input() pagination;
  @Input() config: Config;
  @Input() id;
  @Output() readonly updateRange: EventEmitter<PaginationRange> = new EventEmitter();
  public ranges: number[] = [5, 10, 25, 50, 100];
  public selectedLimit: number;
  public showRange = false;
  public screenReaderPaginationLabel = 'Pagination';
  public screenReaderPageLabel = 'page';
  public screenReaderCurrentLabel = 'You are on page';
  public previousLabel = '';
  public nextLabel = '';
  public directionLinks = true;

  private _rowCount: number;
  get rowCount(): number {
    return this._rowCount;
  }

  @Input()
  set rowCount(value: number) {
    this._rowCount = value;

    if (this._rowCount < (this.currentPage - 1) * this.selectedLimit) {
      this.currentPage = 1;
      this.updateRange.emit({
        page: this.currentPage,
        limit: this.selectedLimit,
      });
    }
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    if (this.paginationRange && !this.paginationRange.nativeElement.contains(targetElement)) {
      this.showRange = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { config } = changes;
    if (config && config.currentValue) {
      this.selectedLimit = this.config.rows;
    }
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.updateRange.emit({
      page,
      limit: this.selectedLimit,
    });
  }

  changeLimit(limit: number, callFromAPI: boolean): void {
    if (!callFromAPI) {
      this.showRange = !this.showRange;
    }
    this.selectedLimit = limit;
    this.currentPage = 1;
    this.updateRange.emit({
      page: this.currentPage,
      limit,
    });
  }
}
