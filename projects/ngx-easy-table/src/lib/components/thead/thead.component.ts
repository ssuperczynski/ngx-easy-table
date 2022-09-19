import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostListener,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { Columns, Config, Event } from '../..';
import { StyleService } from '../../services/style.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[lib-thead]',
  templateUrl: './thead.component.html',
  styles: [
    `
        .cdk-drag-preview {
            text-align: left;
            padding-top: 9px;
            padding-left: 4px;
            color: #50596c;
            border: 1px solid #e7e9ed;
        }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [StyleService],
})
export class TableTHeadComponent {

  @Input()
  public config: Config;

  @Input()
  public columns: Columns[];

  @Input()
  public sortKey: string | null;

  @Input()
  public sortState: Map<string, string>;

  @Input()
  public selectAllTemplate;

  @Input()
  public filtersTemplate;

  @Input()
  public additionalActionsTemplate: TemplateRef<void>;

  @Output()
  public readonly filter = new EventEmitter<Array<{ key: string; value: string }>>();

  @Output()
  public readonly order = new EventEmitter<Columns>();

  @Output()
  public readonly selectAll = new EventEmitter<void>();

  @Output()
  public readonly event = new EventEmitter<{ event: string; value: any }>();

  public menuActive = false;

  public openedHeaderActionTemplate: string | null = null;

  public startOffset;

  public onSelectAllBinded = this.onSelectAll.bind(this);

  @ViewChild('th')
  private th: any;

  @ViewChildren('headerDropdown')
  private headerDropdown: any;

  @ViewChild('additionalActionMenu')
  private additionalActionMenu: any;

  public constructor(public readonly styleService: StyleService) {
  }

  public get arrowDefinition(): boolean {
    return this.config.showDetailsArrow || typeof this.config.showDetailsArrow === 'undefined';
  }

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement: any): void {
    if (
      this.additionalActionMenu &&
      !this.additionalActionMenu.nativeElement.contains(targetElement)
    ) {
      this.menuActive = false;
    }

    // if click outside the header then close opened Header Action Template
    if (
      this.openedHeaderActionTemplate &&
      // if no header have the clicked point
      !this.headerDropdown.toArray().some((ref) => ref.nativeElement.contains(targetElement))
    ) {
      this.openedHeaderActionTemplate = null;
    }
  }

  getColumnDefinition(column: Columns): boolean {
    return column.searchEnabled || typeof column.searchEnabled === 'undefined';
  }

  orderBy(column: Columns): void {
    this.order.emit(column);
  }

  isOrderEnabled(column: Columns): boolean {
    const columnOrderEnabled = column.orderEnabled === undefined ? true : column.orderEnabled;
    return this.config.orderEnabled && columnOrderEnabled;
  }

  columnDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
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

  onSelectAll(): void {
    this.selectAll.emit();
  }

  onMouseDown(event: MouseEvent, th: HTMLTableCellElement): void {
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

  onMouseMove(event: MouseEvent): void {
    if (!this.config.resizeColumn) {
      return;
    }
    if (this.th && this.th.style) {
      this.th.style.width = this.startOffset + event.pageX + 'px';
      this.th.style.cursor = 'col-resize';
      this.th.style['user-select'] = 'none';
    }
  }

  onMouseUp(event: MouseEvent): void {
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

  showHeaderActionTemplateMenu(column: Columns): void {
    if (!column.headerActionTemplate) {
      console.error('Column [headerActionTemplate] property not defined');
    }
    if (this.openedHeaderActionTemplate === column.key) {
      this.openedHeaderActionTemplate = null;
      return;
    }
    this.openedHeaderActionTemplate = column.key;
  }

  showMenu(): void {
    if (!this.additionalActionsTemplate) {
      console.error('[additionalActionsTemplate] property not defined');
    }
    this.menuActive = !this.menuActive;
  }
}
