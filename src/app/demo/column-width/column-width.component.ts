import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-column-width',
  templateUrl: './column-width.component.html',
  styleUrls: ['./column-width.component.css'],
})
export class ColumnWidthComponent {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone', placeholder: 'Search', width: '15%' },
    { key: 'age', title: 'Age', placeholder: 'Søg', width: '10%' },
    { key: 'company', title: 'Company', placeholder: 'Pesquisa', width: '15%' },
    { key: 'name', title: 'Name', placeholder: 'поиск', width: '15%' },
    { key: 'isActive', title: 'STATUS', placeholder: 'Suche', width: '15%' },
  ];
  data: Company[] = [];
  public configuration: Config;

  constructor() {
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }
}
