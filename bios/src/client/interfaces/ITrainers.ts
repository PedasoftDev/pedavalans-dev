import { IRoot } from "./main";
 
namespace ITrainers {
    export interface IBase extends IRoot {
        id: string;
        trainer_id: string;
        trainer_name: string;
        is_active: boolean;
        is_deleted: boolean;
    }
 
    export interface ICreate {
        id: string;
        trainer_id: string;
        trainer_name: string;
    }
}
 
export default ITrainers;