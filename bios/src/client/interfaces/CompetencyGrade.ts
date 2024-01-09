import { IRoot } from "./main";

namespace ICompetencyGrade {

    export interface ICreateCompetencyGrade {
        competency_grade_name: string;
        is_active_grade: boolean;
        is_deleted_grade: boolean;
        tenant_id: string;
        realm_id: string;
    }

    export interface ICompetencyGrade extends IRoot {
        competency_grade_id: string;
        competency_grade_name: string;
        is_active_grade: boolean;
        is_deleted_grade: boolean;
        tenant_id: string;
        realm_id: string;
    }

    export interface IUpdateCompetencyGrade {
        competency_grade_id: string;
        competency_grade_name: string;
        is_active_grade: boolean;
        is_deleted_grade: boolean;
    }

    export interface ICompetencyGradeLevel extends IRoot {
        grade_id: string; // üste bağlı
        grade_level_id: string;
        grade_level_name: string;
        grade_level_number: string;
        is_active_level: boolean;
        is_deleted_level: boolean;
        tenant_id: string;
        realm_id: string;
    }
}

export default ICompetencyGrade;