import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { CompanyService } from '../../services/company.service';
import { ConfigService } from './configuration.service';
import { Subject } from 'rxjs';
import { API, ApiType } from '../../../../projects/ngx-easy-table/src/lib/model/api';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  providers: [ConfigService, CompanyService],
})
export class ContextMenuComponent {
  public columns = [
    { key: 'phone', title: 'Phone', width: '15%' },
    { key: 'age', title: 'Age', width: '10%' },
    { key: 'company', title: 'Company', width: '15%' },
    { key: 'name', title: 'Name', width: '15%' },
    { key: 'isActive', title: 'STATUS', width: '15%' },
  ];
  public data: Company[] = [];
  public configuration;
  public api = new Subject<ApiType>();

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  copyRow($event: any = null) {
    this.api.next({ type: API.rowContextMenuClicked });
  }
}
