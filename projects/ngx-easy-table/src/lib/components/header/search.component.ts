import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from '@angular/core';
import { Columns } from '../..';
import * as Actions from '../../actions/table.actions';
import { Store } from '@ngrx/store';
import { selectModifiers } from '../../selectors/table.selector';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Modifier } from '../../model/modifier';

@Component({
  selector: 'table-search',
  templateUrl: './search.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class SearchComponent implements OnInit {
  @Input() column: Columns;

  private store = inject(Store);
  private unsubscribe = new Subject<void>();
  public modifiers: Modifier;

  ngOnInit(): void {
    this.store
      .select(selectModifiers)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((modifiers) => {
        this.modifiers = modifiers;
      });
  }

  unifyKey(key: string): string {
    return key.replace('.', '_');
  }

  onSearch(input: HTMLInputElement): void {
    const filter = [{ key: this.column.key, value: input.value }];
    this.store.dispatch(Actions.setFilters({ filter }));
  }
}
