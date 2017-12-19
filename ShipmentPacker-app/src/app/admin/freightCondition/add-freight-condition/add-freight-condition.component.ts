import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FreightConditionService} from '../shared/freightCondition.service';
import {FreightCondition} from '../shared/freightCondition.model';

@Component({
  selector: 'app-add-freight-condition',
  templateUrl: './add-freight-condition.component.html',
  styleUrls: ['./add-freight-condition.component.css']
})
export class AddFreightConditionComponent implements OnInit {

  failSave = false;
  private itemGroup: FormGroup;
  constructor(private router: Router,
              private freightConditionService: FreightConditionService,
              private fb: FormBuilder) {
    this.itemGroup = this.fb.group({
      name: ['', Validators.required],
      number: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  save() {
    this.failSave = false;
    const values = this.itemGroup.value;
    const freightCondition: FreightCondition = <FreightCondition> {
      dangerousGoodsName: values.name,
      dangerousGoodsNumber: values.number,
    };
    this.freightConditionService.create(freightCondition)
      .subscribe(freightCondition => {
        this.back()
        },
        err => {
          if (err.status === 400) {
            this.failSave = true;
          }});
  }

  back() {
    this.router.navigateByUrl('/admin');
  }
}
