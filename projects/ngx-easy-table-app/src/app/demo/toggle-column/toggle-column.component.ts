import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-toggle-column',
  templateUrl: './toggle-column.component.html',
  styleUrls: ['./toggle-column.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleColumnComponent implements OnInit {
  columns: Columns[] = [];
  columnsCopy: Columns[] = [];
  data: Company[] = [];
  checked = new Set(['phone', 'age', 'company', 'name', 'isActive']);
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.data = data;
    this.columnsCopy = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'Active' },
    ];
    this.columns = this.columnsCopy;
  }

  toggle(name: string): void {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.checked.has(name) ? this.checked.delete(name) : this.checked.add(name);
    this.columns = this.columnsCopy.filter((column) => this.checked.has(column.key));
  }
}
