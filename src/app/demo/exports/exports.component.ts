import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

// import { json2excel } from 'js2excel';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css'],
})
export class ExportsComponent {

  columns = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data: Company[] = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  exportToExcel() {
    try {
      // json2excel({
      //   data: this.data,
      //   name: 'user-info-data',
      //   formateDate: 'yyyy/mm/dd'
      // });
    } catch (e) {
      console.error('export error');
    }
  }

  exportToText() {
    // var a = document.createElement("a");
    // var file = new Blob([this.data], { type: 'text/plain' });
    // a.href = URL.createObjectURL(file);
    // a.download = 'json.txt';
    // a.click();
  }

  exportToCSV() {
    const rows = this.data;
    let csvContent = 'data:text/csv;charset=utf-8,';
    let dataString = '';
    const x: any[] = [];
    const keys = Object.keys(this.data[0]);
    rows.forEach((row, index) => {
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
