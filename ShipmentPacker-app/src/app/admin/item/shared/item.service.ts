import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from './item.model';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../environments/environment';
const url = environment.apiEndpoint + '/items';

@Injectable()
export class ItemService {

  constructor(private http: HttpClient) { }

  create(item: Item): Observable<Item> {
    return this.http
      .post<Item>(url, item);
  }

  getItems(): Observable<Item[]> {
    return this.http
      .get<Item[]>(url);
  }

  getById(id: number): Observable<Item> {
    return this.http
      .get<Item>(url + '/' + id);
  }

  delete(id: number): Observable<Item> {
    return this.http
      .delete<Item>(url + '/' + id);
  }

  update(item: Item): Observable<Item> {
    return this.http.put(url + '/' + item.id, item);
  }
}
