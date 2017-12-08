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
import {UtilityService} from '../../shared/utility.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  packing: Packing;
  packings: Packing[];
  inactivePacking: Packing[];
  activePacking: Packing[];

  colli: ColliList;
  collis: ColliList[];
  inactiveColli: ColliList[];
  activeColli: ColliList[];

  project: Project;
  projects: Project[];
  inactiveProjects: Project[];
  activeProjects: Project[];

  items: Item[];
  item: Item;

  constructor(private router: Router,
              private projectService: ProjectService,
              private packingService: PackingService,
              private colliService: ColliService,
              private itemService: ItemService,
              private utilityService: UtilityService) { }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      projects => {
        this.sortProjects(projects);
      });

    this.packingService.getPackings().subscribe(
      packings => {
        this.sortPackinglists(packings);
      });

    this.colliService.getCollis().subscribe(
      collis => {
        this.sortColliLists(collis);
      });

    this.itemService.getItems().subscribe(
      items => {
        this.items = items;
      });
  }
  sortProjects(project: Project[]) {
    this.activeProjects = this.utilityService.activeList(project);
    this.inactiveProjects = this.utilityService.inactiveList(project);
  }

  sortPackinglists(packing: Packing[]) {
    this.activePacking = this.utilityService.activeList(packing);
    this.inactivePacking = this.utilityService.inactiveList(packing);
  }

  sortColliLists(colli: ColliList[]) {
    this.activeColli = this.utilityService.activeList(colli);
    this.inactiveColli = this.utilityService.inactiveList(colli);
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  clickProject(project: Project) {
    this.router.navigateByUrl('/admin-project-detail/'+project.id);
  }

  editProject(project: Project) {
    this.router.navigateByUrl('/edit-project/'+project.id);
  }

  clickPacking(packing: Packing) {
    this.router.navigateByUrl('/admin-packing-detail/'+packing.id);
  }

  editPacking(packing: Packing) {
    this.router.navigateByUrl('/edit-packing/'+packing.id);
  }

  clickColli(colli: ColliList) {
    this.router.navigateByUrl('/admin-colli-detail/'+colli.id);
  }

  editColli(colli: ColliList) {
    this.router.navigateByUrl('/edit-colli/'+colli.id);
  }

  clickItem(item: Item) {
    this.router.navigateByUrl('/edit-item/'+item.id)
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
