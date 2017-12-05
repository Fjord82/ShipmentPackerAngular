import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColliService} from '../shared/colli.service';
import {Packing} from '../../../office/packing/shared/packing.model';
import {ColliList} from '../shared/colli.model';

@Component({
  selector: 'app-edit-colli',
  templateUrl: './edit-colli.component.html',
  styleUrls: ['./edit-colli.component.css']
})
export class EditColliComponent implements OnInit {

  colli: ColliList;
  colliGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private colliService: ColliService) {
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
    this.router.navigateByUrl('packingDetailWorkshop/'+this.colli.packingListIds[0])
  }
  save() {
    const values = this.colliGroup.value;
    if (values.totalWeight == "") values.totalWeight = this.colli.totalWeight;
    if (values.dimensions == "") values.dimensions = this.colli.dimensions;
    if (values.freightType == "") values.freightType = this.colli.freightType;
    this.colli = <ColliList> {
      totalWeight: values.totalWeight,
      dimensions: values.dimensions,
      freightType: values.freightType,
    };
    this.colliService.update(this.colli).subscribe(colli => this.back());
  }

}
