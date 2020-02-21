import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-nested-object',
  templateUrl: './nested-object.component.html',
  styleUrls: ['./nested-object.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedObjectComponent implements OnInit {
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = {...DefaultConfig};
    this.configuration.searchEnabled = false;
    this.configuration.checkboxes = false;
    this.data = data;
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'address.number', title: 'Number' },
      { key: 'address.street', title: 'Street' },
    ];
  }
}
