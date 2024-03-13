import { IRoot } from "./main";

namespace IMachine {
    export interface IBase extends IRoot {
        id: string;
        tenant_id: string;
        code: string;
        name: string;
        department_id: string;
        is_active_machine: string;
        difficulty_coefficient: string;
        is_active: string;
        is_deleted: string;
    }
    export interface ICreate {
        id: string;
        tenant_id: string;
        code: string;
        name: string;
        department_id: string;
        is_active_machine: string;
        difficulty_coefficient: string;
    }
}

export default IMachine