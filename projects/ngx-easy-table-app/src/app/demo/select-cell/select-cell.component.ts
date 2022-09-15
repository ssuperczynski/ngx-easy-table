import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-select-cell',
  templateUrl: './select-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [],
})
export class SelectCellComponent implements OnInit {
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.configuration = { ...DefaultConfig };
    this.configuration.selectCell = true;
    this.data = data;
  }
}
