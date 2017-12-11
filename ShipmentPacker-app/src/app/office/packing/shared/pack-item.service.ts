import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PackItem} from './packItem.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';

const url = environment.apiEndpoint + '/packitems';

@Injectable()
export class PackItemService {

  constructor(private http: HttpClient) { }

  create(packItem: PackItem): Observable<PackItem> {
    return this.http
      .post<PackItem>(url, packItem);
  }

  createList(packItems: PackItem[]): Observable<PackItem[]> {
    return this.http
      .post<PackItem[]>(url+"/list", packItems);
  }

  getPackItems(): Observable<PackItem[]> {
    return this.http
      .get<PackItem[]>(url);
  }

  getById(id: number): Observable<PackItem> {
    return this.http
      .get<PackItem>(url + '/' + id);
  }

  delete(id: number): Observable<PackItem> {
    return this.http
      .delete<PackItem>(url + '/' + id);
  }

  update(packItem: PackItem): Observable<PackItem> {
    return this.http.put<PackItem>(url + '/' + packItem.id, packItem);
  }

  updateList(packItems: PackItem[]): Observable<PackItem[]> {
    return this.http.put<PackItem[]>(url + '/list', packItems);
  }
}
