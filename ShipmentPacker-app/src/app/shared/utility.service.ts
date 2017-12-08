import { Injectable } from '@angular/core';
import {Packing} from '../office/packing/shared/packing.model';

@Injectable()
export class UtilityService {


  constructor() { }


  activeList(list: Packing[]): Packing[] {
    const active: Packing[] = [];
    for (let packing of list) {
      if (packing.isActive) {
        active.push(packing);
      }
    }
    return active;
  }

  inactiveList(list: Packing[]): Packing[] {
    const inactive: Packing[] = [];
    for (let packing of list) {
      if (!packing.isActive) {
        inactive.push(packing);
      }
    }
    return inactive;
  }

}
