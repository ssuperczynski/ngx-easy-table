import { Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-toggle-column',
  templateUrl: './toggle-column.component.html',
  styleUrls: ['./toggle-column.component.css'],
})
export class ToggleColumnComponent implements OnInit {
  columns: Columns[] = [];
  columnsCopy: Columns[] = [];
  data: Company[] = [];
  checked = new Set(['phone', 'age', 'company', 'name', 'isActive', '']);
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.data = data;
    this.columnsCopy = [
      { key: 'phone', title: 'Phone' },
      { key: 'age', title: 'Age' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'isActive', title: 'Active' },
      { key: '', title: 'X' },
    ];
    this.columns = this.columnsCopy;
  }

  toggle(name: string): void {
    this.checked.has(name) ? this.checked.delete(name) : this.checked.add(name);
    this.columns = this.columnsCopy.filter((column) => this.checked.has(column.key));
  }
}
