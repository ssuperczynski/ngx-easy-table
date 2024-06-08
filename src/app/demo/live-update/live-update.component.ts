import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { interval, Subject, tap } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

interface Data {
  status: string;
  amount: number;
  company: string;
  limit: number;
  balance: number;
}

@Component({
  selector: 'app-live-update',
  templateUrl: './live-update.component.html',
  styleUrls: ['./live-update.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveUpdateComponent implements OnInit, OnDestroy {
  data: Data[] = [
    { status: 'ACTIVE', amount: 1, company: 'Foo', limit: 1000, balance: 2000 },
    { status: 'INACTIVE', amount: 2, company: 'Bar', limit: 1000, balance: 900 },
    { status: 'INACTIVE', amount: 22, company: 'Boo', limit: 10, balance: 2220 },
    { status: 'INACTIVE', amount: 212, company: 'Baz', limit: 4000, balance: 1900 },
    { status: 'ACTIVE', amount: 33, company: 'Saz', limit: 1600, balance: 4200 },
    { status: 'INACTIVE', amount: 23, company: 'Soo', limit: 2600, balance: 2200 },
    { status: 'ACTIVE', amount: 66, company: 'Lorem', limit: 6400, balance: 1700 },
    { status: 'INACTIVE', amount: 888, company: 'Ipsum', limit: 6060, balance: 1100 },
  ];
  public columns: Columns[] = [
    { key: 'status', title: 'Is active' },
    { key: 'amount', title: 'Amount' },
    { key: 'company', title: 'Company' },
    { key: 'limit', title: 'Limit' },
    { key: 'balance', title: 'Balance' },
  ];
  public configuration: Config;
  private ngUnsubscribe$ = new Subject<void>();
  static random(min: number, max: number): number {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    interval(600)
      .pipe(
        tap(() => {
          let idx = LiveUpdateComponent.random(0, 7);
          this.data = this.data.map((d, index) => {
            if (index === idx) {
              return {
                status: d.status,
                company: d.company,
                limit: LiveUpdateComponent.random(500, 3000),
                balance: LiveUpdateComponent.random(900, 1100),
                amount: LiveUpdateComponent.random(1, 100),
              };
            }

            return d;
          });

          this.cdr.markForCheck();
        }),
        takeUntil(this.ngUnsubscribe$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}
