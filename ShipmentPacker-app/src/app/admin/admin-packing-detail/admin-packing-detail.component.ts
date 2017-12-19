import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Packing} from '../../office/packing/shared/packing.model';
import {PackingService} from '../../office/packing/shared/packing.service';

@Component({
  selector: 'app-admin-packing-detail',
  templateUrl: './admin-packing-detail.component.html',
  styleUrls: ['./admin-packing-detail.component.css']
})
export class AdminPackingDetailComponent implements OnInit {

  progress: number;
  packing: Packing;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private packingService: PackingService) {
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
    this.router.navigateByUrl('/admin');
  }

}
