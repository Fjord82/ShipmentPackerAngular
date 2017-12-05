import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Packing} from '../shared/packing.model';
import {PackingService} from '../shared/packing.service';

@Component({
  selector: 'app-edit-packing',
  templateUrl: './edit-packing.component.html',
  styleUrls: ['./edit-packing.component.css']
})
export class EditPackingComponent implements OnInit {

  packing: Packing;
  packingGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private packingService: PackingService,
              private route: ActivatedRoute) {
    this.packingGroup = this.fb.group({
      packingName: ['', Validators.required],
      creatorName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => this.packing = packing);
  }

  back() {
    this.router.navigateByUrl('/office');
  }

  save() {
    const values = this.packingGroup.value;
    if (values.packingName == "") values.packingName = this.packing.packingName;
    if (values.creatorName == "") values.creatorName = this.packing.creatorName;
    if (values.deliveryAddress == "") values.deliveryAddress = this.packing.deliveryAddress;
    if (values.deliveryDate == "") values.deliveryDate = this.packing.deliveryDate;

    this.packing = <Packing> {
      id: this.packing.id,
      packingName: values.packingName,
      creatorName: values.creatorName,
      deliveryAddress: values.deliveryAddress,
      deliveryDate: values.deliveryDate
    };
    this.packingService.update(this.packing).subscribe(pack => this.back());
  }

}
