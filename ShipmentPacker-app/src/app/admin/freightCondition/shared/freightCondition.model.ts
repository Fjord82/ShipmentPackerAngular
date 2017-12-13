import {Item} from '../../item/shared/item.model';

export class FreightCondition {
  id?: number;
  dangerousGoodsNumber?: string;
  dangerousGoodsName?: string;
  itemIds?: number[];
  items?: Item[];
}
