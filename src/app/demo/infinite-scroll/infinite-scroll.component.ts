import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Event } from '../../../../projects/ngx-easy-table/src/lib';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css'],
})
export class InfiniteScrollComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[];
  public data: Company[] = [];

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data = data;
    this.configuration = { ...DefaultConfig };
    this.configuration.infiniteScroll = true;
    this.configuration.paginationEnabled = false;
    this.configuration.rows = 10;
  }

  onEvent($event: { event: Event, value: any }): void {
    if ($event.event === Event.onInfiniteScrollEnd) {
      this.data = [
        ...this.data,
        {
          phone: '+1 (949) 527-2108',
          age: Math.random() * 100,
          company: 'KONGENE',
          name: 'Deanne Contreras',
          isActive: true,
        },
      ];
      this.cdr.detectChanges();
    }
  }
}
