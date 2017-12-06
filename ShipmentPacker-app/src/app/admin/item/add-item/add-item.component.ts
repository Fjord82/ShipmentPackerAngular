import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Item} from '../shared/item.model';
import {ItemService} from '../shared/item.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

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
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  save() {
    const values = this.itemGroup.value;
    const item: Item = <Item> {
      itemName: values.itemName,
      dimension: values.dimension,
      weight: values.weight,
      dangerousGoods: values.dangerousGoods
    };
    this.itemService.create(item)
      .subscribe(item => this.back());
  }
}
