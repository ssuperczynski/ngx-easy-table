import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { takeUntil } from 'rxjs/operators';
import { Company, CompanyService } from '../../services/company.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-infinite-scroll-server-template',
  templateUrl: './infinite-scroll-server-template.component.html',
  styleUrls: ['./infinite-scroll-server-template.component.css'],
  providers: [CompanyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InfiniteScrollServerTemplateComponent implements OnInit, OnDestroy {
  public configuration: Config;
  public columns: Columns[];
  public data: Company[] = [];
  public totalLength = 0;
  private ngUnsubscribe: Subject<void> = new Subject<void>();
  private offset = 1;
  public selected: number | null = null;

  constructor(private cdr: ChangeDetectorRef, private readonly companyService: CompanyService) {}

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.columns = [
      { key: '', title: '', width: '3%' },
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
    ];

    this.configuration = { ...DefaultConfig };
    this.configuration.infiniteScroll = true;
    this.configuration.infiniteScrollThrottleTime = 750;
    this.configuration.paginationEnabled = false;
    this.configuration.serverPagination = false;
    this.configuration.rows = 10;
    this.getData(`_limit=10&_page=1`);
  }

  onEvent(): void {
    if (this.totalLength > this.data.length) {
      this.getData(`_limit=10&_page=${this.offset}`);
    }
  }

  private getData(params: string): any {
    this.offset = this.offset + 1;
    this.companyService
      .getCompanies(params)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.totalLength = parseInt(response.headers.get('x-total-count'), 10);
        this.data = [...this.data, ...response.body];

        this.cdr.detectChanges();
      });
  }

  onChange(index: number): void {
    this.selected = index;
  }
}
