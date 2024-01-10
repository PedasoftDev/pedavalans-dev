import { cTopLeading, HStack, Spinner, State, UIController, UINavigate, UIRouteOutlet, UIScene, UIView, useState, VStack } from '@tuval/forms';
import { PortalMenu } from '../../../components/PortalMenu';
import { useGetMe } from '@realmocean/sdk';


export class CompetencyGroupController extends UIController {

    public LoadView(): UIView {

        const [theme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")))

        const { me, isLoading } = useGetMe("console");

        return (
            isLoading ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    UIScene(
                        HStack({ alignment: cTopLeading })(
                            PortalMenu("Yetkinlik Grupları"),
                            UIRouteOutlet().width('100%').height('100%').minWidth("")
                        ).background(theme ? "rgba(0,0,0,.85)" : "").foregroundColor(theme ? "white" : "")
                    )
        )
    }
}