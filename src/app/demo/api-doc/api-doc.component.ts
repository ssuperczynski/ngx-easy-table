import { Component } from '@angular/core';

@Component({
  selector: 'app-api-doc',
  templateUrl: './api-doc.component.html',
  styleUrls: ['./api-doc.component.css'],
})
export class ApiDocComponent {
  public readonly apiDefinitionCode = `
import { API, APIDefinition } from 'ngx-easy-table';

@ViewChild('table') table: APIDefinition;
`;
  public readonly setInputValueCode = `this.table.apiEvent({
  type: API.setInputValue,
  value: [
      { key: 'age', value: '32' },
    ],
});`;

  public readonly setInputValueCode2 = `this.table.apiEvent({
  type: API.setInputValue,
  value: [
      { key: 'age', value: '32' },
      { key: 'company', value: 'Ko' },
    ],
});`;

  public readonly setInputValueCode3 = `this.table.apiEvent({
  type: API.setInputValue,
  value: [
      { key: 'age', value: '' },
      { key: 'company', value: '' },
    ],
});`;

  public readonly rowContextMenuClickedCode = `this.table.apiEvent({
  type: API.rowContextMenuClicked,
});`;

  public readonly setRowClassCode = `this.table.apiEvent({
  type: API.setRowClass,
  value: { row: 1, className: 'red' },
});`;

  public readonly setCellClassCode = `this.table.apiEvent({
  type: API.setCellClass,
  value: { row: 1, cell: 1, className: 'red' },
});`;

  public readonly setRowStyleCode = `this.table.apiEvent({
  type: API.setRowStyle,
  value: { row: 1, attr: 'background', value: '#fd5e5ed4' },
});`;

  public readonly setCellStyleCode = `this.table.apiEvent({
  type: API.setCellStyle,
  value: { row: 1, cell: 3, attr: 'background', value: '#fd5e5ed4' },
});`;

  public readonly setTableClassCode = `this.table.apiEvent({
  type: API.setTableClass,
  value: 'table table-bordered table-striped table-sm',
});`;

  public readonly setPaginationCode = `this.table.apiEvent({
  type: API.setPaginationCurrentPage,
  value: 2,
});`;

  public readonly getPaginationTotalCode = `this.table.apiEvent({
  type: API.getPaginationTotalItems,
});`;

  public readonly getNumberOfRowsPerPageCode = `this.table.apiEvent({
  type: API.getNumberOfRowsPerPage,
});`;

  public readonly getPaginationCurrentPageCode = `this.table.apiEvent({
  type: API.getPaginationCurrentPage,
});`;

  public readonly setSortByCode = `this.table.apiEvent({
  type: API.sortBy,
  value: { column: 'phone', order: 'asc' },
});`;
  public readonly setPaginationDisplayLimitCode = `this.table.apiEvent({
  type: API.setPaginationDisplayLimit,
  value: 10,
});`;
}
