import {Packing} from './packing.model';
import {Item} from '../../../admin/item/shared/item.model';

export class PackItem{
  id?: number;
  packingListId?: number;
  packingList?: Packing;
  itemId?: number;
  item?: Item;
  count?: number;
  packed?: number;
}
