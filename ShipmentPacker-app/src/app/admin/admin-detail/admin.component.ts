import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PackingService} from '../../office/packing/shared/packing.service';
import {ProjectService} from '../../office/project/shared/project.service';
import {Project} from '../../office/project/shared/project.model';
import {Packing} from '../../office/packing/shared/packing.model';
import {ColliService} from '../../workshop/colli/shared/colli.service';
import {ColliList} from '../../workshop/colli/shared/colli.model';
import {ItemService} from '../item/shared/item.service';
import {Item} from '../item/shared/item.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {



  colli: ColliList;
  collis: ColliList[];
  packing: Packing;
  packings: Packing[];
  project: Project;
  projects: Project[];
  items: Item[];
  item: Item;
  constructor(private router: Router,
              private projectService: ProjectService,
              private packingService: PackingService,
              private colliService: ColliService,
              private itemService: ItemService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      projects => {
        this.projects = projects;
      });

    this.packingService.getPackings().subscribe(
      packings => {
        this.packings = packings;
      });

    this.colliService.getCollis().subscribe(
      collis => {
        this.collis = collis;
      });

    this.itemService.getItems().subscribe(
      items => {
        this.items = items;
      });
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  clickProject(project: Project) {
    this.router.navigateByUrl('/admin-project-detail/'+project.id);
  }

  editProject(project: Project) {
  }

  clickPacking(packing: Packing) {
    this.router.navigateByUrl('/admin-packing-detail/'+packing.id);
  }

  editPacking(packing: Packing) {
  }

  clickColli(colli: ColliList) {
    this.router.navigateByUrl('/admin-colli-detail/'+colli.id);
  }

  editColli(colli: ColliList) {
  }

  clickItem(item: Item) {

  }

  addItem() {
    this.router.navigateByUrl('/add-item')
  }

  editItem(item: Item) {
    this.router.navigateByUrl('/edit-item/'+item.id)
  }

  deleteItem(item: Item) {
    this.itemService.delete(item.id).subscribe(item=> window.location.reload())
  }

  manageUsers() {
    this.router.navigateByUrl('/manage-users');
  }


}
