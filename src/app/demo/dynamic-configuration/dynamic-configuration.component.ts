import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { columns, Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-dynamic-configuration',
  templateUrl: './dynamic-configuration.component.html',
  styleUrls: ['./dynamic-configuration.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicConfigurationComponent implements OnInit {
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

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.data = data;
    this.columns = columns;
  }

  toggle(key: string, event: Event): void {
    const isChecked = (event.currentTarget as HTMLInputElement).checked;
    this.checked[key] = isChecked;
    this.configuration[key] = isChecked;
    this.configuration = { ...this.configuration };
  }
}
