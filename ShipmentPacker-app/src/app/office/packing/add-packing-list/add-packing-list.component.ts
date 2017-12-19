import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PackingService} from '../shared/packing.service';
import {Packing} from '../shared/packing.model';
import {Project} from "../../project/shared/project.model";
import {ProjectService} from "../../project/shared/project.service";
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {Item} from '../../../admin/item/shared/item.model';
import {ItemService} from '../../../admin/item/shared/item.service';
import {PackItem} from '../shared/packItem.model';
import {PackItemService} from '../shared/pack-item.service';
import {User} from '../../../admin/user/shared/user.model';
import {TokenService} from '../../../auth/shared/token.service';
import {UserService} from '../../../admin/user/shared/user.service';

@Component({
  selector: 'app-add-packing-list',
  templateUrl: './add-packing-list.component.html',
  styleUrls: ['./add-packing-list.component.css']
})
export class AddPackingListComponent implements OnInit {

  failSave = false;
  user: User;
  items: Item[];
  project: Project;
  packing: Packing;
  packItems: PackItem[];
  packItemIds: number[];
  packingGroup: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private packingService: PackingService,
              private itemService: ItemService,
              private projectService: ProjectService,
              private packItemService: PackItemService,
              private tokenService: TokenService,
              private ngbDateParserFormatter: NgbDateParserFormatter) {
    this.packingGroup = this.fb.group({
      packingName: ['', Validators.required],
      deliveryAddress: ['', Validators.required],
      deliveryDate: ['', Validators.required],
      freightType: ['', Validators.required],
    });
    this.packItems = [];
    this.packItemIds = [];

  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.projectService.getById(+params.get('id')))
      .subscribe(project => this.project = project);

    this.tokenService.getUserFromToken().subscribe(user => this.user = user);

    this.itemService.getItems().subscribe(items => {this.items = items;});
  }

  back() {
    this.router.navigateByUrl('/project-detail/'+this.project.id);
  }

  save() {
    this.failSave = false;
    const values = this.packingGroup.value;
    const packing: Packing = <Packing> {
      packingName: values.packingName,
      deliveryAddress: values.deliveryAddress,
      deliveryDate: this.ngbDateParserFormatter.format(values.deliveryDate),
      freightType: values.freightType,
      isActive: true
    };
    packing.itemType = 'Hej';
    packing.creatorName = this.user.firstName + " " + this.user.lastName;
    packing.projectIds = [];
    packing.projectIds.push(this.project.id);
    this.packingService.create(packing)
      .subscribe(pack => {
      this.createPackItems(pack)
    },
    err => {
      if (err.status === 400) {
        this.failSave = true;
      }});
  }

  createPackItems(packing: Packing){
    if(this.packItems.length!= 0){
      for(let packItem of this.packItems){
        packItem.packingListId = packing.id;
        packItem.packingList = packing;
      }
      this.packItemService.createList(this.packItems).subscribe(pi=> this.back());
    }
    else{
      this.back();
    }
  }

  addItem(item: Item) {
    let exists: boolean = false;
    for(let packingItem of this.packItems){
      if(packingItem.item.valueOf() == item.valueOf()){
        packingItem.count++;
        exists = true;
      }
    }
    if (exists == false){
      const packItem: PackItem = <PackItem> {
        item: item,
        itemId: item.id,
        count: 1,
        packed: 0,
        packingListId: 0,
      }
      this.packItems.push(packItem);
    }
  }

  removeItem(packItem: PackItem){
    if(packItem.count >1){
      packItem.count--;
    }
    else {
      const index = this.packItems.indexOf(packItem);
      this.packItems.splice(index, 1);
    }
  }

  removeAll(packItem: PackItem){
    const index = this.packItems.indexOf(packItem);
    this.packItems.splice(index, 1);
  }

  submit() {
    this.save();
  }

}
