import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-styles',
  templateUrl: './summary-footer.component.html',
  styleUrls: ['./summary-footer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SummaryFooterComponent implements OnInit {
  public configuration: Config;
  public ageSummary = 0;
  public columns: Columns[];
  public data: Company[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.data = data;
    this.ageSummary = this.data.map((_) => _.age).reduce((acc, cur) => cur + acc, 0);
  }

  onEvent($event: { event: string; value: { key: string; value: string }[] }) {
    if ($event.event !== 'onSearch') {
      return;
    }
    const filterKey = $event.value[0].key;
    const filterVal = $event.value[0].value;
    this.ageSummary = this.data
      .filter((item) => `${item[filterKey]}`.includes(filterVal))
      .map((_) => _.age)
      .reduce((acc, cur) => cur + acc, 0);
  }
}
