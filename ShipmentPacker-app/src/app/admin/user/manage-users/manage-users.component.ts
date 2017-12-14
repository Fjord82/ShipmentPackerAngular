import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: User[];
  constructor(private router: Router,
              private userService: UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
        this.users = users;
      });
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  addUser() {
    this.router.navigateByUrl('/add-user');
  }

  editUser(user: User) {
    this.router.navigateByUrl('/edit-user/'+user.id);
  }

}
