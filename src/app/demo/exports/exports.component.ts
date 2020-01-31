import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';

import { ExportToCsv } from 'export-to-csv';

@Component({
  selector: 'app-exports',
  templateUrl: './exports.component.html',
  styleUrls: ['./exports.component.css'],
})
export class ExportsComponent {
  public columns: Columns[] = [
    { key: 'phone', title: 'Phone' },
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
  ];
  data: Company[] = [];
  public configuration: Config;

  constructor() {
    this.configuration = { ...DefaultConfig };
    this.data = data;
  }

  exportToExcel(): void {
    // Here is simple example how to export to excel by https://www.npmjs.com/package/xlsx
    // try {
    //   /* generate worksheet */
    //   const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    //
    //   /* generate workbook and add the worksheet */
    //   const wb: XLSX.WorkBook = XLSX.utils.book_new();
    //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    //
    //   /* save to file */
    //   XLSX.writeFile(wb, 'file.xlsx');
    // } catch (err) {
    //   console.error('export error', err);
    // }
  }

  exportToCSV(): void {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
    };
    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(this.data);
  }
}
