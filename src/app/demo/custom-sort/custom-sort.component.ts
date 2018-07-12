import { Component, OnInit } from '@angular/core';
import { ConfigService } from './configuration.service';
import { data } from '@assets/data';

@Component({
  selector: 'app-custom-sort',
  templateUrl: './custom-sort.component.html',
  styleUrls: ['./custom-sort.component.css'],
  providers: [ConfigService],
})
export class CustomSortComponent implements OnInit {

  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  ngOnInit() {
    this.sortByAge();
  }

  sortByNameAsc(): void {
    this.data = [...this.data.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    })];
  }

  sortByNameDesc(): void {
    this.data = [...this.data.sort((a, b) => {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();
      if (nameB < nameA) {
        return -1;
      }
      if (nameB > nameA) {
        return 1;
      }
      return 0;
    })];
  }

  sortByAge(): void {
    this.data = [...this.data.sort((a, b) => {
      const ageA = a.age;
      const ageB = b.age;
      if (ageB < ageA) {
        return -1;
      }
      if (ageB > ageA) {
        return 1;
      }
      return 0;
    })];
  }

}
