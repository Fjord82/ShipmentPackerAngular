import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  user: User;
  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/manage-users');
  }

}
