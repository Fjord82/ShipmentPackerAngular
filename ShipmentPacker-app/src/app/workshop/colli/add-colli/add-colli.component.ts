import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColliService} from '../shared/colli.service';
import {ColliList} from '../shared/colli.model';
import {Packing} from '../../../office/packing/shared/packing.model';
import {PackingService} from '../../../office/packing/shared/packing.service';
import {PackItem} from '../../../office/packing/shared/packItem.model';
import {ColliItem} from '../shared/colliItem.model';
import {PackItemService} from '../../../office/packing/shared/pack-item.service';
import {ColliItemService} from '../shared/colli-item.service';

@Component({
  selector: 'app-add-colli',
  templateUrl: './add-colli.component.html',
  styleUrls: ['./add-colli.component.css']
})
export class AddColliComponent implements OnInit {

  colliGroup: FormGroup;
  packing: Packing;
  colli: ColliList;
  colliItems: ColliItem[];

  netWeight: number;
  worker: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private packingService: PackingService,
              private packItemService: PackItemService,
              private colliItemService: ColliItemService,
              private route: ActivatedRoute,
              private colliService: ColliService) {

    this.netWeight = 0;
    this.worker = 'Billy Placeholder';
    this.colliGroup = this.fb.group({
      totalWeight: ['', Validators.required],
      dimensions: ['', Validators.required],
      freightType: ['', Validators.required],
    });
    this.colliItems = [];
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => this.packing = packing);

    //this.itemService.getItems().subscribe(items => {this.items = items;});
  }

  addItem(packItem: PackItem) {
    if(packItem.packed != packItem.count) {
      let exists: boolean = false;
      for (let colliItem of this.colliItems) {
        if (colliItem.item.id == packItem.item.id) {
          colliItem.count++;
          packItem.packed++;
          exists = true;
        }
      }
      if (exists == false) {
        const colliItem: ColliItem = <ColliItem> {
          item: packItem.item,
          itemId: packItem.itemId,
          count: 1,
          colliListId: 0,
        }
        this.colliItems.push(colliItem);
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
      const index = this.colliItems.indexOf(colliItem);
      this.colliItems.splice(index, 1);
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
    const index = this.colliItems.indexOf(colliItem);
    this.colliItems.splice(index, 1);
    packItem.packed = packItem.packed - colliItem.count;
    this.netWeight = this.netWeight - (packItem.item.weight * colliItem.count);
  }

  back() {
    this.router.navigateByUrl('packingDetailWorkshop/'+this.packing.id)
  }

  save() {
    const values = this.colliGroup.value;
    if (values.totalWeight == "") values.totalWeight = 0;
    if (values.dimensions == "") values.dimensions = '';
    this.colli = <ColliList> {
      totalWeight: values.totalWeight,
      dimensions: values.dimensions,
    };
    this.colli.itemType = 'itemType';
    this.colli.packingListIds = [];
    this.colli.packingListIds.push(this.packing.id);
    this.colli.projectName = this.packing.projects[0].projectName;
    this.colli.worker = this.worker;
    this.colli.netWeight = this.netWeight;
    this.colli.isActive = true;
    this.colli.freightType = this.packing.freightType;
    this.colliService.create(this.colli).subscribe(colli => this.handleItems(colli));
  }

  handleItems(colli: ColliList){
    if(this.colliItems.length != 0){
      for(let colliItem of this.colliItems){
        colliItem.colliListId = colli.id;
        colliItem.colliList = colli;

        this.colliItemService.create(colliItem).subscribe();
      }
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
      this.back();
    }
    else{
      this.back();
    }
  }
}
