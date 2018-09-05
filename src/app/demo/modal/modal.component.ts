import { Component } from '@angular/core';
import { Company, data } from '../../../assets/data';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  providers: [ConfigService],
})
export class ModalComponent {
  modal = false;
  selected;
  columns = [
    { key: 'age', title: 'Age' },
    { key: 'company', title: 'Company' },
    { key: 'name', title: 'Name' },
    { key: 'isActive', title: 'STATUS' },
    { key: 'isActive', title: 'Edit' },
  ];
  data: Company[] = [];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }

  onEvent(event) {
    console.log(event);
    this.selected = JSON.stringify(event.value.row, null, 2);
  }

  showModal() {
    this.modal = true;
  }

  hideModal() {
    this.modal = false;
  }
}
