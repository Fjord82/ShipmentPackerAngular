import { Injectable } from '@angular/core';
import {FreightCondition} from './freightCondition.model';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

const url = environment.apiEndpoint + '/freightConditions';

@Injectable()
export class FreightConditionService {

  constructor(private http: HttpClient) { }

  create(freightCondition: FreightCondition): Observable<FreightCondition> {
    return this.http
      .post<FreightCondition>(url, freightCondition);
  }

  getFreightConditions(): Observable<FreightCondition[]> {
    return this.http
      .get<FreightCondition[]>(url);
  }

  getById(id: number): Observable<FreightCondition> {
    return this.http
      .get<FreightCondition>(url + '/' + id);
  }

  delete(id: number): Observable<FreightCondition> {
    return this.http
      .delete<FreightCondition>(url + '/' + id);
  }

  update(freightCondition: FreightCondition): Observable<FreightCondition> {
    return this.http.put(url + '/' + freightCondition.id, freightCondition);
  }
}
