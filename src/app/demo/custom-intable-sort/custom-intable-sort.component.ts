import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Event } from 'ngx-easy-table';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-custom-intable-sort',
  templateUrl: './custom-intable-sort.component.html',
  styleUrls: ['./custom-intable-sort.component.css'],
  providers: [ConfigService],
})
export class CustomIntableSortComponent {

  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name', orderEventOnly: true },
    { key: 'isActive', title: 'STATUS' },
    { key: 'level', title: 'Level', orderEventOnly: true },
  ];
  data: Company[] = [];
  configuration;
  levels = {
    '': 0,
    'Low': 1,
    'Medium': 2,
    'High': 3,
  };

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  sortByLastName(asc: boolean): void {
    this.data = [...this.data.sort((a, b) => {
      const nameA = a.name.toLowerCase().split(' ')[1];
      const nameB = b.name.toLowerCase().split(' ')[1];
      if (asc) {
        return nameA.localeCompare(nameB);
      }
      return nameB.localeCompare(nameA);
    })];
  }

  sortByLevel(asc: boolean): void {
    this.data = [...this.data.sort((a, b) => {
      const levelA = this.levels[a.level];
      const levelB = this.levels[b.level];
      if (levelA < levelB) {
        return asc ? -1 : 1;
      }
      if (levelA > levelB) {
        return asc ? 1 : -1;
      }
      return 0;
    })];
  }

  eventEmitted($event: { event: string, value: any }): void {
    if ($event.event === Event.onOrder) {
      if ($event.value.key === 'level') {
        this.sortByLevel($event.value.order === 'asc');
      } else if ($event.value.key === 'name') {
        this.sortByLastName($event.value.order === 'asc');
      }
    }
  }
}
