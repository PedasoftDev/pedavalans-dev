import { IRoot } from "./main";

namespace IEducation {
    export interface IBase extends IRoot {
        code: string;
        name: string;
        type: string;
        tenant_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }

    export interface ICreate {
        code: string;
        name: string;
        type: string;
        tenant_id: string;
        relatedCompetencies: string[];
    }
}

export default IEducation;