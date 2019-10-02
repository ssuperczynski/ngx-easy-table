import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';
import { Columns } from 'ngx-easy-table';

@Component({
  selector: 'app-click-event',
  templateUrl: './click-event.component.html',
  providers: [ConfigService],
  styleUrls: ['./click-event.component.css'],
})
export class ClickEventComponent {

  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  clicked;
  data: Company[] = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  eventEmitted($event: { event: string, value: any }): void {
    this.clicked = JSON.stringify($event, null, 2);
    // tslint:disable-next-line:no-console
    console.log('$event', $event);
  }
}
