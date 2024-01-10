import { cTopLeading, HStack, Spinner, UIController, UINavigate, UIRouteOutlet, UIScene, useState, VStack } from "@tuval/forms";
import { PortalMenu } from "../../../components/PortalMenu";
import { useGetMe } from "@realmocean/sdk";
export class CompetencyGradeController extends UIController {

    public LoadView(): any {
        const [theme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")))

        const { me, isLoading } = useGetMe("console");

        return (
            isLoading ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    UIScene(
                        HStack({ alignment: cTopLeading })(
                            PortalMenu("Yetkinlik Düzeyleri"),
                            UIRouteOutlet().width('100%').height('100%').minWidth("")
                        ).background(theme ? "rgba(0,0,0,.85)" : "").foregroundColor(theme ? "white" : "")
                    )
        )
    }
}