import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ConfigService } from './configuration.service';
import { data } from '@assets/data';

@Component({
  selector: 'app-col-template',
  templateUrl: './col-template.component.html',
  styleUrls: ['./col-template.component.css'],
  providers: [ConfigService],
})
export class ColTemplateComponent implements OnInit {
  @ViewChild('phoneTpl') phoneTpl: TemplateRef<any>;
  columns;
  data = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'phone', title: 'Phone', cellTemplate: this.phoneTpl },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
  }
}
