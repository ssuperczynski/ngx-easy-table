import { Component } from '@angular/core';
import { columns, Company, data } from '../../../assets/data';
import { Columns } from '../../ngx-easy-table/model/columns';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-customize-theme',
  templateUrl: './customize-theme.component.html',
  styleUrls: ['./customize-theme.component.css'],
})
export class CustomizeThemeComponent {
  columns: Columns[] = [];
  data: Company[] = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
    this.columns = columns;
  }

  borderless(): void {
    this.configuration.tableLayout.borderless = !this.configuration.tableLayout.borderless;
    this.configuration = { ...this.configuration };
  }

  hoverable(): void {
    this.configuration.tableLayout.hover = !this.configuration.tableLayout.hover;
    this.configuration = { ...this.configuration };
  }

  striped(): void {
    this.configuration.tableLayout.striped = !this.configuration.tableLayout.striped;
    this.configuration = { ...this.configuration };
  }

  setHeight(size: string): void {
    this.configuration.tableLayout.style = size;
    this.configuration = { ...this.configuration };
  }

  setTheme(theme: string) {
    this.configuration.tableLayout.theme = theme;
    this.configuration = { ...this.configuration };
  }
}
