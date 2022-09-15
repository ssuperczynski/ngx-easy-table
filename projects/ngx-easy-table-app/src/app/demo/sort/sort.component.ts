import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortComponent implements OnInit {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age', orderBy: 'desc' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data: Company[] = [];
  configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.orderEnabled = true;
    this.configuration.threeWaySort = true;
    this.data = data;
  }
}
