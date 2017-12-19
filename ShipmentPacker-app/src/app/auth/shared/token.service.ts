import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import {JwtHelper} from 'angular2-jwt';
import {User} from '../../admin/user/shared/user.model';

@Injectable()
export class TokenService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public setToken(token: string) {
    localStorage.setItem('token', token);
  }

  public clearToken() {
    localStorage.removeItem('token');
  }

  public isAuthenticated(): Observable<boolean> {
    // get the token
    return Observable.create(obs => {
      obs.next(this.getToken());
    });
  }

  public getUserFromToken(): Observable<User> {
    return Observable.create(obs => {
      const token = this.getToken();
      let decoded: User;
      if (token) {
        const jwt = new JwtHelper();
        decoded = jwt.decodeToken(token);
      }
      obs.next(decoded);
    });

  }
}
