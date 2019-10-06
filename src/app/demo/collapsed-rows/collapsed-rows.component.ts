import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-collapsed-rows',
  templateUrl: './collapsed-rows.component.html',
  styleUrls: ['./collapsed-rows.component.css'],
})
export class CollapsedRowsComponent implements OnInit {
  public toggled = true;
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;

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
  }

  toggleRows(): void {
    this.toggled = !this.toggled;
    this.configuration.collapseAllRows = this.toggled;
    this.configuration = { ...this.configuration };
  }

}
