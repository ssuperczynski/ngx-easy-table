import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-custom-intable-sort',
  templateUrl: './custom-intable-sort.component.html',
  styleUrls: ['./custom-intable-sort.component.css'],
  providers: [ConfigService],
})
export class CustomIntableSortComponent {

  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name', orderEventOnly: true },
    { key: 'isActive', title: 'STATUS' },
    { key: 'level', title: 'Level', orderEventOnly: true },
  ];
  data: Company[] = [];
  configuration;
  levels;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
    this.levels = {
      low: 1,
      medium: 2,
      high: 3,
    };
  }

  sortByLastName(asc: boolean): void {
    /* tslint:disable-next-line */
    this.data = [...this.data.sort((a, b) => {
      const nameA = a.name.toLowerCase().split(' ')[1];
      const nameB = b.name.toLowerCase().split(' ')[1];
      if (nameA < nameB) {
        return asc ? -1 : 1;
      }
      if (nameA > nameB) {
        return asc ? 1 : -1;
      }
      return 0;
    })];
  }

  sortByLevel(asc: boolean): void {
    /* tslint:disable-next-line */
    this.data = [...this.data.sort((a, b) => {
      const levelA = this.levels[a.level.toLowerCase()];
      const levelB = this.levels[b.level.toLowerCase()];
      if (levelA < levelB) {
        return asc ? -1 : 1;
      }
      if (levelA > levelB) {
        return asc ? 1 : -1;
      }
      return 0;
    })];
  }

  eventEmitted($event) {
    if ($event.event === 'onOrder') {
      if ($event.value.key === 'level') {
        this.sortByLevel($event.value.order === 'asc');
      } else if ($event.value.key === 'name') {
        this.sortByLastName($event.value.order === 'asc');
      }
    }
  }
}
