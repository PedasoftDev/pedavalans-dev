import { IRoot } from "./main";
namespace IProxyAccount {
    export interface IBase extends IRoot {
        agent_name: string;
        start_date: string;
        end_date: string;
        is_active: boolean;
        is_deleted: boolean;
    }
}

export default IProxyAccount;
