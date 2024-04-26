import { IRoot } from "./main";

namespace IAssignedEducation {
    export interface IBase extends IRoot {
        education_id: string;
        education_code: string;
        education_name: string;
        employee_id: string;
        employee_name: string;
        educator_id: string;
        educator_name: string;
        start_date: string;
        end_date: string;
        hour: string;
        status: string;
        is_active: boolean;
        is_deleted: boolean;
    }
    export interface ICreate {
        education_id: string;
        education_code: string;
        education_name: string;
        employee_id: string;
        employee_name: string;
        educator_id: string;
        educator_name: string;
        start_date: string;
        end_date: string;
        hour: string;
        status: string;
        tenant_id: string;
    }
}

export default IAssignedEducation;
