import { IRoot } from "./main";
namespace IProxyAccount {
    export interface IBase extends IRoot {
        principal_id: string;
        principal_name: string;
        agent_id: string;
        agent_name: string;
        start_date: string;
        end_date: string;
        is_active: boolean;
        is_deleted: boolean;
        password: string;
        email: string;
    }
}

export default IProxyAccount;
