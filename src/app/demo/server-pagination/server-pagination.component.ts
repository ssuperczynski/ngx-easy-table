import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CompanyService } from '../../services/company.service';
import { APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

interface EventObject {
  event: string;
  value: {
    limit: number;
    page: number;
  };
}

@Component({
  selector: 'app-server-pagination',
  templateUrl: './server-pagination.component.html',
  styleUrls: ['./server-pagination.component.css'],
  providers: [CompanyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServerPaginationComponent implements OnInit, OnDestroy {
  @ViewChild('table') table: APIDefinition;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  public data;
  public configuration: Config;
  public pagination = {
    limit: 10,
    offset: 0,
    count: -1,
  };
  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private readonly companyService: CompanyService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.getData('');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  eventEmitted($event: { event: string; value: any }): void {
    if ($event.event !== 'onClick') {
      this.parseEvent($event);
    }
  }

  private parseEvent(obj: EventObject): void {
    this.pagination.limit = obj.value.limit ? obj.value.limit : this.pagination.limit;
    this.pagination.offset = obj.value.page ? obj.value.page : this.pagination.offset;
    this.pagination = { ...this.pagination };
    const params = `_limit=${this.pagination.limit}&_page=${this.pagination.offset}`; // see https://github.com/typicode/json-server
    this.getData(params);
  }

  private getData(params: string): void {
    this.configuration.isLoading = true;
    this.companyService
      .getCompanies(params)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response) => {
        this.data = response.body;
        // ensure this.pagination.count is set only once and contains count of the whole array, not just paginated one
        this.pagination.count =
          this.pagination.count === -1
            ? response.body
              ? response.body.length
              : 0
            : this.pagination.count;
        this.pagination = { ...this.pagination };
        this.configuration.isLoading = false;
        this.cdr.detectChanges();
      });
  }
}
