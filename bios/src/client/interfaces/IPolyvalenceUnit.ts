import { IRoot } from './main';
namespace IPolyvalenceUnit {

    export interface IPolyvalenceUnit extends IRoot {
        polyvalence_table_id: string;
        polyvalence_table_name: string;
        polyvalence_department_id: string;
        polyvalence_department_name: string;
        polyvalence_evaluation_frequency: string;
        is_active_table: boolean;
        is_deleted_table: boolean;
        tenant_id: string;
        realm_id: string;
    }

    export interface ICreatePolyvalenceUnit {
        polyvalence_table_id: string;
        polyvalence_table_name: string;
        polyvalence_department_id: string;
        polyvalence_department_name: string;
        polyvalence_evaluation_frequency: string;
        tenant_id: string;
        realm_id: string;
    }

}

export default IPolyvalenceUnit;