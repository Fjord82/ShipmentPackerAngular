import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Packing} from '../../../office/packing/shared/packing.model';
import {PackingService} from '../../../office/packing/shared/packing.service';

@Component({
  selector: 'app-workshop-project-list',
  templateUrl: './workshop-packing-list.component.html',
  styleUrls: ['./workshop-packing-list.component.css']
})
export class WorkshopPackingListComponent implements OnInit {

  packing: Packing;
  packings: Packing[];
  constructor(private router: Router,
              private packingService: PackingService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => this.packing = packing);

    this.packingService.getPackings().subscribe(
      packings => {
        this.packings = packings;
      });
  }

  logoutbtn() {
    this.router.navigateByUrl('/login');
  }
  clickPackingDetail(packing: Packing) {
    this.router.navigateByUrl('/packingDetailWorkshop/'+packing.id)
  }
}
