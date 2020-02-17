import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-styles',
  templateUrl: './summary-footer.component.html',
  styleUrls: ['./summary-footer.component.css'],
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
    this.data = data;
    this.ageSummary = this.data.map((_) => _.age).reduce((acc, cur) => cur + acc, 0);
  }

}
