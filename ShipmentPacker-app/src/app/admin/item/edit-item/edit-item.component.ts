import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemService} from '../shared/item.service';
import {Item} from '../shared/item.model';
import {FreightCondition} from '../../freightCondition/shared/freightCondition.model';
import {FreightConditionService} from '../../freightCondition/shared/freightCondition.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  freightConditions: FreightCondition[];
  private item: Item;
  private itemGroup: FormGroup;
  private closeResult: string;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private modalService: NgbModal,
              private freightConditionService: FreightConditionService,
              private fb: FormBuilder) {
    this.itemGroup = this.fb.group({
      itemName: ['', Validators.required],
      dimension: ['', Validators.required],
      weight: ['', Validators.required],
      dangerousGoods: [false]
    });
    this.freightConditions = [];
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.itemService.getById(+params.get('id')))
      .subscribe(item => this.setupItem(item));


  }

  setupItem(item: Item) {
    this.item = item;
    if (this.item.freightConditionIds == null) {
      this.item.freightConditions = [];
    }
    this.freightConditionService.getFreightConditions().subscribe(freightConditions => this.sortFreightConditions(freightConditions));
  }

  sortFreightConditions(freightConditions: FreightCondition[]) {
    this.freightConditions = freightConditions;
    for (let itemFc of this.item.freightConditions) {
      for (let fc of this.freightConditions){
        if (fc.id == itemFc.id) {
          const index = this.freightConditions.indexOf(fc);
          this.freightConditions.splice(index, 1);
        }
      }
    }
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  addFreightCondition(freightCondition: FreightCondition) {
    this.item.freightConditions.push(freightCondition);
    this.item.freightConditionIds.push(freightCondition.id);
    const index = this.freightConditions.indexOf(freightCondition);
    this.freightConditions.splice(index, 1);

  }

  removeFreightCondition(freightCondition: FreightCondition) {
    this.freightConditions.push(freightCondition);
    const index = this.item.freightConditions.indexOf(freightCondition);
    this.item.freightConditions.splice(index, 1);
    const idIndex = this.item.freightConditionIds.indexOf(freightCondition.id);
    this.item.freightConditionIds.splice(idIndex, 1);
  }

  save() {
    const values = this.itemGroup.value;
    if (values.itemName == "") values.itemName = this.item.itemName;
    if (values.dimension == "") values.dimension = this.item.dimension;
    if (values.weight == "") values.weight = this.item.weight;
    const item: Item = <Item>{
      id: this.item.id,
      itemName: values.itemName,
      dimension: values.dimension,
      weight: values.weight,
      dangerousGoods: values.dangerousGoods,
      colliItemsIds: this.item.colliItemsIds,
      freightConditionIds: this.item.freightConditionIds,
      packItems: this.item.packItems,
      packItemsIds: this.item.packItemsIds

    };
    this.itemService.update(item).subscribe(item => this.back());
  }

  open(content) {
    this.modalService.open(content);
  }
}

