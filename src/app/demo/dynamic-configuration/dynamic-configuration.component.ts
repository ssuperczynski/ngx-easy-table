import { ChangeDetectionStrategy, Component } from '@angular/core';
import { columns, Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-dynamic-configuration',
  templateUrl: './dynamic-configuration.component.html',
  styleUrls: ['./dynamic-configuration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  public configuration: Config;

  constructor() {
    this.configuration = { ...DefaultConfig };
    this.data = data;
    this.columns = columns;
  }

  toggle(key: string, isChecked: boolean): void {
    this.checked[key] = isChecked;
    this.configuration[key] = isChecked;
    this.configuration = { ...this.configuration };
  }
}
