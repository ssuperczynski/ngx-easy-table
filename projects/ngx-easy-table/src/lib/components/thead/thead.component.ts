import { Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';
import { Columns, Config, Event } from '../..';
import { LoggingService } from '../../services/logging.service';
import { StyleService } from '../../services/style.service';

@Component({
  selector: '[table-thead]',
  templateUrl: './thead.component.html',
  providers: [
    StyleService,
    LoggingService,
  ],
})
export class TableTHeadComponent implements OnChanges {
  @Input() config: Config;
  @Input() columns: Columns[];
  @Input() sortKey;
  @Input() sortState;
  @Input() selectAllTemplate;
  @Input() filtersTemplate;
  @Output() readonly filter = new EventEmitter<Array<{ key: string; value: string }>>();
  @Output() readonly order = new EventEmitter<Columns>();
  @Output() readonly selectAll = new EventEmitter<void>();
  @ViewChild('th', { static: false }) private th;

  public menuActive = false;
  public startOffset;
  public onSelectAllBinded = this.onSelectAll.bind(this);

  constructor(
    private readonly logger: LoggingService,
    public readonly styleService: StyleService,
  ) {

  }

  ngOnChanges(): void {
    this.logger.setConfig(this.config);
  }

  getColumnDefinition(column: Columns): boolean {
    return column.searchEnabled || typeof column.searchEnabled === 'undefined';
  }

  orderBy(column: Columns): void {
    this.order.emit(column);
  }

  isOrderEnabled(column: Columns) {
    const columnOrderEnabled = column.orderEnabled === undefined ? true : !!column.orderEnabled;
    return this.config.orderEnabled && columnOrderEnabled;
  }

  onSearch($event: Array<{ key: string; value: string }>): void {
    this.filter.emit($event);
  }

  getColumnWidth(column: any): string | null {
    if (column.width) {
      return column.width;
    }
    return this.config.fixedColumnWidth ? 100 / this.columns.length + '%' : null;
  }

  onSelectAll() {
    this.selectAll.emit();
  }

  onMouseDown(event, th) {
    if (!this.config.resizeColumn) {
      return;
    }
    this.th = th;
    this.startOffset = th.offsetWidth - event.pageX;
    this.logger.emitEvent(Event.onColumnResizeMouseDown, event);
  }

  onMouseMove(event) {
    if (!this.config.resizeColumn) {
      return;
    }
    if (this.th && this.th.style) {
      this.th.style.width = this.startOffset + event.pageX + 'px';
      this.th.style.cursor = 'col-resize';
      this.th.style['user-select'] = 'none';
    }
  }

  onMouseUp(event) {
    if (!this.config.resizeColumn) {
      return;
    }

    this.logger.emitEvent(Event.onColumnResizeMouseUp, event);
    this.th.style.cursor = 'default';
    this.th = undefined;
  }
}
