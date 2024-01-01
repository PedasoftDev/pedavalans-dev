
import {
    BiosController,
    UIView
} from "@tuval/forms";


import { Routes } from "../Routes";


export class MainController extends BiosController {
    public override LoadBiosView(): UIView {
        return (
            Routes()
        )
    }
}