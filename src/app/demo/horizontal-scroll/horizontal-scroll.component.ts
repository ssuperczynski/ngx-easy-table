import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { data } from '../../../assets/data';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalScrollComponent implements OnInit {
  public data;
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
    { key: 'company', title: 'Company2' },
    { key: 'company', title: 'Company3' },
    { key: 'company', title: 'Company4' },
    { key: 'company', title: 'Company5' },
    { key: 'company', title: 'Company6' },
    { key: 'company', title: 'Company7' },
    { key: 'company', title: 'Company8' },
    { key: 'company', title: 'Company9' },
    { key: 'company', title: 'Company10' },
    { key: 'company', title: 'Company11' },
  ];

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig, horizontalScroll: true };
    // TODO replace with table-responsive
    this.data = data;
  }
}
