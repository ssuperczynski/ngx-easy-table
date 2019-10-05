import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, DefaultConfig } from '../../../../projects/ngx-easy-table/src/lib';
import { API, APIDefinition, Config } from 'ngx-easy-table';

@Component({
  selector: 'app-filter-template',
  templateUrl: './filter-header-template.component.html',
  styleUrls: ['./filter-header-template.component.css'],
})
export class FilterHeaderTemplateComponent implements OnInit, AfterViewInit {

  @ViewChild('levelHeaderActionTemplate', { static: true }) levelHeaderActionTemplate: TemplateRef<any>;
  @ViewChild('companyHeaderActionTemplate', { static: true }) companyHeaderActionTemplate: TemplateRef<any>;
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

  ngAfterViewInit(): void {
    this.table.apiEvent({
      type: API.setTableClass,
      value: 'material',
    });
  }

  filter(field: string, value: string): void {
    if (field === 'level') {
      this.selectedLevels.has(value) ? this.selectedLevels.delete(value) : this.selectedLevels.add(value);
    }
    if (field === 'company') {
      this.selectedCompany = value;
    }
    this.data = [...this.dataCopy].filter(({ level, company }) => {
      return this.selectedLevels.has(level) &&
        company.toLocaleLowerCase().includes(this.selectedCompany.toLocaleLowerCase());
    });
  }
}
