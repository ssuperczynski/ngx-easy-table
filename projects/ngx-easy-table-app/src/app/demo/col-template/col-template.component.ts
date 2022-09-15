import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-col-template',
  templateUrl: './col-template.component.html',
  styleUrls: ['./col-template.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColTemplateComponent implements OnInit {
  @ViewChild('phoneTpl', { static: true }) phoneTpl: TemplateRef<any>;
  public columns: Columns[];
  data: Company[] = [];
  public configuration: Config;
  ngOnInit(): void {
    this.columns = [
      { key: 'phone', title: 'Phone', cellTemplate: this.phoneTpl },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'STATUS' },
    ];
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }
}
