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
  @ViewChild('paginationDirective', { static: true }) paginationDirective: PaginationControlsDirective;
  @ViewChild('paginationRange', { static: false }) paginationRange;
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

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    const clickedInside = this.paginationRange.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.showRange = false;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    const { config } = changes;
    if (config && config.currentValue) {
      this.selectedLimit = this.config.rows;
    }
  }

  onPageChange(page: number): void {
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
    this.updateRange.emit({
      page: 1,
      limit,
    });
  }
}
