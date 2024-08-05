import { IRoot } from "./main";

namespace IAssignedEducationEmployees {
    export interface IBase extends IRoot {
        main_assigned_education_id: string;
        employee_id: string;
        employee_name: string;
        tenant_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }
    export interface ICreate {
        main_assigned_education_id: string;
        employee_id: string;
        employee_name: string;
        tenant_id: string;
    }
}

export default IAssignedEducationEmployees;
