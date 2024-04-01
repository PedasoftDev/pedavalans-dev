import { IRoot } from "./main";

namespace IAssignedEducationResult {
    export interface ICreate {
        assigned_education_id: string;
        education_id: string;
        employee_id: string;
        employee_name: string;
        educator_id: string;
        educator_name: string;
        educator_comment: string;
        is_education_completed: boolean;
        tenant_id: string;
    }

    export interface IBase extends IRoot {
        assigned_education_id: string;
        education_id: string;
        employee_id: string;
        employee_name: string;
        educator_id: string;
        educator_name: string;
        educator_comment: string;
        is_education_completed: boolean;
        tenant_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }
}

export default IAssignedEducationResult;