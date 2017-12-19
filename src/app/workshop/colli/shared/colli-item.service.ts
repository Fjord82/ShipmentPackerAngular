import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ColliItem} from './colliItem.model';
const url=environment.apiEndpoint + '/colliItems';

@Injectable()
export class ColliItemService {

  constructor(private http: HttpClient) {
  }

  create(colliItem: ColliItem): Observable<ColliItem> {
    return this.http
      .post<ColliItem>(url, colliItem);
  }

  getCollis(): Observable<ColliItem[]> {
    return this.http
      .get<ColliItem[]>(url);
  }

  getById(id: number): Observable<ColliItem> {
    return this.http
      .get<ColliItem>(url + '/' + id);
  }

  delete(id: number): Observable<ColliItem> {
    return this.http
      .delete<ColliItem>(url + '/' + id);
  }

  update(colliItem: ColliItem): Observable<ColliItem> {
    return this.http.put<ColliItem>(url + '/' + colliItem.id, colliItem);
  }
}
