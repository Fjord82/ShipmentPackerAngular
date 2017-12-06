import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemService} from '../shared/item.service';
import {Item} from '../shared/item.model';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  private item: Item;
  private itemGroup: FormGroup;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService,
              private fb: FormBuilder) {
    this.itemGroup = this.fb.group({
      itemName: ['', Validators.required],
      dimension: ['', Validators.required],
      weight: ['', Validators.required],
      dangerousGoods: [false]
    });
  }

  ngOnInit() {
    this.route.paramMap.switchMap(params => this.itemService.getById(+params.get('id')))
      .subscribe(item => this.item = item);
  }

  back() {
    this.router.navigateByUrl('/manage-items');
  }

  save() {
    const values = this.itemGroup.value;
    const item: Item = <Item> {
      id: this.item.id,
      itemName: values.itemName,
      dimension: values.dimension,
      weight: values.weight,
      dangerousGoods: values.dangerousGoods
    };
    this.itemService.update(this.item).subscribe(item => this.back());
  }

}
