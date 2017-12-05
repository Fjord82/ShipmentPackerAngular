import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Colli} from './colli.model';
import {environment} from '../../../../environments/environment';

const url=environment.apiEndpoint + '/colliLists';

@Injectable()
export class ColliService {

  constructor(private http: HttpClient) { }

  create(colli: Colli): Observable<Colli> {
    return this.http
      .post<Colli>(url, colli);
  }

  getCollis(): Observable<Colli[]> {
    return this.http
      .get<Colli[]>(url);
  }

  getById(id: number): Observable<Colli> {
    return this.http
      .get<Colli>(url + '/' + id);
  }

  delete(id: number): Observable<Colli> {
    return this.http
      .delete<Colli>(url + '/' + id);
  }

  update(colli: Colli): Observable<Colli> {
    return this.http.put(url + '/' + colli.id, colli);
  }

}
