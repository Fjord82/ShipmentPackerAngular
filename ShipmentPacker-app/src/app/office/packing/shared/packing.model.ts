import {Project} from '../../project/shared/project.model';

export class Packing {
  id?: number;
  packingName?: string;
  creatorName?: string;
  deliveryAddress?: string;
  deliveryDate?: string;
  itemType?: string;
  freightType?: string;
  projectIds?: number[];
  projects?: Project[];
}
