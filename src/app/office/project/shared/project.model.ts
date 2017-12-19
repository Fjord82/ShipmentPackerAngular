import {Packing} from '../../packing/shared/packing.model';
import {IEntity} from "../../../shared/IEntity";

export class Project implements IEntity{
  id?: number;
  projectName?: string;
  creatorName?: string;
  customerName?: string;
  isActive?: boolean;
  packingLists?: Packing[];
}
