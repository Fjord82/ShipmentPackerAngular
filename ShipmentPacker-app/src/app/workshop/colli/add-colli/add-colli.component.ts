import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ColliService} from '../shared/colli.service';
import {ColliList} from '../shared/colli.model';
import {Packing} from '../../../office/packing/shared/packing.model';
import {PackingService} from '../../../office/packing/shared/packing.service';
import {Item} from '../../../admin/item/shared/item.model';
import {PackItem} from '../../../office/packing/shared/packItem.model';

@Component({
  selector: 'app-add-colli',
  templateUrl: './add-colli.component.html',
  styleUrls: ['./add-colli.component.css']
})
export class AddColliComponent implements OnInit {

  colliGroup: FormGroup;
  packing: Packing;
  colli: ColliList;
  packItems: PackItem[];

  netWeight: number;
  worker: string;

  constructor(private router: Router,
              private fb: FormBuilder,
              private packingService: PackingService,
              private route: ActivatedRoute,
              private colliService: ColliService) {

    this.netWeight = 500;
    this.worker = 'Billy Placeholder';
    this.colliGroup = this.fb.group({
      totalWeight: ['', Validators.required],
      dimensions: ['', Validators.required],
      freightType: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.packingService.getById(+params.get('id')))
      .subscribe(packing => this.packing = packing);

    //this.itemService.getItems().subscribe(items => {this.items = items;});
  }

  addItem(packItem: PackItem) {
    let exists: boolean = false;
    for(let packingItem of this.packItems){
      if(packingItem.item.valueOf() == packItem.valueOf()){
        packingItem.count++;
        exists = true;
      }
    }
    if (exists == false){
      const packItem: PackItem = <PackItem> {
      //  item: item,
       // itemId: item.id,
        count: 1,
        packed: 0,
        packingListId: 0,
      }
      this.packItems.push(packItem);
    }
  }

  back() {
    this.router.navigateByUrl('packingDetailWorkshop/'+this.packing.id)
  }

  save() {
    const values = this.colliGroup.value;
    if (values.totalWeight == "") values.totalWeight = this.colli.totalWeight;
    if (values.dimensions == "") values.dimensions = this.colli.dimensions;
    if (values.freightType == "") values.freightType = this.colli.freightType;
    this.colli = <ColliList> {
      totalWeight: values.totalWeight,
      dimensions: values.dimensions,
      freightType: values.freightType,
    };
    this.colli.itemType = 'itemType';
    this.colli.packingListIds = [];
    this.colli.packingListIds.push(this.packing.id);
    this.colli.projectName = this.packing.projects[0].projectName;
    this.colli.worker = this.worker;
    this.colli.netWeight = this.netWeight;
    this.colli.isActive = true;
    this.colliService.create(this.colli).subscribe(coll => this.back());
  }
}
