
import { BiosController, UIView } from "@tuval/forms";
import { Routes } from "../Routes";
import Parameters from "../../server/hooks/parameters/main";
import { Resources } from "../assets/Resources";

export class MainController extends BiosController {
    public override LoadBiosView(): UIView {
        // title
        window.document.title = "Pedavalans";
        const theme = localStorage.getItem("pedavalans_theme")
        if (!theme) {
            localStorage.setItem("pedavalans_theme", "false")
        }
        // burada me yok o yüzden parametreleri alamıyor

        return (
            Routes()
        )
    }
}