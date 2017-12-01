import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PackingService} from '../shared/packing.service';
import {Packing} from '../shared/packing.model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-packing-list',
  templateUrl: './add-packing-list.component.html',
  styleUrls: ['./add-packing-list.component.css']
})
export class AddPackingListComponent implements OnInit {


  packingGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private packingService: PackingService) {
    this.packingGroup = this.fb.group({
      packingName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  model: NgbDateStruct;
  date: { year: number, month: number };

  back() {
    this.router.navigateByUrl('/office');
  }

  save() {
    const values = this.packingGroup.value;
    const packing: Packing = {
      packingName: values.packingName,
      deliveryAddress: values.deliveryAddress,
      deliveryDate: values.deliveryDate,

    };
    this.packingService.create(packing)
      .subscribe(pack => console.log(packing));
  }

  submit() {
    this.save();
    this.back();
  }

}
