import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-csv-export',
  template: `
    <a (click)="exportCsv()" class="ngx-menu-item">
      CSV export
    </a>`,
})

/**
 * From version 5.0 CsvExportComponent will be deprecated,
 * and from version 6.0 moved to CsvExportComponent plugin
 */
export class CsvExportComponent {
  @Input() data;

  public exportCsv() {
    const data = this.data;
    let csvContent = 'data:text/csv;charset=utf-8,';
    let dataString = '';
    const x: any[] = [];
    const keys = Object.keys(this.data[0]);
    data.forEach((row, index) => {
      x[index] = [];
      keys.forEach((i) => {
        if (row.hasOwnProperty(i)) {
          if (typeof row[i] === 'object') {
            row[i] = 'Object'; // so far just change object to "Object" string
          }
          x[index].push(row[i]);
        }
      });
    });

    csvContent += keys + '\n';
    x.forEach((row, index) => {
      dataString = row.join(',');
      csvContent += index < data.length ? dataString + '\n' : dataString;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'my_data.csv');

    link.click();
  }
}
