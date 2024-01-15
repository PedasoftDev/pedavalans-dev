import { IRoot } from "./main";

export namespace IOrganizationStructure {

    export namespace IEmployees {

        export interface ICreateEmployee {
            first_name: string;
            last_name: string;
            title_id: string;
            position_id: string;
            line_id: string;
            manager_id: string;
            department_id: string;
        }

        export interface IUpdateEmployee {
            id: string;
            first_name: string;
            last_name: string;
            title_id: string;
            position_id: string;
            manager_id: string;
            line_id: string;
            department_id: string;
            is_active: boolean;
        }

        export interface IEmployee {
            id: string;
            first_name: string;
            last_name: string;
            title_id: string;
            position_id: string;
            manager_id: string;
            line_id: string;
            department_id: string;
            is_active: boolean;
        }

        export interface IDeleteEmployee {
            id: string;
        }

    }

    export namespace IDepartments {
        export interface ICreateDepartment {
            id: string;
            record_id: string;
            name: string;
            tenant_id: string;
            realm_id: string;
        }
        export interface IDepartment extends IRoot {
            id: string;
            tenant_id: string;
            realm_id: string;
            record_id: string;
            name: string;
            is_active: boolean;
            is_deleted: boolean;
        }
    }

    export namespace ILines {

        export interface ICreateLine {
            id: string;
            record_id: string;
            name: string;
            tenant_id: string;
            realm_id: string;
            department_id: string;
            department_name: string;
        }

        export interface ILine extends IRoot {
            id: string;
            tenant_id: string;
            realm_id: string;
            record_id: string;
            name: string;
            is_active: boolean;
            is_deleted: boolean;
            department_id: string;
            department_name: string;
        }

        export interface ICreateOrUpdateCompetencyLineRelation {
            competency_id: string;
            line_ids: string[];
            created_at: string;
        }

    }

    export namespace ICompetencyLineRelation {
        export interface ICompetencyLineRelation {
            competency_id: string;
            competency_target_value: string;
            created_at: string;
            created_by: string;
            id: string;
            is_deleted: boolean;
            line_id: string;
            realm_id: string;
            tenant_id: string;
            updated_at: string;
            updated_by: string;
        }
    }

}
