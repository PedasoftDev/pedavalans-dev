import {
    Color,
    cTop,
    cTopLeading,
    HStack,
    Icon,
    ReactView,
    Spacer,
    Spinner,
    Toggle,
    UIFormController,
    UINavigate,
    UIViewBuilder,
    useNavigate,
    useState,
    VStack,
} from '@tuval/forms';
import { PortalMenu } from '../../../components/PortalMenu';
import { Views } from '../../../components/Views';
import Button from '../../../components/Button';
import React, { useEffect } from 'react';
import { Resources } from '../../../assets/Resources';
import { IconButton, Switch, TextField } from '@mui/material';
import Parameters from '../../../../server/hooks/parameters/main';
import Monitoring from '../../../../server/hooks/monitoring/main';
import { useGetMe } from '@realmocean/sdk';
import AppInfo from '../../../../AppInfo';
import IParameters from '../../../interfaces/IParameters';
import removeDollarProperties from '../../../assets/Functions/removeDollarProperties';
import { Toast } from '../../../components/Toast';
import { RxExternalLink } from 'react-icons/rx';
import AccountRelation from '../../../../server/hooks/accountRelation/main';

export class ParametersController extends UIFormController {

    public LoadView() {


        const { me, isLoading: isLoad } = useGetMe("console");
        const navigate = useNavigate();

        const { parameters, isLoading } = Parameters.GetParameters(me?.prefs?.organization);
        const { monitoring, isLoading: isLoadingMonitoring } = Monitoring.GetMonitoring(me?.prefs?.organization);
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { updateParameter } = Parameters.UpdateParameter();


        return (
            isLoad || isLoading || isLoadingMonitoring || isLoadingResult ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    UIViewBuilder(() => {

                        const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")));

                        const updateParameterProperty = (parameter: IParameters.IParameter) => {
                            Toast.fire({
                                icon: "info",
                                title: "Parametre güncelleniyor..."
                            })
                            updateParameter({
                                databaseId: AppInfo.Database,
                                collectionId: "pedavalans_parameter",
                                documentId: parameter.id,
                                data: removeDollarProperties(parameter)
                            })
                            Toast.fire({
                                icon: "success",
                                title: "Parametre güncellendi"
                            })
                        }

                        return (
                            HStack({ alignment: cTopLeading })(
                                PortalMenu("Parametreler").background(theme ? "rgba(0,0,0,.85)" : "").foregroundColor(theme ? "white" : ""),
                                VStack({ alignment: cTop })(
                                    HStack({ spacing: 20 })(
                                        Views.PedaText("Parametreler").fontSize(19),
                                        Icon("\\f0e2").fontSize(30).cursor("pointer").marginRight("15px").foregroundColor({ hover: Color.gray500 })
                                            .onClick(() => window.location.href = "mailto:info@pedabilisim.com"),
                                        Spacer(),
                                        HStack({ spacing: 5 })(
                                            Icon("\\e518").fontSize(22).foregroundColor("light").paddingBottom("3px"),
                                            Toggle()
                                                .onChange((e) => {
                                                    setTheme(e);
                                                    localStorage.setItem("pedavalans_theme", JSON.stringify(e));
                                                })
                                                .checked(theme),
                                            Icon("\\e51c").fontSize(22).foregroundColor("light").paddingBottom("3px")
                                        ).width().height(),
                                        ReactView(
                                            <Button variant="contained">Kaydet</Button>
                                        )
                                    ).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px").height(50).marginBottom(20),
                                    VStack({ alignment: cTopLeading })(
                                        ReactView(
                                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                                {accountRelations && accountRelations[0] && accountRelations[0].is_admin &&
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", alignItems: "center", padding: "10px" }}>
                                                        <div style={{ fontSize: "14px", fontWeight: 400 }}>
                                                            {"Yetki Profili Tanımlama"}
                                                        </div>
                                                        <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <IconButton onClick={() => navigate("/app/authorization-profile/view")}>
                                                                <RxExternalLink size={20} />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                }
                                                {parameters.map((parameter) =>
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", alignItems: "center", padding: "10px" }}>
                                                        <div style={{ fontSize: "14px", fontWeight: 400 }}>
                                                            {Resources.Parameters.find(x => x.localStr === parameter?.name)?.name}
                                                        </div>
                                                        <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <Switch color="primary"
                                                                checked={parameter.is_active}
                                                                onChange={(e) => updateParameterProperty({ ...parameter, is_active: e.target.checked })}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                                {monitoring.map((monitor) =>
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", alignItems: "center", padding: "10px" }}>
                                                        <div style={{ fontSize: "14px", fontWeight: 400 }}>
                                                            {"Yetkinlik performansı kabul kriteri(%)?"}
                                                        </div>
                                                        <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <TextField
                                                                size="small"
                                                                value={monitor.lowest_accepted_average}
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )
                                ).padding(40).background(theme ? "rgba(0,0,0,.85)" : "").foregroundColor(theme ? "white" : "")
                            )
                        )
                    })
        )


    }
}
