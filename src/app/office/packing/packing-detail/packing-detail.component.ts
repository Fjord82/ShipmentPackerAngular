import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Packing} from '../shared/packing.model';
import {PackingService} from '../shared/packing.service';
import {PackItem} from "../shared/packItem.model";
import {PackItemService} from "../shared/pack-item.service";

@Component({
  selector: 'app-packing-detail',
  templateUrl: './packing-detail.component.html',
  styleUrls: ['./packing-detail.component.css']
})
export class PackingDetailComponent implements OnInit {

  progress: number;
  packing: Packing;
  packItems: PackItem[];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private packingService: PackingService,
              private packItemService: PackItemService) {
    this.progress = 100;
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => this.setup(packing));

  }

  setup(packing: Packing){
    this.packing = packing;
    let totalPacked: number = 0;
    let totalCount: number = 0;

    for (let packItem of packing.packItems){
      totalPacked = totalPacked + packItem.packed;
      totalCount = totalCount + packItem.count;
    }
    this.progress = Math.round((totalPacked / totalCount) * 100);
  }


  back() {
    this.router.navigateByUrl('/project-detail/'+this.packing.projectIds[0]);
  }



}
