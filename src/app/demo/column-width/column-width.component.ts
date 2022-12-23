import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-column-width',
  templateUrl: './column-width.component.html',
  styleUrls: ['./column-width.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnWidthComponent implements OnInit {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone', placeholder: 'Search', width: '15%' },
    { key: 'age', title: 'Age', placeholder: 'Søg', width: '5%' },
    { key: 'company', title: 'Company', placeholder: 'Pesquisa', width: '15%' },
    { key: 'name', title: 'Name', placeholder: 'Ricerca', width: '15%' },
    { key: 'isActive', title: 'STATUS', placeholder: 'Suche', width: '15%' },
  ];
  data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.data = data;
  }
}
