import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-column-width',
  templateUrl: './column-width.component.html',
  styleUrls: ['./column-width.component.css'],
  providers: [ConfigService],
})
export class ColumnWidthComponent {
  columns = [
    { key: 'phone', title: 'Phone', placeholder: 'Search', width: '15%' },
    { key: 'age', title: 'Age', placeholder: 'Søg', width: '10%' },
    { key: 'company', title: 'Company', placeholder: 'Pesquisa', width: '15%' },
    { key: 'name', title: 'Name', placeholder: 'поиск', width: '15%' },
    { key: 'isActive', title: 'STATUS', placeholder: 'Suche', width: '15%' },
  ];
  data: Company[] = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }
}
