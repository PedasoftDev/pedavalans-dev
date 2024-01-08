import { cTopLeading, HStack, State, UIController, UIRouteOutlet, UIScene, useNavigate } from "@tuval/forms";
import { PortalMenu } from "../../../components/PortalMenu";
import { Services } from "@realmocean/sdk";
import AppInfo from "../../../../AppInfo";
export class CompetencyGradeController extends UIController {

    @State()
    public theme: boolean;

    private navigate: any;

    private getTheme() {
        this.theme = JSON.parse(localStorage.getItem("pedavalans_theme"));
    }

    protected BindRouterParams() {
        Services.Accounts.get().catch((err) => {
            err.code === 401 && this.navigate('/login')
        })
        Services.Databases.get(AppInfo.Name, AppInfo.Database).catch((err) => {
            err.code === 404 && this.navigate('/setup')
        })
        this.getTheme()
    }

    public LoadView(): any {
        this.navigate = useNavigate();
        return (
            UIScene(
                HStack({ alignment: cTopLeading })(
                    PortalMenu("Yetkinlik Düzeyleri"),
                    UIRouteOutlet().width('100%').height('100%').minWidth("")
                ).background(this.theme ? "rgba(0,0,0,.85)" : "").foregroundColor(this.theme ? "white" : "")
            )
        )
    }
}