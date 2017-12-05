import {Packing} from '../../../office/packing/shared/packing.model';

export class ColliList {
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
}
