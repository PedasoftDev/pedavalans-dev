import { IRoot } from "./main";

namespace IStringParameter {
    export interface IBase extends IRoot {
        name: string;
        value: string;
    }

    export interface ICreate {
      name: string;
      value?: string;
    }
}

export default IStringParameter;