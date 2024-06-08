import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-additional-actions-template',
  templateUrl: './additional-actions-template.component.html',
  styleUrls: ['./additional-actions-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalActionsTemplateComponent implements OnInit {
  private toggleChecked = false;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  public data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig, searchEnabled: false, additionalActions: true };
    this.data = data;
  }

  public toggle(): void {
    this.toggleChecked = !this.toggleChecked;
    if (this.toggleChecked) {
      this.columns = [
        { key: 'age', title: 'Age' },
        { key: 'company', title: 'Company' },
        { key: 'name', title: 'Name' },
        { key: 'isActive', title: 'Active' },
      ];
    } else {
      this.columns = [
        { key: 'phone', title: 'Phone' },
        { key: 'age', title: 'Age' },
        { key: 'company', title: 'Company' },
        { key: 'name', title: 'Name' },
        { key: 'isActive', title: 'Active' },
      ];
    }
  }

  public enableSearch(): void {
    this.configuration = {
      ...this.configuration,
      searchEnabled: !this.configuration.searchEnabled,
    };
  }
}
