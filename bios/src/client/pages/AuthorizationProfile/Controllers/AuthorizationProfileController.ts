import { cTopLeading, HStack, UIController, UIRouteOutlet, useState } from '@tuval/forms';
import { PortalMenu } from '../../../components/PortalMenu';

export class AuthorizationProfileController extends UIController {

    public LoadView(): any {
        const [theme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")))
        return (
            HStack({ alignment: cTopLeading })(
                PortalMenu(""),
                UIRouteOutlet().width('100%').height('100%').minWidth("").minWidth("")
            ).background(theme ? "rgba(0,0,0,.85)" : "white").foregroundColor(theme ? "white" : "")
        )
    }
}