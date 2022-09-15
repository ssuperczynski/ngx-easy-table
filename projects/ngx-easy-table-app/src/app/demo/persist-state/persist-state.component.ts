import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-persist-state',
  templateUrl: './persist-state.component.html',
  styleUrls: ['./persist-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersistStateComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  data: Company[] = [];

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.persistState = true;
    this.data = data;
  }
}
