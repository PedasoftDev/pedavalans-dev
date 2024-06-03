import { UIController, UIScene, HStack, cTopLeading, UIRouteOutlet, UIView, Spinner, VStack, UINavigate, useState } from "@tuval/forms";
import { PortalMenu } from "../../../components/PortalMenu";
import { useGetMe } from "@realmocean/sdk";
export class CompetencyEvaluationPeriodController extends UIController {

    public LoadView(): UIView {

        const [theme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")))

        return (
            UIScene(
                HStack({ alignment: cTopLeading })(
                    PortalMenu("Değerlendirme Dönemi"),
                    UIRouteOutlet().width('100%').height('100%').minWidth("")
                ).background(theme ? "rgba(0,0,0,.85)" : "white").foregroundColor(theme ? "white" : "")
            )
        )
    }
}