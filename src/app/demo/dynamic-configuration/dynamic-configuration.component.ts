import { Component } from '@angular/core';
import { columns, Company, data } from '../../../assets/data';
import { Columns } from 'ngx-easy-table';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-dynamic-configuration',
  templateUrl: './dynamic-configuration.component.html',
  styleUrls: ['./dynamic-configuration.component.css'],
})
export class DynamicConfigurationComponent {
  columns: Columns[] = [];
  data: Company[] = [];
  checked = {
    paginationEnabled: true,
    headerEnabled: true,
    searchEnabled: true,
    collapseAllRows: false,
    isLoading: false,
    checkboxes: false,
    draggable: false,
    fixedColumnWidth: false,
    logger: false,
  };
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
    this.columns = columns;
  }

  toggle(key: string, isChecked: boolean): void {
    this.checked[key] = isChecked;
    this.configuration[key] = isChecked;
    this.configuration = { ...this.configuration };
  }
}
