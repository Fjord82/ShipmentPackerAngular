///<reference path="../../../../node_modules/@angular/forms/src/validators.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {ColliList} from '../../workshop/colli/shared/colli.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ColliService} from '../../workshop/colli/shared/colli.service';

@Component({
  selector: 'app-admin-colli-edit',
  templateUrl: './admin-colli-edit.component.html',
  styleUrls: ['./admin-colli-edit.component.css']
})
export class AdminColliEditComponent implements OnInit {

  colli: ColliList;
  colliGroup: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private route: ActivatedRoute, private colliService: ColliService) {
    this.colliGroup = this.fb.group({
      totalWeight: ['', Validators.required],
      dimensions: ['', Validators.required],
      freightType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.colliService.getById(+params.get('id')))
      .subscribe(colli => this.colli = colli);

  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  save() {
    const values = this.colliGroup.value;
    if (values.totalWeight == "") values.totalWeight = this.colli.totalWeight;
    if (values.dimensions == "") values.dimensions = this.colli.dimensions;
    if (values.freightType == "") values.freightType = this.colli.freightType;
    this.colli = <ColliList> {
      id: this.colli.id,
      projectName: this.colli.projectName,
      netWeight: this.colli.netWeight,
      worker: this.colli.worker,
      totalWeight: values.totalWeight,
      dimensions: values.dimensions,
      freightType: values.freightType,
      isActive: this.colli.isActive,
      itemType: this.colli.itemType,
      packingListIds: this.colli.packingListIds,
      packingLists: this.colli.packingLists
    };

    this.colliService.update(this.colli).subscribe(colli => this.back());
  }

  setInactive() {
    this.colli.isActive = false;
  }

  setActive() {
    this.colli.isActive = true;
  }
}
