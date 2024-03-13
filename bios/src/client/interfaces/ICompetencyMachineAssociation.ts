import { IRoot } from "./main";

namespace ICompetencyMachineAssociation {
    export interface IBase extends IRoot {
        id: string;
        tenant_id: string;
        competency_id: string;
        machine_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }
}

export default ICompetencyMachineAssociation;
