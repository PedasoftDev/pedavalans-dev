import { IRoot } from "./main";

export namespace IOrganizationStructure {

    export namespace IEmployees {

        export interface ICreateEmployee {
            id: string;
            first_name: string;
            last_name: string;
            title_id: string;
            position_id: string;
            workplace_id: string;
            line_id: string;
            manager_id: string;
            department_id: string;
            job_start_date: string;
            birth_date: string;
            gender: string;
            department_start_date: string;
            position_start_date: string;
            phone: string;
            email: string;
            proxy_employee_id: string;
            tenant_id: string;
            realm_id: string;
            educational_status?: string;
        }

        export interface IEmployee extends IRoot {
            id: string;
            first_name: string;
            last_name: string;
            title_id: string;
            position_id: string;
            workplace_id: string;
            manager_id: string;
            line_id: string;
            department_id: string;
            job_start_date: string;
            birth_date: string;
            gender: string;
            department_start_date: string;
            position_start_date: string;
            phone: string;
            email: string;
            proxy_employee_id: string;
            is_active: boolean;
            is_deleted: boolean;
            tenant_id: string;
            realm_id: string;
            educational_status?: string;
        }

    }

    export namespace IEmployeeVocationalQualificationRelation {
        export interface IBase extends IRoot {
            employee_id: string;
            document_id: string;
            document_name: string;
            end_date?: string;
            document_type_id: string;
            document_type_name: string;
            tenant_id: string;
            is_active: boolean;
            is_deleted: boolean;
        }
        export interface ICreate {
            id: string;
            employee_id: string;
            document_id: string;
            document_name: string;
            end_date: string;
            document_type_id: string;
            document_type_name: string;
            tenant_id: string;
        }
    }

    export namespace IDepartments {
        export interface ICreateDepartment {
            id: string;
            record_id: string;
            name: string;
            parent_department_id?: string;
            parent_department_name?: string;
            tenant_id: string;
            realm_id: string;
        }
        export interface IDepartment extends IRoot {
            id: string;
            tenant_id: string;
            realm_id: string;
            record_id: string;
            name: string;
            parent_department_id?: string;
            parent_department_name?: string;
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

    export namespace IPositions {
        export interface ICreatePosition {
            id: string;
            tenant_id: string;
            realm_id: string;
            record_id: string;
            name: string;
            relatedVocationalQualifications?: string[]
        }

        export interface IPosition extends IRoot {
            id: string;
            tenant_id: string;
            realm_id: string;
            record_id: string;
            name: string;
            is_active: boolean;
            is_deleted: boolean;
        }
    }

    export namespace IPositionVocationalQualificationRelation {
        export interface IBase extends IRoot {
            position_id: string
            document_id: string
            document_name: string
            tenant_id: string
            is_active: boolean
            is_deleted: boolean
        }
        export interface ICreate {
            position_id: string
            document_id: string
            document_name: string
            tenant_id: string
        }
    }

    export namespace ITitles {
        export interface ICreateTitle {
            id: string;
            tenant_id: string;
            realm_id: string;
            record_id: string;
            name: string;
        }

        export interface ITitle extends IRoot {
            id: string;
            tenant_id: string;
            realm_id: string;
            record_id: string;
            name: string;
            is_active: boolean;
            is_deleted: boolean;
        }
    }
    export namespace IWorkPlace {
        export interface ICreateWorkPlace {
            id: string;
            record_id: string;
            name: string;
            tenant_id: string;
            realm_id: string;
        }
        export interface IWorkPlace extends IRoot {
            id: string;
            tenant_id: string;
            realm_id: string;
            record_id: string;
            name: string;
            is_active: boolean;
            is_deleted: boolean;
        }
    }

}
