import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ConfigService } from './configuration.service';
import { data } from '@assets/data';
@Component({
  selector: 'app-collapsed-rows',
  templateUrl: './collapsed-rows.component.html',
  styleUrls: ['./collapsed-rows.component.css']
})
export class CollapsedRowsComponent implements OnInit {
  toggled = true;
  @ViewChild('detailsTemplate') detailsTemplateRef: TemplateRef<any>;
  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data = [];
  configuration;
  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }
  ngOnInit() {
  }

  toggleRows() {
    this.toggled = !this.toggled;
    this.configuration.collapseAllRows = this.toggled;
    this.configuration = {...this.configuration};
  }

}
