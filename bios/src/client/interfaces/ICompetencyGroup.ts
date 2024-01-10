import { IRoot } from "./main";

namespace ICompetencyGroup {
    export interface IGetCompetencyGroup extends IRoot {
        competency_group_id: string;
        competency_group_name: string;
        competency_grade_id: string;
        competency_grade_name: string;
        is_active_group: boolean;
        is_deleted_group: boolean;
        tenant_id: string;
        realm_id: string;
    }

    export interface ICrateCompetencyGroup {
        competency_group_id: string;
        competency_group_name: string;
        competency_grade_id: string;
        competency_grade_name: string;
    }
}

export default ICompetencyGroup;