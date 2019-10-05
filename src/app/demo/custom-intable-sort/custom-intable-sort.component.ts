import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig, Event } from 'ngx-easy-table';

@Component({
  selector: 'app-custom-intable-sort',
  templateUrl: './custom-intable-sort.component.html',
  styleUrls: ['./custom-intable-sort.component.css'],
})
export class CustomIntableSortComponent implements OnInit {
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;
  levels = {
    '': 0,
    'Low': 1,
    'Medium': 2,
    'High': 3,
  };

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.orderEnabled = true;
    this.configuration.orderEventOnly = true;
    this.configuration.headerEnabled = true;
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name', orderEventOnly: true },
      { key: 'isActive', title: 'STATUS' },
      { key: 'level', title: 'Level', orderEventOnly: true },
    ];
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
    console.log('sortByLastName', this.data);
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
    console.log('sortByLevel', this.data);
  }

  eventEmitted($event: { event: string, value: any }): void {
    console.log('eventEmitted', $event);
    if ($event.event === Event.onOrder) {
      if ($event.value.key === 'level') {
        this.sortByLevel($event.value.order === 'asc');
      } else if ($event.value.key === 'name') {
        this.sortByLastName($event.value.order === 'asc');
      }
    }
  }
}
