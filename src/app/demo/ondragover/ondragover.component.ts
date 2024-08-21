import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-ondragover',
  templateUrl: './ondragover.component.html',
  styleUrls: ['./ondragover.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnDragOverComponent implements OnInit {
  public columns: Columns[] = [];
  data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.configuration.onDragOver = true;
  }
}
