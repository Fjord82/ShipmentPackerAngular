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

  officeWorkers: User[];
  workshopEmployees: User[];
  admins: User[];

  constructor(private router: Router,
              private userService: UserService) {

    this.officeWorkers = [];
    this.workshopEmployees = [];
    this.admins = [];
  }

  ngOnInit() {
    this.userService.getUsers().subscribe(
      users => {
                 this.sortUsers(users);
      });
  }

  sortUsers(users: User[]){
    for (let user of users)
    {
      if(user.workTitle == "Office")
      {
        this.officeWorkers.push(user);
      }
      if(user.workTitle == "Workshop")
      {
        this.workshopEmployees.push(user)   ;
      }
      if(user.workTitle == "Admin")
      {
        this.admins.push(user);
      }
    }
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  edit(/*USER*/) {

  }

  addUser() {
    this.router.navigateByUrl('/add-user');
  }

  editUser() {
    this.router.navigateByUrl('/edit-user');
  }


}
