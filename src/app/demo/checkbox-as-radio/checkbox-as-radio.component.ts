import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { API, APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-checkbox-as-radio',
  templateUrl: './checkbox-as-radio.component.html',
  styleUrls: ['./checkbox-as-radio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxAsRadioComponent implements OnInit {
  public configuration: Config;
  public columns: Columns[];
  public data: Company[] = [];
  public selected;
  @ViewChild('table', { static: true }) table: APIDefinition;

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

  eventEmitted($event: { event: string; value: { rowId: number } }): void {
    switch ($event.event) {
      case 'onCheckboxSelect':
        this.table.apiEvent({
          type: API.toggleCheckbox,
          value: this.selected,
        });
        this.selected = $event.value.rowId;
        this.table.apiEvent({
          type: API.toggleCheckbox,
          value: $event.value.rowId,
        });
        break;
      case 'onSelectAll':
        break;
    }
  }
}
