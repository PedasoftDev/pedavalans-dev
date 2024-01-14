import { IRoot } from "./main";

namespace IParameters {
    export interface IParameter extends IRoot {
        id: string;
        name: string;
        tenant_id: string;
        is_show: boolean;
        is_active: boolean;
    }
}

export default IParameters;