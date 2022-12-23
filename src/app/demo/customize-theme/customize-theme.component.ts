import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { columns, Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-customize-theme',
  templateUrl: './customize-theme.component.html',
  styleUrls: ['./customize-theme.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeThemeComponent implements OnInit {
  columns: Columns[] = [];
  data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
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
}
