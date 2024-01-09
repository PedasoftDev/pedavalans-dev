import { cTopLeading, HStack, State, UIController, UIRouteOutlet, UIScene, UIView, useState } from '@tuval/forms';
import { PortalMenu } from '../../../components/PortalMenu';


export class CompetencyGroupController extends UIController {

    public LoadView(): UIView {

        const [theme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")))

        return (
            UIScene(
                HStack({ alignment: cTopLeading })(
                    PortalMenu("Yetkinlik Grupları"),
                    UIRouteOutlet().width('100%').height('100%').minWidth("")
                ).background(theme ? "rgba(0,0,0,.85)" : "").foregroundColor(theme ? "white" : "")
            )
        )
    }
}