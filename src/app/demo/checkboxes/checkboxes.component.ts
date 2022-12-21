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
      { key: '', title: '', searchEnabled: false, width: '5%' },
      { key: 'name', title: 'Name', width: '25%' },
      { key: 'company', title: 'Company', width: '20%' },
      { key: 'name', title: 'Supervisor', width: '20%' },
      { key: 'phone', title: 'Phone', width: '20%' },
      { key: 'age', title: 'Age', width: '10%' },
    ];
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }

  onChange(row: any): void {
    const index = this.data.indexOf(row);
    if (this.selected.has(index)) {
      this.selected.delete(index);
    } else {
      this.selected.add(index);
    }
  }
}
