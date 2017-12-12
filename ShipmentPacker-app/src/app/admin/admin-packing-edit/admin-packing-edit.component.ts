import { Component, OnInit } from '@angular/core';
import {Packing} from '../../office/packing/shared/packing.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PackingService} from '../../office/packing/shared/packing.service';
import {NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-packing-edit',
  templateUrl: './admin-packing-edit.component.html',
  styleUrls: ['./admin-packing-edit.component.css']
})
export class AdminPackingEditComponent implements OnInit {

  packing: Packing;
  packingGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private packingService: PackingService,
              private route: ActivatedRoute,
              private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.packingGroup = this.fb.group({
      packingName: ['', Validators.required],
      creatorName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => {this.packing = packing});
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  save() {
    const values = this.packingGroup.value;
    if (values.packingName == "") values.packingName = this.packing.packingName;
    if (values.creatorName == "") values.creatorName = this.packing.creatorName;
    if (values.deliveryAddress == "") values.deliveryAddress = this.packing.deliveryAddress;
    if (values.deliveryDate == "") values.deliveryDate = this.packing.deliveryDate;
    else {
      values.deliveryDate = this.ngbDateParserFormatter.format(values.deliveryDate);
    }

    this.packing = <Packing> {
      id: this.packing.id,
      packingName: values.packingName,
      creatorName: values.creatorName,
      deliveryAddress: values.deliveryAddress,
      deliveryDate: values.deliveryDate,
      colliListIds: this.packing.colliListIds,
      freightType: this.packing.freightType,
      isActive: this.packing.isActive,
      projectIds: this.packing.projectIds
    };
    this.packingService.update(this.packing).subscribe(pack => this.back());
  }

  setInactive() {
    this.packing.isActive = false;
  }

  setActive() {
    this.packing.isActive = true;
  }

}

