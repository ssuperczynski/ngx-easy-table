import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-row-template',
  templateUrl: './row-template.component.html',
  styleUrls: ['./row-template.component.css'],
  providers: [ConfigService],
})
export class RowTemplateComponent {
  @ViewChild('detailsTemplate') detailsTemplateRef: TemplateRef<any>;
  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data: Company[] = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  eventEmitted($event) {
    console.log('$event', $event);
  }

}
