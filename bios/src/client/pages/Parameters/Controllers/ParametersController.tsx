import {
    Color,
    cTop,
    cTopLeading,
    HStack,
    Icon,
    ReactView,
    ScrollView,
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
import StringParameter from '../../../../server/hooks/stringParameter/main';
import CheckIcon from '@mui/icons-material/Check';
import Collections from '../../../../server/core/Collections';

export class ParametersController extends UIFormController {

    public LoadView() {


        const { me, isLoading: isLoad } = useGetMe("console");
        const navigate = useNavigate();

        const { parameters, isLoading } = Parameters.GetParameters();
        const { monitoring, isLoading: isLoadingMonitoring } = Monitoring.GetMonitoring(me?.prefs?.organization);
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { stringParameters: stringParametersCache, isLoading: isLoadingStringParameters } = StringParameter.GetList();
        const { updateParameter } = Parameters.UpdateParameter();


        return (
            isLoad || isLoading || isLoadingMonitoring || isLoadingResult || isLoadingStringParameters ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    UIViewBuilder(() => {

                        const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")));
                        const [stringParameters, setStringParameters] = useState([]);

                        useEffect(() => {
                            setStringParameters(stringParametersCache);
                        }, [])

                        const updateParameterProperty = (parameter: IParameters.IParameter) => {
                            Toast.fire({
                                icon: "info",
                                title: "Parametre güncelleniyor..."
                            })
                            localStorage.setItem(parameter.name, parameter.is_active ? "true" : "false");
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
                                PortalMenu("Parametreler").background(theme ? "rgba(0,0,0,.85)" : "white").foregroundColor(theme ? "white" : ""),
                                VStack({ alignment: cTop })(
                                    HStack({ spacing: 20 })(
                                        Views.PedaText("Parametreler").fontSize(19),
                                        Icon("\\f0e2").fontSize(30).cursor("pointer").marginRight("15px").foregroundColor({ hover: Color.gray500 })
                                            .onClick(() => window.location.href = "mailto:notification@pedabilisim.com"),
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
                                    ScrollView({ alignment: cTopLeading, axes: "cVertical" })(
                                        ReactView(
                                            <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                                                {accountRelations && accountRelations[0] && accountRelations[0].is_admin &&
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", alignItems: "center", padding: "10px" }}>
                                                        <div style={{ fontSize: "14px", fontWeight: 400 }}>
                                                            {"Mail Konfigürasyonu"}
                                                        </div>
                                                        <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <IconButton onClick={() => navigate("/app/mail-configuration/view")}>
                                                                <RxExternalLink size={20} />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                }
                                                {accountRelations && accountRelations[0] && accountRelations[0].is_admin &&
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", alignItems: "center", padding: "10px" }}>
                                                        <div style={{ fontSize: "14px", fontWeight: 400 }}>
                                                            {"Yetki Profilleri"}
                                                        </div>
                                                        <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <IconButton onClick={() => navigate("/app/authorization-profile/view")}>
                                                                <RxExternalLink size={20} />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                }
                                                {accountRelations && accountRelations[0] && accountRelations[0].is_admin &&
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", alignItems: "center", padding: "10px" }}>
                                                        <div style={{ fontSize: "14px", fontWeight: 400 }}>
                                                            {"Organizasyon Entegrasyonu"}
                                                        </div>
                                                        <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                            <IconButton onClick={() => navigate("/app/organization-integration/view")}>
                                                                <RxExternalLink size={20} />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                }
                                                {parameters.filter((x) => x.name != "position_based_polyvalence_management").filter((x) => x.name != "multiple_line_definition" && x.name != "work_place_definition" && x.name != "multiple_department_definition").map((parameter) =>
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
                                                {stringParameters.map((stringParameter, i) =>
                                                    <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", alignItems: "center", padding: "10px" }} key={i}>
                                                        <div style={{ fontSize: "14px", fontWeight: 400 }}>
                                                            {Resources.StringParameters.find(x => x.localStr === stringParameter?.name)?.name}
                                                        </div>
                                                        <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center", gap: "5px" }}>
                                                            <TextField
                                                                size="small"
                                                                value={stringParameter.value}
                                                                key={i}
                                                                onChange={(e) => {
                                                                    const value = e.target.value;
                                                                    if (!isNaN(Number(value))) {
                                                                        const updatedStringParameters = stringParameters;
                                                                        updatedStringParameters[i].value = value;
                                                                        setStringParameters(updatedStringParameters);
                                                                    } else {
                                                                        Toast.fire({
                                                                            icon: "error",
                                                                            title: "Lütfen geçerli bir sayı girin"
                                                                        });
                                                                        return;
                                                                    }
                                                                }}
                                                            />
                                                            <IconButton onClick={() => {
                                                                updateParameter({
                                                                    databaseId: AppInfo.Database,
                                                                    collectionId: Collections.StringParameter,
                                                                    documentId: stringParameter.$id,
                                                                    data: {
                                                                        value: stringParameter.value
                                                                    }
                                                                }, () => {
                                                                    Toast.fire({
                                                                        icon: "success",
                                                                        title: "Parametre güncellendi"
                                                                    });
                                                                });
                                                            }}>
                                                                <CheckIcon />
                                                            </IconButton>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    )
                                ).padding(40).background(theme ? "rgba(0,0,0,.85)" : "white").foregroundColor(theme ? "white" : "")
                            )
                        )
                    })
        )
    }
}
