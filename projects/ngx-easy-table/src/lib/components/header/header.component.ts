import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Columns } from '../..';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  @Input()
  public column: Columns;

  @Output()
  public readonly update = new EventEmitter<Array<{ key: string; value: string }>>();

  public unifyKey(key: string): string {
    return key.replace('.', '_');
  }

  public onSearch(input: HTMLInputElement): void {
    this.update.emit([{value: input.value, key: this.column.key}]);
  }
}
