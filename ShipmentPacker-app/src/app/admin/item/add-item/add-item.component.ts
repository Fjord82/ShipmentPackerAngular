import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Item} from '../shared/item.model';
import {ItemService} from '../shared/item.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FreightConditionService} from '../../freightCondition/shared/freightCondition.service';
import {FreightCondition} from '../../freightCondition/shared/freightCondition.model';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  closeResult: string;
  freightConditions: FreightCondition[];
  addedFreightCondition: FreightCondition[];

  private itemGroup: FormGroup;
  constructor(private router: Router,
              private itemService: ItemService,
              private freightConditionService: FreightConditionService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
    this.itemGroup = this.fb.group({
      itemName: ['', Validators.required],
      dimension: ['', Validators.required],
      weight: ['', Validators.required],
      dangerousGoods: [false]
    });
    this.addedFreightCondition = [];
  }


  ngOnInit() {
    this.freightConditionService.getFreightConditions().subscribe(freightConditions => this.freightConditions = freightConditions);
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  addFreightCondition(freightCondition: FreightCondition){
    this.addedFreightCondition.push(freightCondition);
    const index = this.freightConditions.indexOf(freightCondition);
    this.freightConditions.splice(index, 1);
  }

  removeFreightCondition(freightCondition: FreightCondition){
    this.freightConditions.push(freightCondition);
    const index = this.addedFreightCondition.indexOf(freightCondition);
    this.addedFreightCondition.splice(index, 1);
  }

  save() {
    const values = this.itemGroup.value;
    const item: Item = <Item> {
      itemName: values.itemName,
      dimension: values.dimension,
      weight: values.weight,
      dangerousGoods: values.dangerousGoods
    };
    item.freightConditionIds = [];
    for(let freightCondition of this.addedFreightCondition){
      item.freightConditionIds.push(freightCondition.id);
    }
    this.itemService.create(item)
      .subscribe(item => this.back());
  }
}
