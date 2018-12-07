import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyService {
  private readonly BACKEND_URL = 'https://my-json-server.typicode.com/ssuperczynski/ngx-easy-table/company?';

  constructor(private http: HttpClient) {
  }

  getCompanies(params: string): Observable<Company[]> {
    return this.http
      .get<Company[]>(`${this.BACKEND_URL}${params}`);
  }
}

export interface Company {
  email: string;
  company: string;
  eyeColor: string;
  age: number;
  balance: string;
  surname: string;
  name: string;
  id: number;
}
