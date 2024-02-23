import { IRoot } from "./main";

namespace IPolyvalenceUnitTableDataResponsible {
    export interface IBase extends IRoot {
        data_responsible_id: string;
        responsible_employee_id: string;
        responsible_employee_name: string;
        polyvalence_table_id: string;
        tenant_id: string;
        realm_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }
    export interface ICreate {
        data_responsible_id: string;
        responsible_employee_id: string;
        responsible_employee_name: string;
        polyvalence_table_id: string;
        tenant_id: string;
        realm_id: string;
    }
}

export default IPolyvalenceUnitTableDataResponsible;