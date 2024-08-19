import { IRoot } from "./main";

namespace IEducationCompetencyStatusInfos {
    export interface IBase extends IRoot {
        education_id: string;
        id: string;
        competency_id: string;
        lower_bound: string;
        upper_bound: string;
        competency_level: string;
        competency_level_id: string;
        tenant_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }

    export interface ICreate {
        education_id: string;
        id: string;
        competency_id: string;
        lower_bound: string;
        upper_bound: string;
        competency_level: string;
        competency_level_id: string;
        tenant_id: string;
    }
}

export default IEducationCompetencyStatusInfos;