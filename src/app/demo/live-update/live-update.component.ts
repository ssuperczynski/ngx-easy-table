import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ConfigService } from './configuration.service';

interface Data {
  status: string;
  amount: number;
  company: string;
  limit: number;
  balance: number;
}

@Component({
  selector: 'app-live-update',
  templateUrl: './live-update.component.html',
  styleUrls: ['./live-update.component.css'],
  providers: [ConfigService],
})
export class LiveUpdateComponent implements OnInit, AfterViewInit {

  array: Data[] = [
    { status: 'ACTIVE', amount: 1, company: 'Foo', limit: 1000, balance: 2000 },
    { status: 'INACTIVE', amount: 2, company: 'Bar', limit: 1000, balance: 900 },
    { status: 'INACTIVE', amount: 22, company: 'Boo', limit: 10, balance: 2220 },
    { status: 'INACTIVE', amount: 212, company: 'Baz', limit: 4000, balance: 1900 },
    { status: 'ACTIVE', amount: 33, company: 'Some', limit: 600, balance: 1200 },
  ];
  data: Data[] = [];
  columns = [
    { key: 'status', title: 'Is active' },
    { key: 'amount', title: 'Amount' },
    { key: 'company', title: 'Company' },
    { key: 'limit', title: 'Limit' },
    { key: 'balance', title: 'Balance' },
  ];
  configuration;

  constructor() {
    this.configuration = ConfigService.config;
  }

  static random(min, max) {
    return Math.floor(min + (Math.random() * (max - min + 1)));
  }

  ngOnInit() {
    this.data = this.array;
  }

  ngAfterViewInit() {
    this.update(this.array);
  }

  update(array): void {
    setInterval(() => {
      array[LiveUpdateComponent.random(0, 3)]['limit'] = LiveUpdateComponent.random(500, 4000);
      array[LiveUpdateComponent.random(0, 3)]['balance'] = LiveUpdateComponent.random(900, 1100);
      array[LiveUpdateComponent.random(0, 3)]['amount'] = LiveUpdateComponent.random(100, 9100);
    }, 800);
  }
}
