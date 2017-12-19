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

  filter: string;

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

  filteredItems: Item[];
  items: Item[];
  item: Item;

  filteredFreightConditions: FreightCondition[];
  freightConditions: FreightCondition[];
  freightCondition: FreightCondition;

  constructor(private router: Router,
              private projectService: ProjectService,
              private packingService: PackingService,
              private colliService: ColliService,
              private itemService: ItemService,
              private freightConditionService: FreightConditionService,
              private utilityService: UtilityService,
              private loginService: LoginService) {
    this.projects = [];
  }

  ngOnInit() {
    this.projectService.getProjects().subscribe(
      projects => {
        this.setupProjects(projects);
      });

    this.packingService.getPackings().subscribe(
      packings => {
        this.setupPackingLists(packings);
      });

    this.colliService.getCollis().subscribe(
      collis => {
        this.setupColliLists(collis);
      });

    this.itemService.getItems().subscribe(
      items => {
        this.setupItems(items);
      });

    this.freightConditionService.getFreightConditions().subscribe
    (freightConditions => {
      this.setupFreightConditions(freightConditions);
    });
  }

  setupProjects(projects: Project[]){
    this.projects = projects;
    this.sortProjects(projects);
  }

  sortProjects(projects: Project[]) {
    this.activeProjects = <Project[]>this.utilityService.activeList(projects);
    this.inactiveProjects = <Project[]>this.utilityService.inactiveList(projects);
  }

  searchProjects() {
    if(this.filter == "") {
      this.sortProjects(this.projects);
    }
    else {
      let filteredProjects = this.utilityService.filterProjects(this.projects, this.filter);
      this.sortProjects(filteredProjects);
    }
  }

  setupPackingLists(packings: Packing[]){
    this.packings = packings;
    this.sortPackinglists(packings);
  }

  sortPackinglists(packings: Packing[]) {
    this.activePacking = <Packing[]>this.utilityService.activeList(packings);
    this.inactivePacking = <Packing[]>this.utilityService.inactiveList(packings);
  }

  searchPackings() {
    if(this.filter == "") {
      this.sortPackinglists(this.packings);
    }
    else {
      let filteredPackings = this.utilityService.filterPackings(this.packings, this.filter);
      this.sortPackinglists(filteredPackings);
    }
  }

  setupColliLists(collis: ColliList[]){
    this.collis = collis;
    this.sortColliLists(collis);
  }

  sortColliLists(collis: ColliList[]) {
    this.activeColli = <ColliList[]>this.utilityService.activeList(collis);
    this.inactiveColli = <ColliList[]>this.utilityService.inactiveList(collis);
  }

  searchColliLists() {
    if(this.filter == "") {
      this.sortColliLists(this.collis);
    }
    else {
      let filteredColliLists = this.utilityService.filterCollis(this.collis, this.filter);
      this.sortColliLists(filteredColliLists);
    }
  }

  setupItems(items: Item[]) {
    this.items = items;
    this.filteredItems = items;
  }

  searchItems() {
    if(this.filter == "") {
      this.filteredItems = this.items;
    }
    else {
      this.filteredItems = this.utilityService.filterItems(this.items, this.filter);
    }
  }

  setupFreightConditions(freightConditions: FreightCondition[]) {
    this.freightConditions = freightConditions;
    this.filteredFreightConditions = freightConditions;
  }

  searchFreightConditions() {
    if(this.filter == "") {
      this.filteredFreightConditions = this.freightConditions;
    }
    else {
      this.filteredFreightConditions = this.utilityService.filterFreightConditions(this.freightConditions, this.filter);
    }
  }

  logout() {
    this.loginService.logout().subscribe(bool => this.router.navigateByUrl('/login'));

  }

  clickProject(project: Project) {
    this.router.navigateByUrl('/admin-project-detail/'+project.id);
  }

  editProject(project: Project, $event) {
    $event.stopPropagation();
    this.router.navigateByUrl('/admin-edit-project/'+project.id);
  }

  deleteProject(project: Project, $event) {
    $event.stopPropagation();
    this.projectService.delete(project.id).subscribe(project=> window.location.reload());
  }

  clickPacking(packing: Packing) {
    this.router.navigateByUrl('/admin-packing-detail/'+packing.id);
  }

  editPacking(packing: Packing, $event) {
    $event.stopPropagation();
    this.router.navigateByUrl('/admin-edit-packing/'+packing.id);
  }

  deletePacking(packing: Packing, $event) {
    $event.stopPropagation();
    this.packingService.delete(packing.id).subscribe(packing=> window.location.reload());
  }

  clickColli(colli: ColliList) {
    this.router.navigateByUrl('/admin-colli-detail/'+colli.id);
  }

  editColli(colli: ColliList, $event) {
    $event.stopPropagation();
    this.router.navigateByUrl('/admin-edit-colli/'+colli.id);
  }

  deleteColli(colli: ColliList, $event) {
    $event.stopPropagation();
    this.colliService.delete(colli.id).subscribe(colli=> window.location.reload());
  }

  addItem() {
    this.router.navigateByUrl('/add-item');
  }

  addFreightCondition() {
    this.router.navigateByUrl('/add-freightCondition');
  }

  editItem(item: Item, $event) {
    $event.stopPropagation();
    this.router.navigateByUrl('/edit-item/'+item.id);
  }

  deleteItem(item: Item, $event) {
    $event.stopPropagation();
    this.itemService.delete(item.id).subscribe(item=> window.location.reload());
  }

  deleteFreightCondition(freightCondition: FreightCondition, $event){
    $event.stopPropagation();
    this.freightConditionService.delete(freightCondition.id).subscribe(
      freightCondition => window.location.reload()
    );
  }

  editFreightCondition(freightCondition: FreightCondition, $event) {
    $event.stopPropagation();
    this.router.navigateByUrl('/edit-freightCondition/'+freightCondition.id);
  }

  manageUsers() {
    this.router.navigateByUrl('/manage-users');
  }


}
