///<reference path="../../../../node_modules/@angular/forms/src/validators.d.ts"/>
import { Component, OnInit } from '@angular/core';
import {ColliList} from '../../workshop/colli/shared/colli.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ColliService} from '../../workshop/colli/shared/colli.service';
import {ColliItem} from '../../workshop/colli/shared/colliItem.model';
import {PackItemService} from '../../office/packing/shared/pack-item.service';
import {Packing} from '../../office/packing/shared/packing.model';
import {ColliItemService} from '../../workshop/colli/shared/colli-item.service';
import {PackingService} from '../../office/packing/shared/packing.service';
import {PackItem} from '../../office/packing/shared/packItem.model';

@Component({
  selector: 'app-admin-colli-edit',
  templateUrl: './admin-colli-edit.component.html',
  styleUrls: ['./admin-colli-edit.component.css']
})
export class AdminColliEditComponent implements OnInit {

  netWeight: number;
  colli: ColliList;
  colliGroup: FormGroup;
  packing: Packing;
  newColliItems: ColliItem[];
  deleteList: number[];
  constructor(private router: Router,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private colliService: ColliService,
              private colliItemService: ColliItemService,
              private packingService: PackingService,
              private packItemService: PackItemService) {
    this.colliGroup = this.fb.group({
      totalWeight: ['', Validators.required],
      dimensions: ['', Validators.required],
      freightType: ['', Validators.required],
    });
    this.newColliItems = [];
    this.deleteList = [];
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.colliService.getById(+params.get('id')))
      .subscribe(colli => this.getPacking(colli));
  }

  getPacking(colli: ColliList){
    this.colli = colli;
    this.netWeight = colli.netWeight;
    this.packingService.getById(colli.packingListIds[0]).subscribe(packing => this.packing = packing);
  }

  addItem(packItem: PackItem) {
    if(packItem.packed != packItem.count) {
      let exists: boolean = false;
      let existsCurrent: boolean = false;
      for (let colliItem of this.colli.colliItems) {
        if (colliItem.item.id == packItem.item.id) {
          colliItem.count++;
          packItem.packed++;
          existsCurrent = true;
        }
      }
      if(!existsCurrent) {
        for (let colliItem of this.newColliItems) {
          if (colliItem.item.id == packItem.item.id) {
            colliItem.count++;
            packItem.packed++;
            exists = true;
          }
        }
      }
      if (!exists && !existsCurrent) {
        const colliItem: ColliItem = <ColliItem> {
          item: packItem.item,
          itemId: packItem.itemId,
          count: 1,
          colliListId: 0,
        }
        this.newColliItems.push(colliItem);
        packItem.packed++;
      }
      this.netWeight = this.netWeight + packItem.item.weight;
    }
  }

  removeItem(colliItem: ColliItem){
    let packItem: PackItem;
    for (let pi of this.packing.packItems){
      if(pi.itemId == colliItem.itemId){
        packItem = pi;
      }
    }
    if(colliItem.count >1){
      colliItem.count--;
    }
    else {
      const index = this.newColliItems.indexOf(colliItem);
      this.newColliItems.splice(index, 1);
    }
    packItem.packed--;
    this.netWeight = this.netWeight - packItem.item.weight;
  }

  removeItemCurrent(colliItem: ColliItem){
    let packItem: PackItem;
    for (let pi of this.packing.packItems){
      if(pi.itemId == colliItem.itemId){
        packItem = pi;
      }
    }
    if(colliItem.count >1){
      colliItem.count--;
    }
    else {
      const index = this.colli.colliItems.indexOf(colliItem);
      this.colli.colliItems.splice(index, 1);
      this.deleteList.push(colliItem.id);
    }
    packItem.packed--;
    this.netWeight = this.netWeight - packItem.item.weight;
  }

  removeAll(colliItem: ColliItem){
    let packItem: PackItem;
    for (let pi of this.packing.packItems){
      if(pi.itemId == colliItem.itemId){
        packItem = pi;
      }
    }
    const index = this.newColliItems.indexOf(colliItem);
    this.newColliItems.splice(index, 1);
    packItem.packed = packItem.packed - colliItem.count;
    this.netWeight = this.netWeight - (packItem.item.weight * colliItem.count);
  }

  removeAllCurrent(colliItem: ColliItem){
    let packItem: PackItem;
    for (let pi of this.packing.packItems){
      if(pi.itemId == colliItem.itemId){
        packItem = pi;
      }
    }
    const index = this.colli.colliItems.indexOf(colliItem);
    this.colli.colliItems.splice(index, 1);
    packItem.packed = packItem.packed - colliItem.count;
    this.netWeight = this.netWeight - (packItem.item.weight * colliItem.count);
    this.deleteList.push(colliItem.id);
  }

  submit(){
    this.handleLists();
  }

  save() {
    const values = this.colliGroup.value;
    if (values.totalWeight == "") values.totalWeight = this.colli.totalWeight;
    if (values.dimensions == "") values.dimensions = this.colli.dimensions;
    this.colli = <ColliList> {
      id: this.colli.id,
      projectName: this.colli.projectName,
      netWeight: this.netWeight,
      worker: this.colli.worker,
      totalWeight: values.totalWeight,
      dimensions: values.dimensions,
      freightType: this.colli.freightType,
      isActive: this.colli.isActive,
      itemType: this.colli.itemType,
      packingListIds: this.colli.packingListIds,
      packingLists: this.colli.packingLists
    };

    this.colliService.update(this.colli).subscribe(colli => this.back());
  }

  handleLists(){
    this.updatePackItems();
    if(this.newColliItems.length != 0){
      this.createNewColliItems();
    }
    this.updateCurrent();
  }

  updatePackItems(){
    for(let packItem of this.packing.packItems){
      let pack: PackItem = <PackItem>{
        id: packItem.id,
        packed: packItem.packed,
        count: packItem.count,
        itemId: packItem.itemId,
        packingListId: packItem.packingListId
      }
      this.packItemService.update(pack).subscribe();
    }
  }

  createNewColliItems(){
    for(let colliItem of this.newColliItems){
      colliItem.colliListId = this.colli.id;
      colliItem.colliList = this.colli;

      this.colliItemService.create(colliItem).subscribe();
    }
  }

  updateCurrent(){
    for (let colliItem of this.colli.colliItems) {
      let ci: ColliItem = <ColliItem> {
        id: colliItem.id,
        colliList: colliItem.colliList,
        colliListId: colliItem.colliListId,
        count: colliItem.count,
        item: colliItem.item,
        itemId: colliItem.itemId
      }
      this.colliItemService.update(ci).subscribe();
    }

    if(this.deleteList.length != 0) {
      for (let id of this.deleteList) {
        this.colliItemService.delete(id).subscribe();
      }
    }

    this.save();
  }

  back() {
    this.router.navigateByUrl('/admin');
  }
}
