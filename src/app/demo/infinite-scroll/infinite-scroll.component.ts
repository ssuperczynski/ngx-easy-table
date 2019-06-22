import { Component } from '@angular/core';
import { Company } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css'],
})
export class InfiniteScrollComponent {
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];

  public data: Company[] = [];

  constructor() {

    this.data = Array.from({ length: 10000 }).map((_, i) => ({
      phone: `+1 (949) 527-210${i}`,
      age: 36,
      company: 'KONGENE',
      name: 'Deanne Contreras',
      isActive: true,
    }));
    this.configuration = DefaultConfig;
    this.configuration.infiniteScroll = true;
  }
}
