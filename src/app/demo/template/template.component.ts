import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { API, APIDefinition } from 'ngx-easy-table';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateComponent implements OnInit {
  @ViewChild('table', { static: false }) table: APIDefinition;
  public columns: Columns[] = [
    { key: 'name', title: 'Name', width: '15%', orderEnabled: true, searchEnabled: true },
    { key: 'age', title: 'Age', width: '15%', orderEnabled: true, searchEnabled: false },
    { key: 'company', title: 'Company', width: '15%', orderEnabled: true },
    { key: 'name', title: 'Name', width: '15%', orderEnabled: false },
    { key: 'phone', title: 'Phone', width: '15%', orderEnabled: false },
    { key: 'address.street', title: 'Address', width: '15%', orderEnabled: true },
    { key: '', title: 'Action', width: '5%', orderEnabled: false, searchEnabled: false },
  ];
  public data: Company[] = [];
  public configuration: Config;
  public toggledRows = new Set<number>();

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.detailsTemplate = true;
    this.configuration.showDetailsArrow = false;
    this.data = data;
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
