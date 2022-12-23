import { Component } from '@angular/core';
import { data } from '../../../assets/data';
import { DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-sticky',
  templateUrl: './sticky.component.html',
  styleUrls: ['./sticky.component.css'],
})
export class StickyComponent {
  configuration = {
    ...DefaultConfig,
    rows: 100,
  };
  columns = [
    { key: 'level', title: 'Level' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data = data;
}
