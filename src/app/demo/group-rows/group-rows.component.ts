import { Component } from '@angular/core';
import { columns, Company, data } from '../../../assets/data';
import { Columns } from '../../ngx-easy-table/model/columns';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-group-rows',
  templateUrl: './group-rows.component.html',
  styleUrls: ['./group-rows.component.css'],
  providers: [ConfigService],
})
export class GroupRowsComponent {
  configuration;
  columns: Columns[] = [];
  data: Company[] = [];
  groupBy = 'age';

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
    this.columns = columns;
  }

  onChange(name): void {
    this.groupBy = name;
  }
}
