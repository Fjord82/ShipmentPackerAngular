import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackingService} from '../../office/packing/shared/packing.service';
import {ProjectService} from '../../office/project/shared/project.service';
import {Project} from '../../office/project/shared/project.model';
import {Packing} from '../../office/packing/shared/packing.model';
import {ColliService} from '../../workshop/colli/shared/colli.service';
import {ColliList} from '../../workshop/colli/shared/colli.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {



  colli: ColliList;
  collis: ColliList[];
  packing: Packing;
  packings: Packing[];
  project: Project;
  projects: Project[];
  constructor(private router: Router,
              private projectService: ProjectService,
              private packingService: PackingService,
              private colliService: ColliService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      projects => {
        this.projects = projects;
      });

    this.packingService.getPackings().subscribe(
      packings => {
        this.packings = packings;
      });

    this.colliService.getCollis().subscribe(
      collis => {
        this.collis = collis;
      });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  clickProject(project: Project) {
    this.router.navigateByUrl('/admin-project-detail/'+project.id);
  }

  clickPacking(packing: Packing) {
    this.router.navigateByUrl('/admin-packing-detail/'+packing.id);
  }

  clickColli(colli: ColliList) {
    this.router.navigateByUrl('/admin-colli-detail/'+colli.id);
  }

  manageUsers() {
    this.router.navigateByUrl('/manage-users');
  }

  manageItems() {
    this.router.navigateByUrl('/manage-items');
  }

}
