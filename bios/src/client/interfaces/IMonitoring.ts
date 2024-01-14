import { IRoot } from "./main";

namespace IMonitoring {
    export interface IMonitoring extends IRoot {

        id: string;
        lowest_accepted_average: string;
        tenant_id: string;
        realm_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }
}

export default IMonitoring;