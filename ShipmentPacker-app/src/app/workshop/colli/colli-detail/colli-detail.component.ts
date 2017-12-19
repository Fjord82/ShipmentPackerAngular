import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Packing} from '../../../office/packing/shared/packing.model';
import {ColliList} from '../shared/colli.model';
import {ColliService} from '../shared/colli.service';

@Component({
  selector: 'app-colli-detail',
  templateUrl: './colli-detail.component.html',
  styleUrls: ['./colli-detail.component.css']
})
export class ColliDetailComponent implements OnInit {


  colli: ColliList;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private colliService: ColliService) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.colliService.getById(+params.get('id')))
      .subscribe(colli => this.colli = colli);
  }

  back() {
    this.router.navigateByUrl('packingDetailWorkshop/'+this.colli.packingListIds[0])
  }

}
