import { IRoot } from "./main";

namespace ITrainerEducations {
  export interface IBase extends IRoot {
    id: string;
    trainer_id: string;
    trainer_duty_id: string;
    trainer_duty_name: string;
    is_active: boolean;
    is_deleted: boolean;
  }

  export interface ICreate {
    id: string;
    trainer_id: string;
    trainer_duty_id: string;
    trainer_duty_name: string;
  }
}

export default ITrainerEducations;