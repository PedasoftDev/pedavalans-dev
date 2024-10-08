import { IRoot } from "./main";

namespace IAssignedEducation {
    export interface IBase extends IRoot {
        id?: string;
        education_id: string;
        education_code: string;
        education_name: string;
        employee_id?: string;
        employee_name?: string;
        educator_id: string;
        educator_name: string;
        education_plan_id?: string;
        education_plan_name?: string;
        start_date: string;
        start_hour: string;
        end_date: string;
        hour: string;
        status: string;
        location: string;
        is_active: boolean;
        is_deleted: boolean;
    }
    export interface ICreate {
        id?: string;
        education_id: string;
        education_code: string;
        education_name: string;
        employee_id?: string;
        employee_name?: string;
        educator_id: string;
        educator_name: string;
        education_plan_id?: string;
        education_plan_name?: string;
        start_date: string;
        start_hour: string;
        end_date: string;
        hour: string;
        status: string;
        location: string;
        tenant_id: string;
    }
}

export default IAssignedEducation;
