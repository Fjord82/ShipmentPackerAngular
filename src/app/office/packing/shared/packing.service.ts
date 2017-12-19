import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {Packing} from "./packing.model";

const url = environment.apiEndpoint + '/packinglists';

@Injectable()
export class PackingService {

  constructor(private http: HttpClient) { }

  create(packing: Packing): Observable<Packing> {
    return this.http
      .post<Packing>(url, packing);
  }

  getPackings(): Observable<Packing[]> {
    return this.http
      .get<Packing[]>(url);
  }

  getById(id: number): Observable<Packing> {
    return this.http
      .get<Packing>(url + '/' + id);
  }

  delete(id: number): Observable<Packing> {
    return this.http
      .delete<Packing>(url + '/' + id);
  }

  update(packing: Packing): Observable<Packing> {
    return this.http.put<Packing>(url + '/' + packing.id, packing);
  }

}
