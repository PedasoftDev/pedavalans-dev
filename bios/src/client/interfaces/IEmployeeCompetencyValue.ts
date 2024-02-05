namespace IEmployeeCompetencyValue {
    export interface IEmployeeCompetencyValue {
        employee_competency_value_id: string;
        employee_id: string;
        employee_name: string;
        polyvalence_table_id: string;
        polyvalence_table_name: string;
        competency_department_id: string;
        competency_department_name: string;
        competency_evaluation_period: string;
        competency_id: string;
        competency_name: string;
        competency_target_value: string;
        competency_real_value: string;
        competency_value_desc: string;
        is_active_competency_value: boolean;
        is_deleted_competency_value: boolean;
        tenant_id: string;
        realm_id: string;
    }
    export interface ICreateEmployeeCompetencyValue {
        employee_competency_value_id: string;
        employee_id: string;
        employee_name: string;
        polyvalence_table_id: string;
        polyvalence_table_name: string;
        competency_department_id: string;
        competency_department_name: string;
        competency_evaluation_period: string;
        competency_id: string;
        competency_name: string;
        competency_target_value: string;
        competency_real_value: string;
        competency_value_desc: string;
        tenant_id: string;
        realm_id: string;
    }
}