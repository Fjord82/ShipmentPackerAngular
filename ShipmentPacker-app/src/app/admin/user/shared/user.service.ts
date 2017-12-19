import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {User} from './user.model';
import {environment} from '../../../../environments/environment';

const url = environment.apiEndpoint + '/users';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }


  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(url);
  }

  getById(id: number): Observable<User> {
    return this.http
      .get<User>(url + '/' + id);
  }

  create(user: User): Observable<User> {
    return this.http
      .post<User>(url, user);
  }

  delete(id: number): Observable<User> {
    return this.http
      .delete<User>(url + '/' + id);
  }

  update(user: User): Observable<User> {
    return this.http.put(url + '/' + user.id, user);
  }

}
