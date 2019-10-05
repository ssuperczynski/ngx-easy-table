import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig, Event } from 'ngx-easy-table';

@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.css'],
})
export class InlineComponent implements OnInit {
  @ViewChild('phoneTpl', { static: true }) phoneTpl: TemplateRef<any>;
  public columns: Columns[];
  data: Company[] = [];
  public configuration: Config;
  edit: number;

  constructor() {
    this.configuration = { ...DefaultConfig };
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

  eventEmitted($event: { event: string, value: any }): void {
    if ($event.event === Event.onDoubleClick) {
      this.edit = $event.value.rowId;
    }
  }

  update($event: any): void {
    this.data[this.edit].phone = $event.target.value;
    this.edit = -1;
  }
}
