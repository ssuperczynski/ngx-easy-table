import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-group-rows',
  templateUrl: './group-rows.component.html',
  styleUrls: ['./group-rows.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupRowsComponent implements OnInit {
  public configuration: Config;
  toggleRowIndex;
  amountSummary = 0;
  debitSummary = 0;
  public columns: Columns[] = [];
  data: Array<{
    amount: number;
    debit: number;
    company: string;
    name: string;
    isActive: boolean;
  }> = [];
  groupBy = 'isActive';

  private static generateData(): Array<{
    amount: number;
    debit: number;
    company: string;
    name: string;
    isActive: boolean;
  }> {
    return Array(31)
      .fill('')
      .map((_, key) => ({
        amount: 200,
        debit: 300,
        company: 'Some company',
        name: `John Doe`,
        isActive: key % 2 === 1,
      }));
  }

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.groupRows = true;
    this.configuration.searchEnabled = true;
    this.data = GroupRowsComponent.generateData();
    this.columns = [
      { key: 'amount', title: 'Amount' },
      { key: 'debit', title: 'Debit' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'Active' },
    ];
    this.amountSummary = this.data.map(({ amount }) => amount).reduce((acc, cur) => cur + acc, 0);
    this.debitSummary = this.data.map(({ debit }) => debit).reduce((acc, cur) => cur + acc, 0);
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
