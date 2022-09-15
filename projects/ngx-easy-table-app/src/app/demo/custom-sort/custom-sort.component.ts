import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from '@paddls/ngx-easy-table';

@Component({
  selector: 'app-custom-sort',
  templateUrl: './custom-sort.component.html',
  styleUrls: ['./custom-sort.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomSortComponent implements OnInit {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data: Company[] = [];
  public configuration: Config;

  ngOnInit(): void {
    this.configuration = { ...DefaultConfig };
    this.data = data;
    this.sortByAge();
  }

  sortByNameAsc(): void {
    this.data = [
      ...this.data.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameA.localeCompare(nameB);
      }),
    ];
  }

  sortByNameDesc(): void {
    this.data = [
      ...this.data.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return nameB.localeCompare(nameA);
      }),
    ];
  }

  sortByAge(): void {
    /* eslint-disable-next-line */
    this.data = [
      ...this.data.sort((a, b) => {
        const ageA = a.age;
        const ageB = b.age;
        if (ageB < ageA) {
          return -1;
        }
        if (ageB > ageA) {
          return 1;
        }
        return 0;
      }),
    ];
  }
}
