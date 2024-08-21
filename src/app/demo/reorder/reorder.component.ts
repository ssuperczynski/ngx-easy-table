import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.component.html',
  styleUrls: ['./reorder.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReorderComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[];
  public data: Company[] = [];

  ngOnInit(): void {
    this.columns = [
      { key: 'level', title: 'Level' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data = data;
    this.configuration = { ...DefaultConfig };
    this.configuration.columnReorder = true;
    this.configuration.fixedColumnWidth = false;
  }
}
