import { Injectable } from '@angular/core';
import {Packing} from '../office/packing/shared/packing.model';
import {IEntity} from "./IEntity";

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

}
