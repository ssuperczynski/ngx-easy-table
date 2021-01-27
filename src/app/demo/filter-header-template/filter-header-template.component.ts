import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { APIDefinition, Config, Columns, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-filter-template',
  templateUrl: './filter-header-template.component.html',
  styleUrls: ['./filter-header-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterHeaderTemplateComponent implements OnInit {
  @ViewChild('levelHeaderActionTemplate', { static: true })
  levelHeaderActionTemplate: TemplateRef<any>;
  @ViewChild('companyHeaderActionTemplate', { static: true })
  companyHeaderActionTemplate: TemplateRef<any>;
  @ViewChild('table', { static: true }) table: APIDefinition;
  public columns: Columns[];
  data: Company[] = [];
  dataCopy: Company[] = [];
  configuration: Config;
  selectedLevels = new Set<string>(['High', 'Medium', 'Low']);
  selectedCompany = '';

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.checkboxes = true;
    this.configuration.additionalActions = true;
    this.configuration.fixedColumnWidth = true;
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'level', title: 'Level', headerActionTemplate: this.levelHeaderActionTemplate },
      { key: 'company', title: 'Company', headerActionTemplate: this.companyHeaderActionTemplate },
      { key: 'phone', title: 'Phone' },
      { key: 'address.street', title: 'Street' },
    ];
    this.data = data;
    this.dataCopy = data;
  }

  filter(field: string, event: Event | string): void {
    const value = typeof event === 'string' ? event : (event.target as HTMLInputElement).value;
    if (field === 'level') {
      this.selectedLevels.has(value)
        ? this.selectedLevels.delete(value)
        : this.selectedLevels.add(value);
    }
    if (field === 'company') {
      this.selectedCompany = value;
    }
    this.data = [...this.dataCopy].filter(({ level, company }) => {
      return (
        this.selectedLevels.has(level) &&
        company.toLocaleLowerCase().includes(this.selectedCompany.toLocaleLowerCase())
      );
    });
  }
}
