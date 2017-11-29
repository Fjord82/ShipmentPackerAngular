import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Project} from "../shared/project.model";
import {ProjectService} from "../shared/project.service";

const now = new Date();

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  projectGroup: FormGroup;
  constructor(private router: Router, private fb: FormBuilder, private projectService: ProjectService) {
    this.projectGroup = this.fb.group({
      projectName: ['', Validators.required],
      customerName: ['', Validators.required],
      creatorName: ['', Validators.required],
      /*deliveryAddress: ['', Validators.required],*/
    });
  }


  ngOnInit() {
  }

  model: NgbDateStruct;
  date: { year: number, month: number };

  back() {
    this.router.navigateByUrl('/office');
  }

    save() {
    const values = this.projectGroup.value;
    const project: Project = {
      ProjectName: values.projectName,
      CustomerName: values.customerName,
      CreatorName: values.creatorName,
    };
    this.projectService.create(project)
      .subscribe(proj => console.log(project));
    }

    submit() {
    this.save();
    this.back();
    }

}

