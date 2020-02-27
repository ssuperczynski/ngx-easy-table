import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-fixed-width',
  templateUrl: './fixed-width.component.html',
  styleUrls: ['./fixed-width.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FixedWidthComponent implements OnInit {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data: Company[] = [];
  public configuration: Config;
  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.fixedColumnWidth = true;
    this.data = data;
  }

  onChange(): void {
    this.configuration.fixedColumnWidth = !this.configuration.fixedColumnWidth;
    this.configuration = { ...this.configuration };
  }
}
