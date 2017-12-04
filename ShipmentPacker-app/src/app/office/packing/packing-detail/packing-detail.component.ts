import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Packing} from '../shared/packing.model';
import {PackingService} from '../shared/packing.service';

@Component({
  selector: 'app-packing-detail',
  templateUrl: './packing-detail.component.html',
  styleUrls: ['./packing-detail.component.css']
})
export class PackingDetailComponent implements OnInit {

  packing: Packing;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private packingService: PackingService) {
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => this.packing = packing);
  }

  back() {
    this.router.navigateByUrl('/office');
  }

  clickProject() {

  }

}
