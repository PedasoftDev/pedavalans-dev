import { HStack, UIController, UIRouteOutlet, cTopLeading } from "@tuval/forms";
import { useState } from "react";
import { PortalMenu } from "../../../components/PortalMenu";

export class OrganizationStructureController extends UIController {

    public LoadView(): any {
        const [theme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")))
        return (
            HStack({ alignment: cTopLeading })(
                PortalMenu("Organizasyon Yapısı"),
                UIRouteOutlet().width('100%').height('100%').minWidth("").minWidth("")
            ).background(theme ? "rgba(0,0,0,.85)" : "white").foregroundColor(theme ? "white" : "")
        )
    }
}