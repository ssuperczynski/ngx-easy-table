import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CompanyService {
  private readonly BACKEND_URL =
    'https://my-json-server.typicode.com/ssuperczynski/ngx-easy-table/company?';

  constructor(private http: HttpClient) {}

  getCompanies(params: string = '', observe: boolean = true): Observable<HttpResponse<Company[]>> {
    return this.http.get<Company[]>(`${this.BACKEND_URL}${params}`, {
      observe: observe ? 'response' : null,
    });
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
