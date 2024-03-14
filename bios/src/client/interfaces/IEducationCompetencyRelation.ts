import { IRoot } from "./main";

namespace IEducationCompetencyRelation {
    export interface IBase extends IRoot {
        education_id: string;
        competency_id: string;
        competency_name: string;
        tenant_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }
    export interface ICreate {
        education_id: string;
        competency_id: string;
        competency_name: string;
        tenant_id: string;
    }
}

export default IEducationCompetencyRelation;