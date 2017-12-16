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
import {FreightConditionService} from '../freightCondition/shared/freightCondition.service';
import {FreightCondition} from '../freightCondition/shared/freightCondition.model';
import {LoginService} from '../../auth/shared/login.service';

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

  freightConditions: FreightCondition[];

  constructor(private router: Router,
              private projectService: ProjectService,
              private packingService: PackingService,
              private colliService: ColliService,
              private itemService: ItemService,
              private freightConditionService: FreightConditionService,
              private utilityService: UtilityService,
              private loginService: LoginService) { }

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

    this.freightConditionService.getFreightConditions().subscribe
    (freightConditions => {
      this.freightConditions = freightConditions;
    });
  }
  sortProjects(project: Project[]) {
    this.activeProjects = <Project[]>this.utilityService.activeList(project);
    this.inactiveProjects = <Project[]>this.utilityService.inactiveList(project);
  }

  sortPackinglists(packing: Packing[]) {
    this.activePacking = <Packing[]>this.utilityService.activeList(packing);
    this.inactivePacking = <Packing[]>this.utilityService.inactiveList(packing);
  }

  sortColliLists(colli: ColliList[]) {
    this.activeColli = <ColliList[]>this.utilityService.activeList(colli);
    this.inactiveColli = <ColliList[]>this.utilityService.inactiveList(colli);
  }

  logout() {
    this.loginService.logout().subscribe(bool => this.router.navigateByUrl('/login'));

  }

  clickProject(project: Project) {
    this.router.navigateByUrl('/admin-project-detail/'+project.id);
  }

  editProject(project: Project) {
    this.router.navigateByUrl('/admin-edit-project/'+project.id);
  }

  deleteProject(project: Project) {
    this.projectService.delete(project.id).subscribe(project=> window.location.reload())
  }

  clickPacking(packing: Packing) {
    this.router.navigateByUrl('/admin-packing-detail/'+packing.id);
  }

  editPacking(packing: Packing) {
    this.router.navigateByUrl('/admin-edit-packing/'+packing.id);
  }

  deletePacking(packing: Packing) {
    this.packingService.delete(packing.id).subscribe(packing=> window.location.reload())
  }

  clickColli(colli: ColliList) {
    this.router.navigateByUrl('/admin-colli-detail/'+colli.id);
  }

  editColli(colli: ColliList) {
    this.router.navigateByUrl('/admin-edit-colli/'+colli.id);
  }

  deleteColli(colli: ColliList) {
    this.colliService.delete(colli.id).subscribe(colli=> window.location.reload())
  }

  clickItem(item: Item) {
    this.router.navigateByUrl('/edit-item/'+item.id)
  }

  addItem() {
    this.router.navigateByUrl('/add-item')
  }

  addFreightCondition() {
    this.router.navigateByUrl('/add-freightCondition')
  }

  editItem(item: Item) {
    this.router.navigateByUrl('/edit-item/'+item.id)
  }

  deleteItem(item: Item) {
    this.itemService.delete(item.id).subscribe(item=> window.location.reload())
  }

  deleteFreightCondition(freightCondition: FreightCondition){
    this.freightConditionService.delete(freightCondition.id).subscribe(freightCondition => window.location.reload())
  }

  editFreightCondition(freightCondition: FreightCondition) {
    this.router.navigateByUrl('/edit-freightCondition/'+freightCondition.id)
  }

  manageUsers() {
    this.router.navigateByUrl('/manage-users');
  }


}
