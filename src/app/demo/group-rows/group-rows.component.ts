import { Component } from '@angular/core';
import { random, company, name } from 'faker';
import { ConfigService } from './configuration.service';
import { Columns } from 'ngx-easy-table';

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
  public columns: Columns[] = [];
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

  private static generateData(): Array<{
    amount: number,
    debit: number,
    company: string,
    name: string,
    isActive: boolean,
  }> {
    return Array(31).fill('').map((_, key) => ({
      amount: random.number(300),
      debit: 300,
      company: company.companyName(),
      name: `${name.firstName()} ${name.lastName()}`,
      isActive: key % 2 === 1,
    }));
  }

  onChange(groupBy: string): void {
    this.groupBy = groupBy;
  }

  showCount(group: any[], key: string): any[] {
    return group.map((row) => row[key]).reduce((acc, cur) => cur + acc, 0);
  }

  onRowClickEvent($event: MouseEvent, index: number): void {
    $event.preventDefault();
    this.toggleRowIndex = { index };
  }
}
