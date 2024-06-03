import { HStack, UIController, UIRouteOutlet, UIScene, UIView, cTopLeading, useState } from "@tuval/forms";
import { PortalMenu } from "../../../components/PortalMenu";


export class EducationController extends UIController {

    public LoadView(): any {
        const [theme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")))
        return (
            UIScene(
                HStack({ alignment: cTopLeading })(
                    PortalMenu("Eğitimler"),
                    UIRouteOutlet().width('100%').height('100%').minWidth("")
                ).background(theme ? "rgba(0,0,0,.85)" : "white").foregroundColor(theme ? "white" : "")
            )
        )
    }
}