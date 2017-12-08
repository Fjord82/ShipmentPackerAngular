import {Packing} from '../../../office/packing/shared/packing.model';
import {IEntity} from "../../../shared/IEntity";

export class ColliList implements IEntity {
  id?: number;
  projectName?: string;
  worker?: string;
  totalWeight?: number;
  netWeight?: number;
  dimensions?: string;
  freightType?: string;
  isActive?: boolean;
  packingListIds?: number[];
  packingLists?: Packing[];
  itemType?: string;

  toString(): string {
    return "Colli#" + this.id
  }


}
