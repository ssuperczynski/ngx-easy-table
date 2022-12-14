import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { API, APIDefinition } from 'ngx-easy-table';

@Component({
  selector: 'app-nested-table',
  templateUrl: './nested-table.component.html',
  styleUrls: ['./nested-table.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NestedTableComponent implements OnInit {
  @ViewChild('table', { static: false }) table: APIDefinition;
  public toggledRows = new Set<number>();
  public columns: Columns[] = [
    { key: 'name', title: 'Name', width: '15%' },
    { key: 'age', title: 'Age', width: '15%' },
    { key: 'company', title: 'Company', width: '15%' },
    { key: 'name', title: 'Name', width: '15%' },
    { key: 'phone', title: 'Phone', width: '15%' },
    { key: 'address.street', title: 'Address', width: '15%' },
    { key: '', title: 'Action', width: '5%' },
  ];
  public data: Company[] = [];
  public configuration: Config;

  public nestedData: Company[] = [];
  public nestedConfiguration;
  public nestedColumns: Columns[] = [
    { key: 'name', title: 'Name', width: '15%' },
    { key: 'age', title: 'Age', width: '15%' },
    { key: 'company', title: 'Company', width: '15%' },
    { key: 'name', title: 'Name', width: '15%' },
    { key: 'phone', title: 'Phone', width: '15%' },
    { key: 'address.street', title: 'Address', width: '15%' },
  ];

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.detailsTemplate = true;
    this.configuration.tableLayout.hover = true;
    this.data = data;

    this.nestedConfiguration = { ...DefaultConfig };
    this.nestedConfiguration.detailsTemplate = true;
    this.nestedConfiguration.rows = 5;
    this.nestedData = data;
  }

  onRowClickEvent($event: MouseEvent, index: number): void {
    $event.preventDefault();
    this.table.apiEvent({
      type: API.toggleRowIndex,
      value: index,
    });
    if (this.toggledRows.has(index)) {
      this.toggledRows.delete(index);
    } else {
      this.toggledRows.add(index);
    }
  }
}
