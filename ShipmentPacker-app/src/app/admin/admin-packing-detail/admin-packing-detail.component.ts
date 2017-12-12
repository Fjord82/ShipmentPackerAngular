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

  packing: Packing;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private packingService: PackingService) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => this.packing = packing);
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

}
