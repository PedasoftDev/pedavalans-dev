import { IRoot } from "./main";

namespace ICompetency {

    export interface ICompetency extends IRoot {
        competency_id: string;
        competency_name: string;
        competency_group_id: string;
        competency_group_name: string;
        competency_description?: string;
        competency_target_value: string;
        competency_real_value: string;
        competency_value_desc: string;
        employee_id: string;
        employee_name: string;
        polyvalence_table_id: string;
        polyvalence_table_name: string;
        competency_evaluation_period: string;
        is_active_competency: boolean;
        is_deleted_competency: boolean;
        tenant_id: string;
        realm_id: string;
    }

    export interface ICreateCompetency {
        competency_id: string;
        competency_name: string;
        competency_description?: string;
        competency_group_id: string;
        competency_group_name: string;
        tenant_id: string;
        realm_id: string;
    }

}

export default ICompetency;