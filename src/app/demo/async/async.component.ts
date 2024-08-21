import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { Observable, of } from 'rxjs';
import { data } from '../../../assets/data';

@Component({
  selector: 'app-async',
  templateUrl: './async.component.html',
  styleUrls: ['./async.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AsyncComponent implements OnInit {
  public configuration: Config;
  public data$: Observable<any>;
  public columns: Columns[];

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data$ = of(data);
  }
}
