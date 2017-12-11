import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Packing} from '../../../office/packing/shared/packing.model';
import {PackingService} from '../../../office/packing/shared/packing.service';
import {UtilityService} from '../../../shared/utility.service';

@Component({
  selector: 'app-workshop-project-list',
  templateUrl: './workshop-packing-list.component.html',
  styleUrls: ['./workshop-packing-list.component.css']
})
export class WorkshopPackingListComponent implements OnInit {

  active: Packing[];
  packing: Packing;
  packings: Packing[];
  constructor(private router: Router,
              private packingService: PackingService,
              private route: ActivatedRoute,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.packingService.getPackings().subscribe(
      packings => {
        this.sortLists(packings);
      });
  }

  sortLists(packing: Packing[]) {
    this.active = this.utilityService.activeList(packing);
  }


  logoutbtn() {
    this.router.navigateByUrl('/login');
  }

  clickPackingDetail(packing: Packing) {
    this.router.navigateByUrl('/packingDetailWorkshop/'+packing.id)
  }
}
