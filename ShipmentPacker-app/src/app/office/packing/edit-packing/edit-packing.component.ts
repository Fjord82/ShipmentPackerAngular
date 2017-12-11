import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Packing} from '../shared/packing.model';
import {PackingService} from '../shared/packing.service';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Item} from "../../../admin/item/shared/item.model";
import {PackItemService} from "../shared/pack-item.service";
import {ItemService} from "../../../admin/item/shared/item.service";
import {PackItem} from "../shared/packItem.model";

@Component({
  selector: 'app-edit-packing',
  templateUrl: './edit-packing.component.html',
  styleUrls: ['./edit-packing.component.css']
})
export class EditPackingComponent implements OnInit {

  currentPackingChanged: boolean = false;
  packing: Packing;
  items: Item[];
  newPackItems: PackItem[];
  packingGroup: FormGroup;
  constructor(private router: Router,
              private fb: FormBuilder,
              private packingService: PackingService,
              private itemService: ItemService,
              private packItemService: PackItemService,
              private route: ActivatedRoute,
              private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.packingGroup = this.fb.group({
      packingName: ['', Validators.required],
      creatorName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required]
    });
    this.newPackItems = [];
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => {this.packing = packing});

    this.itemService.getItems().subscribe(items => {this.items = items;});
      }

  addItem(item: Item)
  {
    let existsNew: boolean = false;
    let existsOld: boolean = false;
    for (let packingItem of this.packing.packItems)
    {
      if (packingItem.item.id == item.id)
      {
        packingItem.count++;
        existsOld = true;
      }
    }
      if (!existsOld)
      {
        for (let packingItem of this.newPackItems)
        {
          if (packingItem.item.id == item.id)
          {
            packingItem.count++;
            existsNew = true;
          }
        }
      }
      if (!existsNew && !existsOld)
      {
        const packItem: PackItem = <PackItem> {
          item: item,
          itemId: item.id,
          count: 1,
          packed: 0,
          packingListId: 0,
        }
        this.newPackItems.push(packItem);
      }
    }


  removeItem(packItem: PackItem){
    if(packItem.count >1){
      packItem.count--;
    }
    else {
      const index = this.newPackItems.indexOf(packItem);
      this.newPackItems.splice(index, 1);
    }
  }

  removeAll(packItem: PackItem){
    const index = this.newPackItems.indexOf(packItem);
    this.newPackItems.splice(index, 1);
  }

  removeAllCurrent(packItem: PackItem) {
    this.currentPackingChanged = true;
      const index = this.packing.packItems.indexOf(packItem);
      this.packing.packItems.splice(index, 1);
      const IdIndex = this.packing.packItemsIds.indexOf(packItem.id);
      this.packing.packItemsIds.splice(IdIndex,1);
  }

  removeItemCurrent(packItem: PackItem) {
    this.currentPackingChanged = true;
    if(packItem.count >1){
      packItem.count--;
    }
    else {
      const index = this.packing.packItems.indexOf(packItem);
      this.packing.packItems.splice(index, 1);
      const IdIndex = this.packing.packItemsIds.indexOf(packItem.id);
      this.packing.packItemsIds.splice(IdIndex,1);
      this.packItemService.delete(packItem.id);
    }
  }


  back() {
    this.router.navigateByUrl('/project-detail/' + this.packing.projectIds[0]);
  }

  submit() {
    if (this.newPackItems.length != 0)
    {
      this.createPackItems();
    }
    else
    {
      this.updatePackItems();
    }
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
      projectIds: this.packing.projectIds,
      packItemsIds: this.packing.packItemsIds,
      itemType: 'Placeholder'

    };
    this.packingService.update(this.packing).subscribe(pack => this.back());
  }

  createPackItems(){

    for(let packItem of this.newPackItems){
      packItem.packingListId = this.packing.id;
      packItem.packingList = this.packing;
    }
    this.packItemService.createList(this.newPackItems).subscribe(pi=> this.addNewPackItemToPacking(pi));
  }

  addNewPackItemToPacking(packItems: PackItem[]){
    for (let packItem of packItems)
    {
      this.packing.packItemsIds.push(packItem.id);
    }
    this.updatePackItems();
  }

  updatePackItems() {
    if (this.currentPackingChanged)
    {
    this.packItemService.updateList(this.packing.packItems).subscribe(pi => this.save());
    }
    else
    {
      this.save();
    }
  }

  setInactive() {
    this.packing.isActive = false;
  }

  setActive() {
    this.packing.isActive = true;
  }

}
