import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent implements OnInit {
  public configuration;
  public columns: Columns[];
  public data: Company[] = [];

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.radio = true;
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'company', title: 'Company' },
      { key: 'name', title: 'Name' },
      { key: 'phone', title: 'Phone' },
    ];
    this.data = data;
  }
}
