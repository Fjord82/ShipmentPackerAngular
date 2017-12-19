import {Packing} from '../../../office/packing/shared/packing.model';
import {IEntity} from "../../../shared/IEntity";
import {ColliItem} from './colliItem.model';

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
  colliItems?: ColliItem[];
  colliItemsIds?: number[];
}
