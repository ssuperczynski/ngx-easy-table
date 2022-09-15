import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig, Event } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[];
  public data: Company[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

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
    // infiniteScrollThrottleTime means how often check if scroll reached end on the collection
    // to load the new items. By default set to 200ms.
    this.configuration.infiniteScrollThrottleTime = 10;
    this.configuration.rows = 10;
  }

  onEvent($event: { event: Event | string; value: any }): void {
    if ($event.event === Event.onInfiniteScrollEnd) {
      this.data = [...this.data, ...this.data];
      this.cdr.detectChanges();
    }
  }
}
