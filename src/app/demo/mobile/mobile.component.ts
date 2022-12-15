import { ChangeDetectionStrategy, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { API, APIDefinition } from 'ngx-easy-table';

@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MobileComponent implements OnInit {
  public configuration: Config;
  public innerWidth: number;
  public columns: Columns[];
  public data: Company[] = [];
  public toggledRows = new Set<number>();

  @ViewChild('table') table: APIDefinition;

  @HostListener('window:resize', [])
  onResize(): void {
    this.checkView();
  }

  ngOnInit(): void {
    this.data = data;
    this.configuration = { ...DefaultConfig };
    this.configuration.detailsTemplate = true;
    this.configuration.paginationRangeEnabled = false;
    this.checkView();
  }

  get isMobile(): boolean {
    return this.innerWidth <= 768;
  }

  private checkView(): void {
    this.innerWidth = window.innerWidth;
    if (this.isMobile) {
      this.columns = [
        { key: 'company', title: 'Company' },
        { key: '', title: 'Action' },
      ];
    } else {
      this.columns = [
        { key: 'phone', title: 'Phone' },
        { key: 'age', title: 'Age' },
        { key: 'company', title: 'Company' },
        { key: 'name', title: 'Name' },
        { key: 'isActive', title: 'STATUS' },
      ];
    }
  }

  onRowClickEvent($event: MouseEvent, index: number): void {
    $event.preventDefault();
    this.table.apiEvent({
      type: API.toggleRowIndex,
      value: index,
    });
    if (this.toggledRows.has(index)) {
      this.toggledRows.delete(index);
    } else {
      this.toggledRows.add(index);
    }
  }
}
