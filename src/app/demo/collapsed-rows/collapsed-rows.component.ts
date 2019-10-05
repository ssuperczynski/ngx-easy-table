import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-collapsed-rows',
  templateUrl: './collapsed-rows.component.html',
  styleUrls: ['./collapsed-rows.component.css'],
})
export class CollapsedRowsComponent implements OnInit {
  toggled = true;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data: Company[] = [];
  public configuration: Config;

  constructor() {
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }

  ngOnInit(): void {
  }

  toggleRows(): void {
    this.toggled = !this.toggled;
    this.configuration.collapseAllRows = this.toggled;
    this.configuration = { ...this.configuration };
  }

}
