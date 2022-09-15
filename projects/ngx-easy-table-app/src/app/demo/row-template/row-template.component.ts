import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-row-template',
  templateUrl: './row-template.component.html',
  styleUrls: ['./row-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowTemplateComponent implements OnInit {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  public data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.showDetailsArrow = true;
    this.configuration.detailsTemplate = true;
    this.data = data;
  }
}
