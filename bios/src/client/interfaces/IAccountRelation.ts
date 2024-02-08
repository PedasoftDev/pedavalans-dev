import { IRoot } from "./main";

namespace IAccountRelation {
    export interface IBase extends IRoot {
        id: string;
        first_name: string;
        last_name: string;
        tenant_id: string;
        account_id: string;
        is_admin: boolean;
        is_active: boolean;
        is_deleted: boolean;
    }

    export interface ICreate {
        id: string;
        first_name?: string;
        last_name?: string;
        tenant_id: string;
        account_id: string;
        is_admin: boolean;
    }
}

export default IAccountRelation;
