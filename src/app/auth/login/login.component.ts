import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../shared/login.service';
import {NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import {TokenService} from '../shared/token.service';
import {User} from '../../admin/user/shared/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  failLogin = false;
  model: any = {};
  loginGroup: FormGroup;
  constructor(private router: Router,
              private auth: LoginService,
              private tokenService: TokenService) {
    this.loginGroup = new FormGroup({
      workEmail: new FormControl(),
      password: new FormControl()
  });
  }

  ngOnInit() {
  }

  login() {
    this.failLogin = false;

    this
      .auth.login(this.loginGroup.value).subscribe(token => {
      if (token) {
        this.redirect();
      }
    },
      err => {
        if (err.status === 401) {
          this.failLogin = true;
        }
      });
  }

  redirect() {
    let thisUser: User;

    this.tokenService.getUserFromToken().subscribe(user => thisUser = user);

    if (thisUser.workTitle == "Office")
    {
      this.kontor();
    }
    if (thisUser.workTitle == "Workshop"){
      this.lager();
    }
    if (thisUser.workTitle == "Admin"){
      this.admin();
    }
  }

  kontor() {
    this.router.navigateByUrl('/office');
  }

  lager() {
    this.router.navigateByUrl('/workshop');
  }

  admin() {
    this.router.navigateByUrl('/admin');
  }

}
