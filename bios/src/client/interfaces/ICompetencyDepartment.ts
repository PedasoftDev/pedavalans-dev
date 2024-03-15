import { IRoot } from "./main";

namespace ICompetencyDepartment {

    export interface ICreateCompetencyDepartment {
        competency_department_table_id: string;
        competency_department_id: string;
        competency_department_name: string;
        competency_id: string;
        tenant_id: string;
    }

    export interface ICompetencyDepartment extends IRoot {
        competency_department_table_id: string;
        competency_department_id: string;
        competency_department_name: string;
        competency_id: string;
        tenant_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }

}

export default ICompetencyDepartment;