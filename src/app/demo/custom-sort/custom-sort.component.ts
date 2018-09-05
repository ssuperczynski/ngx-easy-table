import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

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
  data: Company[] = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  ngOnInit() {
    this.sortByAge();
  }

  sortByNameAsc(): void {
    /* tslint:disable-next-line */
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
    /* tslint:disable-next-line */
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
    /* tslint:disable-next-line */
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
