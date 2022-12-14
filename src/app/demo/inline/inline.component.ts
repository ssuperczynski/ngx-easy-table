import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig, Event as ngxEvent } from 'ngx-easy-table';

@Component({
  selector: 'app-inline',
  templateUrl: './inline.component.html',
  styleUrls: ['./inline.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InlineComponent implements OnInit {
  @ViewChild('phoneTpl', { static: false }) phoneTpl: TemplateRef<any>;
  public columns: Columns[];
  data: Company[] = [];
  public configuration: Config;
  edit: number;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.data = data;
    this.columns = [
      { key: 'phone', title: 'Phone', cellTemplate: this.phoneTpl },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
  }

  eventEmitted($event: { event: string; value: any }): void {
    if ($event.event === ngxEvent.onDoubleClick) {
      this.edit = $event.value.rowId;
    }
  }

  update(event: Event): void {
    this.data[this.edit].phone = (event.target as HTMLInputElement).value;
    this.edit = -1;
  }
}
