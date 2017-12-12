import {PackItem} from '../../../office/packing/shared/packItem.model';
import {FreightCondition} from './freightCondition.model';
import {ColliItem} from '../../../workshop/colli/shared/colliItem.model';

export class Item {
  id?: number;
  itemName?: string;
  dimension?: string;
  weight?: number;
  dangerousGoods?: boolean;
  packItemsIds?: number[];
  packItems?: PackItem[];
  colliItemsIds?: number[];
  colliItems?:	ColliItem[];
  freightConditionIds?: number[];
  freightConditions?:	FreightCondition[];
}
