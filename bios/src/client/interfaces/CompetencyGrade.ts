namespace ICompetencyGrade {

    interface IRoot {
        $id?: string;
        $updated_at?: string;
        $created_at?: string;
        $updated_by?: string;
        $created_by?: string;
    }

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
}