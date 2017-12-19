import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Project} from '../../office/project/shared/project.model';
import {ProjectService} from '../../office/project/shared/project.service';

@Component({
  selector: 'app-admin-project-edit',
  templateUrl: './admin-project-edit.component.html',
  styleUrls: ['./admin-project-edit.component.css']
})
export class AdminProjectEditComponent implements OnInit {

  project: Project;
  projectGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private projectService: ProjectService,
              private route: ActivatedRoute){
    this.projectGroup = this.fb.group({
      projectName: ['', Validators.required],
      customerName: ['', Validators.required],
      creatorName: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.project = project);
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  setInactive() {
    this.project.isActive = false;
  }

  setActive() {
    this.project.isActive = true;
  }

  update() {
    const values = this.projectGroup.value;
    if (values.projectName == "") values.projectName = this.project.projectName;
    if (values.customerName == "") values.customerName = this.project.customerName;
    if (values.creatorName == "") values.creatorName = this.project.creatorName;

    this.project = <Project> {
      id: this.project.id,
      projectName: values.projectName,
      customerName: values.customerName,
      creatorName: values.creatorName,
      isActive: this.project.isActive,
      
    };
    this.projectService.update(this.project).subscribe(proj => this.back());
  }



}
