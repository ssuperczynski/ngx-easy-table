import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-checkbox-default',
  templateUrl: './checkbox-default.component.html',
  styleUrls: ['./checkbox-default.component.css'],
})
export class CheckboxDefaultComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[];
  public data: Company[] = [];
  public selected = new Set();

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = true;
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'phone', title: 'Phone' },
    ];
    this.data = data;
  }

  eventEmitted($event: { event: string, value: any }): void {
    switch ($event.event) {
      case 'onCheckboxSelect':
        if (this.selected.has($event.value.rowId)) {
          this.selected.delete($event.value.rowId);
        } else {
          this.selected.add($event.value.rowId);
        }
        break;
      case 'onSelectAll':
        this.data.forEach((_, key) => {
          if (this.selected.has(key)) {
            this.selected.delete(key);
          } else {
            this.selected.add(key);
          }
        });
        break;
    }
  }
}
