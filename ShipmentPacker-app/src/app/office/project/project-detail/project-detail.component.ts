import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {Project} from '../shared/project.model';
import 'rxjs/add/operator/switchMap';
import {Packing} from '../../packing/shared/packing.model';
import {PackingService} from '../../packing/shared/packing.service';
import {UtilityService} from '../../../shared/utility.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

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

  back() {
    this.router.navigateByUrl('/office');
  }

  packingClick(packing: Packing) {
    this.router.navigateByUrl('/packing-detail/'+packing.id);
  }

  addPackingClick() {
    this.router.navigateByUrl('/addPackingList/'+this.project.id);
  }

  editPacking(packing: Packing){
    this.router.navigateByUrl('/edit-packing/'+packing.id)
  }

}
