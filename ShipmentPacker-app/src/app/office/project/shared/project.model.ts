import {PackingList} from "../../../workshop/packingList/shared/packingList.model";

export class Project {
  id?: number;
  projectName?: string;
  creatorName?: string;
  customerName?: string;
  isActive?: boolean;
  packingLists?: PackingList[];
}
