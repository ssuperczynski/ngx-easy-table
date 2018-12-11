import {
  ChangeDetectionStrategy, Component, EventEmitter, Input, Output,
} from '@angular/core';
import { Config } from '../..';
import { ConfigService } from '../../services/config-service';

export interface PaginationObject {
  page: number;
  limit: number;
}

@Component({
  selector: 'pagination',
  templateUrl: './pagination.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PaginationComponent {
  @Input() pagination;
  @Input() config: Config;
  @Input() id;
  @Output() readonly updateRange: EventEmitter<PaginationObject> = new EventEmitter();
  public ranges = [5, 10, 25, 50, 100];
  public limit: number = ConfigService.config.rows;
  public showRange = false;

  onPageChange(page: number): void {
    this.updateRange.emit({
      page,
      limit: this.limit,
    });
  }

  changeLimit(limit: number): void {
    this.showRange = !this.showRange;
    this.limit = limit;
    this.updateRange.emit({
      page: 1,
      limit,
    });
  }
}
