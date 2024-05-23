import { IRoot } from "./main";

namespace IAccountRelation {
    export interface IBase extends IRoot {
        id: string;
        tenant_id: string;
        account_id: string;
        mail: string;
        authorization_profile: string;
        is_admin: boolean;
        is_active: boolean;
        is_deleted: boolean;
    }

    export interface ICreate {
        id: string;
        authorization_profile: string;
        mail: string;
        tenant_id: string;
        account_id: string;
        is_admin: boolean;
    }
}

export default IAccountRelation;
