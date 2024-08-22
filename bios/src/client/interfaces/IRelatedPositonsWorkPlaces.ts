import { IRoot } from "./main";

namespace IRelatedPositonsWorkPlaces {
    export interface IBase extends IRoot {
        id: string;
        workplace_id: string;
        workplace_record_id: string;
        related_positon_id: string;
        related_position_record_id: string;
        is_active: boolean;
        is_deleted: boolean;
    }
    export interface ICreate {
        id: string;
        workplace_id: string;
        workplace_record_id: string;
        related_positon_id: string;
        related_position_record_id: string;
    }
}

export default IRelatedPositonsWorkPlaces;