import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {TokenService} from '../shared/token.service';

@Injectable()
export class AdminGuard implements CanActivate {


  constructor(private router: Router,
              private tokenService: TokenService){}

  canActivate(): any {
    return this.tokenService.getUserFromToken().take(1).map(user => {
      if(user && user.workTitle == 'Admin')
      {
        return true;
      } else
      {
        this.router.navigateByUrl('/no-access');
        return false;
      }
    });

  }
}
