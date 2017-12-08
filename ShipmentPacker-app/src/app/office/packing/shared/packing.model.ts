import {Project} from '../../project/shared/project.model';
import {ColliList} from '../../../workshop/colli/shared/colli.model';
import {IEntity} from "../../../shared/IEntity";

export class Packing implements IEntity {
  id?: number;
  packingName?: string;
  creatorName?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  itemType?: string;
  freightType?: string;
  projectIds?: number[];
  projects?: Project[];
  colliListIds?: number[];
  colliLists?: ColliList[];
  isActive?: boolean;

  toString(): string {
    return "#" + this.id + " " + this.packingName;
  }
}
