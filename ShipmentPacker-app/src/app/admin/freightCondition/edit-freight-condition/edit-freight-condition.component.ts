import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FreightConditionService} from '../shared/freightCondition.service';
import {FreightCondition} from '../shared/freightCondition.model';

@Component({
  selector: 'app-edit-freight-condition',
  templateUrl: './edit-freight-condition.component.html',
  styleUrls: ['./edit-freight-condition.component.css']
})
export class EditFreightConditionComponent implements OnInit {

  private freightCondition: FreightCondition;
  private itemGroup: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private freightConditionService: FreightConditionService,
              private fb: FormBuilder) {
    this.itemGroup = this.fb.group({
    name: ['', Validators.required],
      number: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.freightConditionService.getById(+params.get('id')))
      .subscribe(freightCondition => this.freightCondition = freightCondition);
  }

  save() {
    const values = this.itemGroup.value;
    if (values.name == "") values.name = this.freightCondition.dangerousGoodsName;
    if (values.number == "") values.number = this.freightCondition.dangerousGoodsNumber;

    const freightCondition: FreightCondition = <FreightCondition> {
      dangerousGoodsName: values.name,
      dangerousGoodsNumber: values.number,
      id: this.freightCondition.id,
      itemIds: this.freightCondition.itemIds
    };
    this.freightConditionService.update(freightCondition)
      .subscribe(freightCondition => this.back());
  }

  back() {
    this.router.navigateByUrl('/admin');
  }
}
