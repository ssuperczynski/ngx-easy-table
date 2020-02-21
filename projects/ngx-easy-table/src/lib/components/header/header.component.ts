import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Columns } from '../..';

@Component({
  selector: 'table-header',
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent {
  @Input() column: Columns;
  @Output() readonly update = new EventEmitter<Array<{ key: string; value: string }>>();

  unifyKey(key: string): string {
    return key.replace('.', '_');
  }

  onSearch(input: HTMLInputElement): void {
    this.update.emit([
      { value: input.value, key: this.column.key },
    ]);
  }
}
