

import {Packing} from '../../packing/shared/packing.model';

export class Project {
  id?: number;
  projectName?: string;
  creatorName?: string;
  customerName?: string;
  isActive?: boolean;
  packingLists?: Packing[];
}
