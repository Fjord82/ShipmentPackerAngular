import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

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

  model: NgbDateStruct;
  date: {year: number, month: number};

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.project = project);
  }

  back() {
    this.router.navigateByUrl('/office');
  }

  save() {
    const values = this.projectGroup.value;
    if (values.projectName == "") values.projectName = this.project.projectName;
    if (values.customerName == "") values.customerName = this.project.customerName;
    if (values.creatorName == "") values.creatorName = this.project.creatorName;
    this.project = {
      id: this.project.id,
      projectName: values.projectName,
      customerName: values.customerName,
      creatorName: values.creatorName,
    };
    this.projectService.update(this.project).subscribe(proj => this.back());
  }
}
