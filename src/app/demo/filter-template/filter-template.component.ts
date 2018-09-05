import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-filter-template',
  templateUrl: './filter-template.component.html',
  styleUrls: ['./filter-template.component.css'],
  providers: [ConfigService],
})
export class FilterTemplateComponent {

  columns = [
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'phone', title: 'Phone' },
    { key: 'address.street', title: 'Street' },
  ];
  data: Company[] = [];
  rows: Company[] = [];
  ages: number[] = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
    this.rows = data;
    data.map((row) => row.age).forEach((age) => {
      if (this.ages.indexOf(age) === -1) {
        this.ages.push(age);
      }
    });
    this.ages.sort();
  }

  eventEmitted($event) {
    console.log('$event', $event);
  }

  onAgeSearch(value): void {
    if (value === '') {
      this.rows = this.data;
    } else {
      this.rows = this.data.filter((_) => _.age.toString() === value);
    }
  }

  onCompanySearch(value): void {
    this.rows = this.data.filter((_) => _.company.toLowerCase().indexOf(value) > -1);
  }

}
