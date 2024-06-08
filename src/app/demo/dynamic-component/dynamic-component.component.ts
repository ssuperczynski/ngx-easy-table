import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
} from '@angular/core';
import { Company, data } from '../../../assets/data';
import { APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { SmallTableComponent } from './small-table/small-table.component';

@Component({
  selector: 'app-dynamic-component',
  templateUrl: './dynamic-component.component.html',
  styleUrls: ['./dynamic-component.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicComponentComponent implements OnInit {
  @ViewChild('table') table: APIDefinition;
  @ViewChild('container', { read: ViewContainerRef }) container;
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;
  isCDKOpen = false;
  isRefOpen = false;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.rows = 4;
    this.columns = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.data = data;
  }

  toggleCdk() {
    this.isCDKOpen = !this.isCDKOpen;
  }

  toggleRef() {
    this.isRefOpen = !this.isRefOpen;
    this.container.clear();
    if (this.isRefOpen) {
      const componentRef = this.container.createComponent(SmallTableComponent);
      componentRef.instance.title = 'Some title';
    }
  }
}
