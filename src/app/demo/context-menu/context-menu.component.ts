import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { CompanyService } from '../../services/company.service';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  providers: [ConfigService, CompanyService],
})
export class ContextMenuComponent {
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

  copyRow($event: any) {
    // copy
  }
}
