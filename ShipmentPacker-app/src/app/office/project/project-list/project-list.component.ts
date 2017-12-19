import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../shared/project.model';
import {ProjectService} from '../shared/project.service';
import {Packing} from '../../packing/shared/packing.model';
import {LoginService} from '../../../auth/shared/login.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  projects: Project[];
  constructor(private router: Router,
              private projectService: ProjectService,
              private loginService: LoginService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      projects => {
        this.projects = projects;
      });
  }

  logout() {
    this.loginService.logout().subscribe(bool => this.router.navigateByUrl('/login'));

  }

  addProject() {
    this.router.navigateByUrl('/add-project');
  }

  clickProject(project: Project) {
    this.router.navigateByUrl('/project-detail/'+project.id);
  }

  edit(project: Project){
    this.router.navigateByUrl('/edit-project/'+project.id)
  }

}
