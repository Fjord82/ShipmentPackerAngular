import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Packing} from '../../../office/packing/shared/packing.model';
import {PackingService} from '../../../office/packing/shared/packing.service';

@Component({
  selector: 'app-packing-detail-workshop',
  templateUrl: './packing-detail-workshop.component.html',
  styleUrls: ['./packing-detail-workshop.component.css']
})
export class PackingDetailWorkshopComponent implements OnInit {

  packing: Packing;
  constructor(private router: Router,
              private packingService: PackingService,
              private route: ActivatedRoute){
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => this.packing = packing);
  }

  back() {
    this.router.navigateByUrl('/workshop')
  }

  addColli() {
    this.router.navigateByUrl('/addColli/'+this.packing.id)
  }

}
