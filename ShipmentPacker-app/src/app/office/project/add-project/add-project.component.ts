import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Project} from "../shared/project.model";
import {ProjectService} from "../shared/project.service";
import {User} from '../../../admin/user/shared/user.model';
import {TokenService} from '../../../auth/shared/token.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  user: User;
  projectGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private projectService: ProjectService,
              private  tokenService: TokenService) {
    this.projectGroup = this.fb.group({
      projectName: ['', Validators.required],
      customerName: ['', Validators.required],
    });
  }


  ngOnInit() {
    this.tokenService.getUserFromToken().subscribe(user => this.user = user);
  }

  back() {
    this.router.navigateByUrl('/office');
  }

    save() {
    const values = this.projectGroup.value;
    const project: Project = <Project>{
      projectName: values.projectName,
      customerName: values.customerName,
      creatorName: this.user.firstName + " " + this.user.lastName,
      isActve: true
    };
      this.projectService.create(project).subscribe(proj => this.back());
    }
}

