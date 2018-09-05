import { Component } from '@angular/core';
import { data } from '../../../assets/many-columns';
import { ConfigService } from './configuration.service';

@Component({
  selector: 'app-horizontal-scroll',
  templateUrl: './horizontal-scroll.component.html',
  styleUrls: ['./horizontal-scroll.component.css'],
  providers: [ConfigService],
})
export class HorizontalScrollComponent {
  data;
  columns = [
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
    { key: 'company12', title: 'Company12' },
    { key: 'company13', title: 'Company13' },
    { key: 'company14', title: 'Company14' },
    { key: 'company15', title: 'Company15' },
    { key: 'company16', title: 'Company16' },
    { key: 'company18', title: 'Company17' },
    { key: 'company18', title: 'Company18' },
    { key: 'company19', title: 'Company19' },
  ];

  configuration;

  constructor() {
    this.configuration = ConfigService.config;
    this.data = data;
  }
}
