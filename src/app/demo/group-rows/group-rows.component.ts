import { Component, OnInit } from '@angular/core';
import * as faker from 'faker';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-group-rows',
  templateUrl: './group-rows.component.html',
  styleUrls: ['./group-rows.component.css'],
  providers: [ConfigService],
})
export class GroupRowsComponent {
  configuration;
  toggleRowIndex;
  amountSummary = 0;
  debitSummary = 0;
  columns = [];
  data = [];
  groupBy = 'isActive';

  constructor() {
    this.configuration = ConfigService.config;
    this.data = GroupRowsComponent.generateData();
    this.columns = [
      { key: 'amount', title: 'Amount' },
      { key: 'debit', title: 'Debit' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'Active' },
    ];
    this.amountSummary = this.data.map((_) => _.amount).reduce((acc, cur) => cur + acc, 0);
    this.debitSummary = this.data.map((_) => _.debit).reduce((acc, cur) => cur + acc, 0);
  }

  private static generateData() {
    return Array(31).fill('').map((val, key) => ({
      amount: faker.random.number(300),
      debit: 300,
      company: faker.company.companyName(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      isActive: key % 2 === 1,
    }));
  }

  onChange(name): void {
    this.groupBy = name;
  }

  showCount(group, key: string) {
    return group.map((row) => row[key]).reduce((acc, cur) => cur + acc, 0);
  }

  onRowClickEvent($event, index: number): void {
    $event.preventDefault();
    this.toggleRowIndex = { index };
  }
}
