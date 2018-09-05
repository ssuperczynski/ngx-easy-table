import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Columns } from '../../model/columns';

@Component({
  selector: 'table-header',
  template: `
    <label for="search_{{ column.key }}">
      <input type="text"
             id="search_{{ column.key }}"
             aria-label="Search"
             placeholder="{{ column.placeholder ? column.placeholder : column.title }}"
             class="ngx-table__header-search"
             #input
             (input)="update.emit({value: input.value, key: column.key})"
      >
    </label>`,
})

export class HeaderComponent {
  @Input() column: Columns;
  @Output() update = new EventEmitter();
}
