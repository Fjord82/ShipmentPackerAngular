import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Item} from '../item/shared/item.model';
import {ItemService} from '../item/shared/item.service';

@Component({
  selector: 'app-manage-items',
  templateUrl: './manage-items.component.html',
  styleUrls: ['./manage-items.component.css']
})
export class ManageItemsComponent implements OnInit {

  items: Item[];
  item: Item;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private itemService: ItemService) {

  }

  ngOnInit() {

    this.itemService.getItems().subscribe(
      items => {
        this.items = items;
      });
  }

  back() {
    this.router.navigateByUrl('/admin');
  }

  edit(item: Item){
    this.router.navigateByUrl('/edit-item/'+item.id)
  }

}
