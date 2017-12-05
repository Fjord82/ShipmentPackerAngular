import {Packing} from '../../../office/packing/shared/packing.model';

export class Colli {
  id?: number;
  projectName?: string;
  workshopName?: string;
  totalWeight?: string;
  netWeight?: string;
  dimensions?: string;
  freightType?: string;
  isActive?: boolean;
  packingListIds?: number[];
  packingLists?: Packing[];
  itemType?: string;
}
