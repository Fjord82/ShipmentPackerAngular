import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {ColliList} from './colli.model';
import {environment} from '../../../../environments/environment';

const url=environment.apiEndpoint + '/colliLists';

@Injectable()
export class ColliService {

  constructor(private http: HttpClient) { }

  create(colli: ColliList): Observable<ColliList> {
    return this.http
      .post<ColliList>(url, colli);
  }

  getCollis(): Observable<ColliList[]> {
    return this.http
      .get<ColliList[]>(url);
  }

  getById(id: number): Observable<ColliList> {
    return this.http
      .get<ColliList>(url + '/' + id);
  }

  delete(id: number): Observable<ColliList> {
    return this.http
      .delete<ColliList>(url + '/' + id);
  }

  update(colli: ColliList): Observable<ColliList> {
    return this.http.put(url + '/' + colli.id, colli);
  }

}
