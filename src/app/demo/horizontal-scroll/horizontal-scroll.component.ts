import { Component, NgZone, OnInit } from '@angular/core';
import { phone, company, random, name } from 'faker';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.css'],
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
    return Array(20).fill('').map(() => {
      return {
        phone: phone.phoneNumberFormat(),
        age: random.number({ min: 15, max: 70 }).toString(),
        company: company.companyName(),
        name: `${name.firstName()} ${name.lastName()}`,
        isActive: random.boolean(),
        company2: company.companyName(),
        company3: company.companyName(),
        company4: company.companyName(),
        company5: company.companyName(),
        company6: company.companyName(),
        company7: company.companyName(),
        company8: company.companyName(),
        company9: company.companyName(),
        company10: company.companyName(),
        company11: company.companyName(),
      };
    });
  }

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.data = HorizontalScrollComponent.generateData();
    });
  }
}
