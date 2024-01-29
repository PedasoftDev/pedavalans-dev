import { IRoot } from "./main";

namespace IPolyvalenceUnitTableLineRelation {
    export interface IPolyvalenceUnitTableLineRelation extends IRoot {
        polyvalence_table_line_relation_id: string;
        polyvalence_table_id: string;
        line_id: string;
        tenant_id: string;
        realm_id: string;
        is_deleted: boolean;
    }

}

export default IPolyvalenceUnitTableLineRelation;