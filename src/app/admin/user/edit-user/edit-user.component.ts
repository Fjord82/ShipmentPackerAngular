import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '../shared/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../shared/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  userToDelete: User;
  user: User;
  formGroup: FormGroup;
  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      workEmail: ['', Validators.required],
      password: ['', Validators.required],
      homePhoneNumber: '',
      workPhoneNumber: ['', Validators.required],
      workTitle: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.userService.getById(+params.get('id')))
      .subscribe(user => this.user = user);
  }

  back() {
    this.router.navigateByUrl('/manage-users');
  }

  deleteUser(user: User, $event) {
    this.userToDelete = user;
    $event.stopPropagation();
  }

  deleteAborted($event) {
    this.userToDelete = null;
    $event.stopPropagation();
  }

  deleteConfirmed($event) {
    this.userService.delete(this.userToDelete.id)
      .subscribe(
        user => {
          this.back()
        });
    $event.stopPropagation();
  }

  update() {
    const values = this.formGroup.value;
    if (values.firstName == "") values.firstName = this.user.firstName;
    if (values.lastName == "") values.lastName = this.user.lastName;
    if (values.workEmail == "") values.workEmail = this.user.workEmail;
    if (values.password == "") values.password = this.user.password;
    if (values.workPhoneNumber == "") values.workPhoneNumber = this.user.workPhoneNumber;
    if (values.workTitle == "") values.workTitle = this.user.workTitle;
    if (values.homePhoneNumber == "") values.homePhoneNumber = this.user.homePhoneNumber;
    this.user = <User> {
      id: this.user.id,
      firstName: values.firstName,
      lastName: values.lastName,
      workEmail: values.workEmail,
      password: values.password,
      workPhoneNumber: values.workPhoneNumber,
      workTitle: values.workTitle,
      homePhoneNumber: values.homePhoneNumber,
    };
    this.userService.update(this.user).subscribe(user => this.back());
  }

}
