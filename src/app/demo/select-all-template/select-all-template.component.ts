import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-select-all-template',
  templateUrl: './select-all-template.component.html',
  styleUrls: ['./select-all-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectAllTemplateComponent implements OnInit {
  public columns: Columns[] = [
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'phone', title: 'Phone' },
    { key: 'address.street', title: 'Street' },
  ];
  data: any[] = [];
  allSelected = false;
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = true;
    this.data = data.splice(1, 5);
  }

  tableEventEmitted(event: { event: string; value: any }): void {
    if (event.event === 'onSelectAll') {
      this.data.forEach((row: any) => (row.selected = event.value));
    }
  }

  rowSelected(): void {
    this.allSelected = this.data.every((row) => !!row.selected);
  }
}
