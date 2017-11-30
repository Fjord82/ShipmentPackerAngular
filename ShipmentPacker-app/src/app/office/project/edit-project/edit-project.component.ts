import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Project} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  project: Project;
  constructor(private router: Router,
              private projectService: ProjectService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.project = project);
  }

  model: NgbDateStruct;
  date: {year: number, month: number};

  backbtn() {
    this.router.navigateByUrl('/office');
  }

  save() {
    this.router.navigateByUrl('/office')
  }
}
