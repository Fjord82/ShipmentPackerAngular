import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Packing} from '../../../office/packing/shared/packing.model';
import {PackingService} from '../../../office/packing/shared/packing.service';
import {ColliList} from '../../colli/shared/colli.model';
import {PackItem} from '../../../office/packing/shared/packItem.model';

@Component({
  selector: 'app-packing-detail-workshop',
  templateUrl: './packing-detail-workshop.component.html',
  styleUrls: ['./packing-detail-workshop.component.css']
})
export class PackingDetailWorkshopComponent implements OnInit {

  progress: number;
  packing: Packing;
  constructor(private router: Router,
              private packingService: PackingService,
              private route: ActivatedRoute){
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
    this.router.navigateByUrl('/workshop')
  }

  addColli() {
    this.router.navigateByUrl('/addColli/'+this.packing.id)
  }

  editColli(colliList: ColliList) {
    this.router.navigateByUrl('/edit-colli/'+colliList.id)
  }

  colliClick(colliList: ColliList) {
    this.router.navigateByUrl('/colli-detail/'+colliList.id)
  }
}
