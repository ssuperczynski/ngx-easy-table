import { ChangeDetectionStrategy, Component, NgZone, OnInit } from '@angular/core';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalScrollComponent implements OnInit {
  data;
  public configuration: Config;
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
    { key: 'company2', title: 'Company2' },
    { key: 'company3', title: 'Company3' },
    { key: 'company4', title: 'Company4' },
    { key: 'company5', title: 'Company5' },
    { key: 'company6', title: 'Company6' },
    { key: 'company7', title: 'Company7' },
    { key: 'company8', title: 'Company8' },
    { key: 'company9', title: 'Company9' },
    { key: 'company10', title: 'Company10' },
    { key: 'company11', title: 'Company11' },
  ];

  constructor(private zone: NgZone) {
    this.configuration = { ...DefaultConfig };
    this.configuration.horizontalScroll = true;
  }

  private static generateData(): any[] {
    return Array(20)
      .fill('')
      .map(() => {
        return {
          phone: '555-444-333',
          age: 34,
          company: 'Some company',
          name: `John Doe`,
          isActive: true,
          company2: 'Some company2',
          company3: 'Some company3',
          company4: 'Some company4',
          company5: 'Some company5',
          company6: 'Some company6',
          company7: 'Some company7',
          company8: 'Some company8',
          company9: 'Some company9',
          company10: 'Some company10',
          company11: 'Some company11',
        };
      });
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.data = HorizontalScrollComponent.generateData();
    });
  }
}
