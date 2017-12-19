import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../office/project/shared/project.service';
import {PackingService} from '../../office/packing/shared/packing.service';
import {UtilityService} from '../../shared/utility.service';
import {Packing} from '../../office/packing/shared/packing.model';
import {Project} from '../../office/project/shared/project.model';

@Component({
  selector: 'app-admin-project-detail',
  templateUrl: './admin-project-detail.component.html',
  styleUrls: ['./admin-project-detail.component.css']
})
export class AdminProjectDetailComponent implements OnInit {

  inactive: Packing[];
  active: Packing[];
  packing: Packing;
  packings: Packing[];
  project: Project;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private packingService: PackingService,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.setup(project));
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  setup(project: Project) {
    this.project = project;
    this.sortActive(this.project.packingLists);
    this.sortInactive(this.project.packingLists);
  }

  sortActive(packing: Packing[]) {
    this.active = [];
    this.active = this.utilityService.activeList(packing);
  }

  sortInactive(packing: Packing[]) {
    this.inactive = [];
    this.inactive = this.utilityService.inactiveList(packing);
  }

}
