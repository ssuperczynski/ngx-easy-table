import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, API, APIDefinition, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-bootstrap',
  templateUrl: './bootstrap.component.html',
  styleUrls: ['./bootstrap.component.scss'],
  // tslint:disable-next-line:use-view-encapsulation
  encapsulation: ViewEncapsulation.None,
})
export class BootstrapComponent implements OnInit {
  @ViewChild('table', { static: true }) table: APIDefinition;
  public columns: Columns[];
  public data: Company[] = [];
  public configuration;

  ngOnInit(): void {
    this.configuration = DefaultConfig;
    this.configuration.checkboxes = true;
    this.columns = [
      { key: 'phone', title: 'Phone', width: '15%' },
      { key: 'age', title: 'Age', width: '10%' },
      { key: 'company', title: 'Company', width: '15%' },
      { key: 'name', title: 'Name', width: '15%' },
      { key: 'isActive', title: 'STATUS', width: '15%' },
    ];
    this.data = data;
  }

  setBootstrap(): void {
    this.setClass('table table-bordered table-striped table-sm');
  }

  setMaterial(): void {
    this.setClass('material');
  }

  setNormal(): void {
    this.setClass('');
  }

  private setClass(name: string): void {
    this.table.apiEvent({
      type: API.setTableClass,
      value: name,
    });
  }

  setRowClass(row: number, className: string): void {
    this.table.apiEvent({
      type: API.setRowClass,
      value: { row, className },
    });
  }
}
