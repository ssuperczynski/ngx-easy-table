import { Component } from '@angular/core';
import { ConfigService } from './configuration.service';
import { data } from '@assets/data';
@Component({
  selector: 'app-checkboxes',
  templateUrl: './checkboxes.component.html',
  styleUrls: ['./checkboxes.component.css']
})
export class CheckboxesComponent {
  configuration;
  columns = [
    { key: 'name', title: '' },
    { key: 'name', title: 'Name' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'phone', title: 'Phone' },
  ];

  data = [];
  selected = new Set();

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  onChange(row) {
    const index = this.data.indexOf(row);
    this.selected.add(index);
    console.log(index, row);
  }
}
