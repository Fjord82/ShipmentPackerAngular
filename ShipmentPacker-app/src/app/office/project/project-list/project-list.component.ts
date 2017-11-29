import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  constructor(private router: Router, private projectService: ProjectService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      projects => {
        this.projects = projects;
      });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  addProject() {
    this.router.navigateByUrl('/add-packingList');
  }

  clickProject() {
    this.router.navigateByUrl('/projectName');
  }

  edit(){
    this.router.navigateByUrl('/editProject')
  }
}
