import { Injectable } from '@angular/core';
import {Packing} from '../office/packing/shared/packing.model';
import {IEntity} from "./IEntity";
import {Project} from '../office/project/shared/project.model';
import {ColliList} from '../workshop/colli/shared/colli.model';
import {Item} from '../admin/item/shared/item.model';
import {FreightCondition} from '../admin/freightCondition/shared/freightCondition.model';

@Injectable()
export class UtilityService {


  constructor() { }


  activeList(list: IEntity[]): IEntity[] {
    const active: IEntity[] = [];
    for (let ent of list) {
      if (ent.isActive) {
        active.push(ent);
      }
    }
    return active;
  }

  inactiveList(list: IEntity[]): IEntity[] {
    const inactive: IEntity[] = [];
    for (let ent of list) {
      if (!ent.isActive) {
        inactive.push(ent);
      }
    }
    return inactive;
  }

  filterProjects(list: Project[], filter: string): Project[] {
    const filtered: Project[] = [];

    for (let ent of list) {
      let project: String = ent.projectName + ent.id + ent.creatorName;
      if (project.toLowerCase().includes(filter.toLowerCase())) {
        filtered.push(ent);
      }
    }
    return filtered;
  }

  filterPackings(list: Packing[], filter: string): Packing[] {
    const filtered: Packing[] = [];

    for (let ent of list) {
      let packing: String = ent.packingName + ent.id + ent.creatorName;
      if (packing.toLowerCase().includes(filter.toLowerCase())) {
        filtered.push(ent);
      }
    }
    return filtered;
  }

  filterCollis(list: ColliList[], filter: string): ColliList[] {
    const filtered: ColliList[] = [];

    for (let ent of list) {
      let colli: String = ent.id + ent.projectName + ent.worker;
      if (colli.toLowerCase().includes(filter.toLowerCase())) {
        filtered.push(ent);
      }
    }
    return filtered;
  }

  filterItems(list: Item[], filter: string): Item[] {
    const filtered: Item[] = [];

    for (let ent of list) {
      let item: String = ent.id + ent.itemName;
      if (item.toLowerCase().includes(filter.toLowerCase())) {
        filtered.push(ent);
      }
    }
    return filtered;
  }

  filterFreightConditions(list: FreightCondition[], filter: string): FreightCondition[] {
    const filtered: FreightCondition[] = [];

    for (let ent of list) {
      let freightCondition: String = ent.id + ent.dangerousGoodsName + ent.dangerousGoodsNumber;
      if (freightCondition.toLowerCase().includes(filter.toLowerCase())) {
        filtered.push(ent);
      }
    }
    return filtered;
  }

}
