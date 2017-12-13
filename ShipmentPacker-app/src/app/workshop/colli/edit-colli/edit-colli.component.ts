import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColliService} from '../shared/colli.service';
import {Packing} from '../../../office/packing/shared/packing.model';
import {ColliList} from '../shared/colli.model';
import {PackingService} from '../../../office/packing/shared/packing.service';
import {ColliItem} from '../shared/colliItem.model';
import {PackItem} from '../../../office/packing/shared/packItem.model';
import {ColliItemService} from '../shared/colli-item.service';
import {PackItemService} from '../../../office/packing/shared/pack-item.service';

@Component({
  selector: 'app-edit-colli',
  templateUrl: './edit-colli.component.html',
  styleUrls: ['./edit-colli.component.css']
})
export class EditColliComponent implements OnInit {

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
    this.deleteList.push(colliItem.id);
  }

  submit(){
    this.handleLists();
  }

  back() {
    this.router.navigateByUrl('packingDetailWorkshop/'+this.colli.packingListIds[0])
  }
  save() {
    const values = this.colliGroup.value;
    if (values.totalWeight == "") values.totalWeight = this.colli.totalWeight;
    if (values.dimensions == "") values.dimensions = this.colli.dimensions;
    this.colli = <ColliList> {
      id: this.colli.id,
      projectName: this.colli.projectName,
      netWeight: this.colli.netWeight,
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
        console.log(ci);
        this.colliItemService.update(ci).subscribe(ci => console.log(ci));
      }

    if(this.deleteList.length != 0) {
      for (let id of this.deleteList) {
        this.colliItemService.delete(id).subscribe();
      }
    }

    this.save();
  }

  inactive() {
    this.colli.isActive = false;

    this.colliService.update(this.colli).subscribe(colli => this.back());
  }

}
