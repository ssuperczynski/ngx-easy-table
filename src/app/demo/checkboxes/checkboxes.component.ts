import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxesComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[];
  public data: Company[] = [];
  public selected = new Set();

  ngOnInit(): void {
    this.columns = [
      { key: '', title: '', searchEnabled: false },
      { key: 'name', title: 'Name' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Supervisor' },
      { key: 'phone', title: 'Phone' },
    ];
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }

  onChange(row: any): void {
    const index = this.data.indexOf(row);
    this.selected.add(index);
  }
}
