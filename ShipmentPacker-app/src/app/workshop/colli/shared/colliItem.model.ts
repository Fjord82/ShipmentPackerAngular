import {ColliList} from './colli.model';
import {Item} from '../../../admin/item/shared/item.model';

export class ColliItem {
  id?: number;
  colliListId?: number;
  itemId?: number;
  count?: number;
  colliList?: ColliList;
  item?: Item;
}
