import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Columns, Config, Event } from '../..';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDropList,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import { SearchComponent } from '../header/search.component';
import { CdkMenu, CdkMenuItem, CdkMenuTrigger } from '@angular/cdk/menu';
import { Store } from '@ngrx/store';
import * as Actions from '../../actions/table.actions';

@Component({
  selector: '[table-thead]',
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgTemplateOutlet,
    SearchComponent,
    NgStyle,
    NgClass,
    NgIf,
    NgFor,
    CdkDrag,
    CdkDragHandle,
    CdkDropList,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItem,
  ],
})
export class TableTHeadComponent {
  public startOffset;
  public onSelectAllBinded = this.onSelectAll.bind(this);

  private store = inject(Store);

  @Input() config: Config;
  @Input() columns: Columns[];
  @Input() headerActionTemplates: { [key: string]: TemplateRef<any> } = {};
  @Input() selectAllTemplate;
  @Input() filtersTemplate;
  @Input() additionalActionsTemplate: TemplateRef<void>;
  @Output() readonly selectAll = new EventEmitter<void>();
  @Output() readonly event = new EventEmitter<{ event: string; value: any }>();
  @ViewChild('th') private th;

  orderBy(col: Columns): void {
    const column = { key: col.key, orderBy: col.orderBy, orderEnabled: col.orderEnabled };
    this.store.dispatch(Actions.setOrder({ column }));
  }

  isOrderEnabled(column: Columns): boolean {
    return this.config.orderEnabled && (column.orderEnabled ?? true);
  }

  columnDrop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
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
}
