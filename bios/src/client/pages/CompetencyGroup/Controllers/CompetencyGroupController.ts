import { cTopLeading, HStack, State, UIController, UIRouteOutlet, UIScene, UIView } from '@tuval/forms';
import { PortalMenu } from '../../../components/PortalMenu';


export class CompetencyGroupController extends UIController {

    @State()
    public theme: boolean;

    private getTheme() {
        this.theme = JSON.parse(localStorage.getItem("pedavalans_theme"));
    }

    protected BindRouterParams() {
        this.getTheme()
    }

    public LoadView(): UIView {
        return (
            UIScene(
                HStack({ alignment: cTopLeading })(
                    PortalMenu("Yetkinlik Grupları"),
                    UIRouteOutlet().width('100%').height('100%').minWidth("")
                ).background(this.theme ? "rgba(0,0,0,.85)" : "").foregroundColor(this.theme ? "white" : "")
            )
        )
    }
}