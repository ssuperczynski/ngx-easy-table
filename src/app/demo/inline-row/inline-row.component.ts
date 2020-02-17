import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-inline-row',
  templateUrl: './inline-row.component.html',
  styleUrls: ['./inline-row.component.css'],
})
export class InlineRowComponent implements OnInit {
  @ViewChild('phoneTpl', { static: true }) phoneTpl: TemplateRef<any>;
  @ViewChild('ageTpl', { static: true }) ageTpl: TemplateRef<any>;
  @ViewChild('companyTpl', { static: true }) companyTpl: TemplateRef<any>;
  @ViewChild('nameTpl', { static: true }) nameTpl: TemplateRef<any>;
  @ViewChild('actionTpl', { static: true }) actionTpl: TemplateRef<any>;

  @ViewChild('phone') phone: ElementRef<any>;
  @ViewChild('age') age: ElementRef<any>;
  @ViewChild('company') company: ElementRef<any>;
  @ViewChild('name') name: ElementRef<any>;
  public columns: Columns[];
  data: Company[] = [];
  public configuration: Config;
  editRow: number;

  constructor() {
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }

  ngOnInit(): void {
    this.columns = [
      { key: 'phone', title: 'Phone', cellTemplate: this.phoneTpl },
      { key: 'age', title: 'Age', cellTemplate: this.ageTpl },
      { key: 'company', title: 'Company', cellTemplate: this.companyTpl },
      { key: 'name', title: 'Name', cellTemplate: this.nameTpl },
      { key: 'action', title: 'Actions', cellTemplate: this.actionTpl },
    ];
  }

  edit(rowIndex: number): void {
    this.editRow = rowIndex;
  }

  update(): void {
    this.data = [...this.data.map((obj, index) => {
      if (index === this.editRow) {
        return {
          phone: this.phone.nativeElement.value,
          age: this.age.nativeElement.value,
          company: this.company.nativeElement.value,
          name: this.name.nativeElement.value,
          isActive: this.name.nativeElement.value,
        };
      }
      return obj;
    })];
    this.editRow = -1;
  }
}
