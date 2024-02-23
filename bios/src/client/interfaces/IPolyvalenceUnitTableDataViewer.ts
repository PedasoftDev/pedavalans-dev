import { IRoot } from "./main";

namespace IPolyvalenceUnitTableDataViewer {
    export interface IBase extends IRoot {
        data_viewer_id: string;
        viewer_employee_id: string;
        viewer_employee_name: string;
        polyvalence_table_id: string;
        tenant_id: string;
        realm_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }
    export interface ICreate {
        data_viewer_id: string;
        viewer_employee_id: string;
        viewer_employee_name: string;
        polyvalence_table_id: string;
        tenant_id: string;
        realm_id: string;
    }
}

export default IPolyvalenceUnitTableDataViewer;