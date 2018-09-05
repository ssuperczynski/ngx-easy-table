import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-click-event',
  templateUrl: './click-event.component.html',
  providers: [ConfigService],
  styleUrls: ['./click-event.component.css'],
})
export class ClickEventComponent {

  columns = [
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

  eventEmitted($event) {
    this.clicked = JSON.stringify($event, null, 2);
    console.log('$event', $event);
  }
}
