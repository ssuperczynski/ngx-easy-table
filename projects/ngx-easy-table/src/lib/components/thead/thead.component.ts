import { Component, EventEmitter, HostListener, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { Columns, Config, Event } from '../..';
import { StyleService } from '../../services/style.service';

@Component({
  selector: '[table-thead]',
  templateUrl: './thead.component.html',
  providers: [StyleService],
})
export class TableTHeadComponent {
  public menuActive = false;
  public startOffset;
  public onSelectAllBinded = this.onSelectAll.bind(this);

  @Input() config: Config;
  @Input() columns: Columns[];
  @Input() sortKey;
  @Input() sortState;
  @Input() selectAllTemplate;
  @Input() filtersTemplate;
  @Input() additionalActionsTemplate: TemplateRef<void>;
  @Output() readonly filter = new EventEmitter<Array<{ key: string; value: string }>>();
  @Output() readonly order = new EventEmitter<Columns>();
  @Output() readonly selectAll = new EventEmitter<void>();
  @Output() readonly event = new EventEmitter<{ event: string, value: any }>();
  @ViewChild('th', { static: false }) private th;
  @ViewChild('additionalActionMenu', { static: false }) additionalActionMenu;
  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (this.additionalActionMenu && !this.additionalActionMenu.nativeElement.contains(targetElement)) {
      this.menuActive = false;
    }
  }

  constructor(
    public readonly styleService: StyleService,
  ) {

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
    this.event.emit({
      event: Event.onColumnResizeMouseDown,
      value: event,
    });
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
    this.event.emit({
      event: Event.onColumnResizeMouseUp,
      value: event,
    });
    this.th.style.cursor = 'default';
    this.th = undefined;
  }

  showMenu() {
    if (!this.additionalActionsTemplate) {
      console.error('[additionalActionsTemplate] property not defined');
    }
    this.menuActive = !this.menuActive;
  }
}
