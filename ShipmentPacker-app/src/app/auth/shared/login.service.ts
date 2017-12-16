import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import {JwtHelper} from 'angular2-jwt';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {TokenService} from './token.service';
import {User} from '../../admin/user/shared/user.model';
const url = environment.apiEndpoint + '/token';

@Injectable()
export class LoginService {

  constructor(private http: HttpClient,
              private tokenService: TokenService) { }

  public login(user: User): Observable<string> {
    const body = new HttpParams()
      .set('workEmail', user.workEmail)
      .set('password', user.password);

    return this.http.post<any>(url, body.toString(), {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/x-www-form-urlencoded')
      }
    ).switchMap(token => Observable.create(obs => {
      this.tokenService.setToken(token.value);
      obs.next(token.value);
    }));
  }

  public logout(): Observable<boolean> {
    return Observable.create(obs => {
      this.tokenService.clearToken();
      obs.next(!this.tokenService.getToken());
    });
  }
}
