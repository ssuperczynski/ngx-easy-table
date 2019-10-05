import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-many-tables',
  templateUrl: './many-tables.component.html',
  styleUrls: ['./many-tables.component.css'],
})
export class ManyTablesComponent implements OnInit {
  public configurationBasic: Config;
  public configurationAdvanced: Config;
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
    this.configurationBasic = { ...DefaultConfig };
    this.configurationBasic.orderEnabled = true;
    this.configurationBasic.searchEnabled = true;
    this.configurationBasic.rows = 3;
    this.configurationAdvanced = { ...DefaultConfig };
    this.configurationAdvanced.orderEnabled = true;
    this.configurationAdvanced.searchEnabled = true;
    this.configurationAdvanced.threeWaySort = true;
    this.configurationAdvanced.rows = 4;
    this.data = data;
  }
}
