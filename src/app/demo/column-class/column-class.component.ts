import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-column-class',
  templateUrl: './column-class.component.html',
  styleUrls: ['./column-class.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnClassComponent implements OnInit {
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.data = data;
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company', cssClass: { name: 'blue' } },
      { key: 'level', title: 'Level', cssClass: { name: 'pink' } },
      { key: 'address.number', title: 'Number' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
  }
}
