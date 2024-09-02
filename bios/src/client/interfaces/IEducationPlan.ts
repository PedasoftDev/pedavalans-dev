import { IRoot } from "./main";

namespace IEducationPlan {
    export interface IBase extends IRoot {
        education_plan_id: string;
        education_plan_name: string;
        work_place_id?: string;
        work_place_name?: string;
        plan_start_date: string;
        plan_end_date: string;
        tenant_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }

    export interface ICreate {
        education_plan_id: string;
        education_plan_name: string;
        work_place_id?: string;
        work_place_name?: string;
        plan_start_date: string;
        plan_end_date: string;
        tenant_id: string;
    }
}

export default IEducationPlan;