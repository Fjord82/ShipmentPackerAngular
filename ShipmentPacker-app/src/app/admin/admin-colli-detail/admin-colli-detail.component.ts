import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ColliList} from '../../workshop/colli/shared/colli.model';
import {ColliService} from '../../workshop/colli/shared/colli.service';

@Component({
  selector: 'app-admin-colli-detail',
  templateUrl: './admin-colli-detail.component.html',
  styleUrls: ['./admin-colli-detail.component.css']
})
export class AdminColliDetailComponent implements OnInit {

  colli: ColliList;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private colliService: ColliService) { }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.colliService.getById(+params.get('id')))
      .subscribe(colli => this.colli = colli);
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

}
