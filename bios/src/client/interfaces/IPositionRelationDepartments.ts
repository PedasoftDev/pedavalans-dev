import { IRoot } from "./main";

namespace IPositionRelationDepartments {
  export interface IBase extends IRoot {
    id: string;
    parent_department_id: string;
    parent_department_name: string;
    relation_position_id: string;
    relation_position_name: string;
    is_active: boolean;
    is_deleted: boolean;
  }

  export interface ICreate {
    id: string;
    parent_department_id: string;
    parent_department_name: string;
    relation_position_id: string;
    relation_position_name: string;
  }
}

export default IPositionRelationDepartments;