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
    console.log(this.loginGroup.value);
    this.auth.login(this.loginGroup.value).subscribe(token => {
      if (token) {
        console.log(token);
        this.redirect(token);
      } else {

      }

    });
  }

  redirect(token: string) {
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
