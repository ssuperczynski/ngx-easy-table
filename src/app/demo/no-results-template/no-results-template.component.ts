import { Component, OnInit } from '@angular/core';
import { Company } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-no-results-template',
  templateUrl: './no-results-template.component.html',
  styleUrls: ['./no-results-template.component.css'],
})
export class NoResultsTemplateComponent implements OnInit {

  public columns: Columns[] = [
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'phone', title: 'Phone' },
    { key: 'address.street', title: 'Street' },
  ];
  public data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = {...DefaultConfig};
    this.configuration.horizontalScroll = false;
  }
}
