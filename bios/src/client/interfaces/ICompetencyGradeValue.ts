import { IRoot } from "./main";

namespace ICompetencyGradeValue {
    export interface ICreateCompetencyGradeValue {
        competency_grade_value_id: string;
        grade_level_id: string;
        grade_level_name: string;
        grade_level_number: string;
        competency_id: string;
        tenant_id: string;
    }

    export interface ICompetencyGradeValue extends IRoot {
        competency_grade_value_id: string;
        grade_level_id: string;
        grade_level_name: string;
        grade_level_number: string;
        competency_id: string;
        is_deleted_level: boolean;
        tenant_id: string;
    }
}

export default ICompetencyGradeValue;