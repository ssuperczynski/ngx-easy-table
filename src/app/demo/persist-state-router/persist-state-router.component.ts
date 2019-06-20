import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-persist-state-router',
  templateUrl: './persist-state-router.component.html',
  styles: [],
})
export class PersistStateRouterComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('table', { static: true }) table: APIDefinition;
  private unsubscribe = new Subject<void>();
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  public data: Company[] = [];
  public configuration: Config;
  public sortColumn: string;
  public sortOrder: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.configuration = DefaultConfig;
    this.data = data;
    this.route.params
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((params) => {
        if ('state' in params) {
          const [column, order] = params.state.split('&');
          this.sortColumn = column.split('=')[1];
          this.sortOrder = order.split('=')[1];
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngAfterViewInit(): void {
    this.sortBy();
  }

  sortBy(): void {
    const column = this.sortColumn;
    const order = this.sortOrder;
    this.table.apiEvent({
      type: API.sortBy,
      value: { column, order },
    });
  }
}
