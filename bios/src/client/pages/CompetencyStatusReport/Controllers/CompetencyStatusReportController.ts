
import { cTopLeading, HStack, UIController, UIRouteOutlet, UIScene, useState } from '@tuval/forms';
import { PortalMenu } from '../../../components/PortalMenu';

export class CompetencyStatusReportController extends UIController {

    public LoadView(): any {
        const [theme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")));
        return (
            UIScene(
                HStack({ alignment: cTopLeading })(
                    PortalMenu("Yetkinlik Durum İzleme Raporu"),
                    UIRouteOutlet().width('100%').height('100%')
                ).background(theme ? "rgba(0,0,0,.85)" : "white").foregroundColor(theme ? "white" : "")
            )
        )
    }
}
