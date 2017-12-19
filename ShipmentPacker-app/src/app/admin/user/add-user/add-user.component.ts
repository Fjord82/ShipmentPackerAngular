import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../shared/user.model';
import {UserService} from '../shared/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {


  user: User;
  formGroup: FormGroup;
  constructor(private router: Router,
              private userService: UserService,
              private fb: FormBuilder) {
    this.formGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      privatePhone: '',
      workPhone: ['', Validators.required],
      workTitle: ['', Validators.required],
    });

  }

  ngOnInit() {
  }

  back() {
    this.router.navigateByUrl('/manage-users');
  }

  save() {
    const values = this.formGroup.value;
    const user: User = <User> {
      firstName: values.firstName,
      lastName: values.lastName,
      homePhoneNumber: values.privatePhone,
      workPhoneNumber: values.workPhone,
      workEmail: values.email,
      password: values.password,
      workTitle: values.workTitle

    };
    this.userService.create(user)
      .subscribe(user => this.back());
  }

}
