import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {Project} from '../shared/project.model';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  project: Project;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.project = project);
  }

  backbtn() {
    this.router.navigateByUrl('/office');
  }

  packingClick() {
    this.router.navigateByUrl('/packingName');
  }

  addPackingClick() {
    this.router.navigateByUrl('/addPackingList');
  }

}
