import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../shared/project.service';
import {Project} from '../shared/project.model';
import 'rxjs/add/operator/switchMap';
import {Packing} from '../../packing/shared/packing.model';
import {PackingService} from '../../packing/shared/packing.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css']
})
export class ProjectDetailComponent implements OnInit {

  packing: Packing;
  packings: Packing[];
  project: Project;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private projectService: ProjectService,
              private packingService: PackingService) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.project = project);

    this.packingService.getPackings().subscribe(
      packings => {
        this.packings = packings;
      });
  }

  back() {
    this.router.navigateByUrl('/office');
  }

  packingClick(packing: Packing) {
    this.router.navigateByUrl('/packing-detail/'+packing.id);
  }

  addPackingClick() {
    this.router.navigateByUrl('/addPackingList');
  }

  editPacking(packing: Packing){
    this.router.navigateByUrl('/edit-packing/'+packing.id)
  }

}
