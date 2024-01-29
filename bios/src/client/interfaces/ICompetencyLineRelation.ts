import { IRoot } from "./main";

namespace ICompetencyLineRelation {
    export interface ICompetencyLineRelation extends IRoot {
        id: string;
        competency_id: string;
        competency_target_value: string;
        line_id: string;
        tenant_id: string;
        realm_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }

    export interface ICreateCompetencyLineRelation {
        id: string;
        competency_id: string;
        competency_target_value: string;
        line_id: string;
        tenant_id: string;
        realm_id: string;
    }
}

export default ICompetencyLineRelation;