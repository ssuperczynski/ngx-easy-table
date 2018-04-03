import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'table-header',
  template: `
    <label for="search_{{ column['key'] }}">
      <div class="input-group mb-3  pt-3">
        <span class="input-group-addon"><i _ngcontent-c3="" class="fa fa-search"></i></span>
        <input type="text"
               id="search_{{ column['key'] }}"
               aria-label="Zoek"
               placeholder="Zoek: {{ column['title'] }}"
               class="ngx-table__header-search ngx-form-input ngx-input-sm form-control"
               #input
               (input)="update.emit({value: input.value, key: column['key']})">
      </div>
    </label>`
})

export class HeaderComponent {
  @Input() column;
  @Output() update = new EventEmitter();
}
