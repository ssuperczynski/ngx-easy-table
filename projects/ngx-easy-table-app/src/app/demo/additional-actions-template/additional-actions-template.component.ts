import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';
import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-additional-actions-template',
  templateUrl: './additional-actions-template.component.html',
  styleUrls: ['./additional-actions-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalActionsTemplateComponent implements OnInit {
  private csvOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
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
    this.configuration = { ...DefaultConfig };
    this.configuration.additionalActions = true;
    this.data = data;
  }

  public csvExportWhole(): void {
    const csvExporter = new ExportToCsv(this.csvOptions);
    csvExporter.generateCsv(this.data);
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
    this.configuration.searchEnabled = !this.configuration.searchEnabled;
  }
}
