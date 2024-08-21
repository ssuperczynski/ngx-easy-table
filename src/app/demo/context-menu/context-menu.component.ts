import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { CompanyService } from '../../services/company.service';
import { APIDefinition, Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CompanyService],
})
export class ContextMenuComponent implements OnInit {
  @ViewChild('phoneTpl', { static: true }) phoneTpl: TemplateRef<any>;
  @ViewChild('table') table: APIDefinition;
  public columns: Columns[];
  public data: Company[] = [];
  public configuration: Config;
  public edit: number;
  public phone: string;
  public details = null;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig, showContextMenu: true };
    this.columns = [
      { key: 'phone', title: 'Phone', width: '15%', cellTemplate: this.phoneTpl },
      { key: 'age', title: 'Age', width: '10%' },
      { key: 'company', title: 'Company', width: '15%' },
      { key: 'name', title: 'Name', width: '15%' },
      { key: 'isActive', title: 'STATUS', width: '15%' },
    ];
    this.data = data;
  }

  editCell(object: any): void {
    this.phone = object.row.phone;
    this.edit = object.rowId;
  }

  update(phone: string): void {
    this.data = [
      ...this.data.map((row, index) => {
        return index === this.edit ? { ...row, phone: phone } : row;
      }),
    ];
    this.edit = -1;
  }

  showDetails(object: any): void {
    this.details = object;
  }

  protected readonly JSON = JSON;
}
