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
    UIController,
    UIFormController,
    UINavigate,
    UIViewBuilder,
    useNavigate,
    useState,
    VStack,
} from '@tuval/forms';
import { PortalMenu } from '../../components/PortalMenu';
import { Views } from '../../components/Views';
import Button from '../../components/Button';
import React from 'react';
import { Resources } from '../../assets/Resources';
import { DynoDialog } from '@realmocean/ui';
import { Switch, TextField } from '@mui/material';
import Parameters from '../../../server/hooks/parameters/main';
import Monitoring from '../../../server/hooks/monitoring/main';
import { useGetMe } from '@realmocean/sdk';

export class ParametersController extends UIFormController {

    public LoadView() {

        const { me, isLoading: isLoad } = useGetMe("console");

        const { parameters, isLoading } = Parameters.GetParameters();
        const { monitoring, isLoading: isLoadingMonitoring } = Monitoring.GetMonitoring(me?.prefs?.organization);

        const navigate = useNavigate();


        // const clicked = () => {
        //     DynoDialog.Show({
        //         "title": 'Create document',
        //         /*   "mutation":"_create_workspace", */
        //         "actions": [
        //             {
        //                 "label": "Save",
        //                 "type": "saveDocument",
        //                 /*  "successActions": [{
        //                      "type": "hide"
        //                  },
        //                  {
        //                      "type": "navigate",
        //                      "url": "/app/com.tuvalsoft.app.procetra/workspace/{{id}}"
        //                  }
        //                  ] */
        //                 /*  "successActions": [{
        //                  "type": "hide"
        //              },
        //              {
        //                  "type": "navigate",
        //                  "url": "/app/com.tuvalsoft.app.procetra/workspace/{{id}}"
        //              }
        //              ] */
        //             }
        //         ],
        //         "fieldMap": {
        //             "workspaceId": {
        //                 "name": "workspaceId",
        //                 "type": "virtual",
        //                 "value": "123"
        //             },
        //             "list_name": {
        //                 "label": "name",
        //                 "type": "text",
        //                 "name": "name"
        //             },
        //             "Surname": {
        //                 "label": "Surname",
        //                 "type": "text",
        //                 "name": "Surname"
        //             },
        //             "parent": {
        //                 "name": "parent",
        //                 "type": "virtual",
        //                 "value": "20"
        //             },
        //             "path": {
        //                 "name": "path",
        //                 "type": "virtual",
        //                 "value": "123"
        //             },
        //             /*   "description": {
        //                   "label": "Description",
        //                   "type": "text",
        //                   "multiline": true,
        //                   "name": "description"
        //               } */

        //         }
        //     })
        // }



        return (
            isLoad || isLoading || isLoadingMonitoring ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    UIViewBuilder(() => {
                        const [theme, setTheme] = useState(JSON.parse(localStorage.getItem("pedavalans_theme")));
                        return (
                            isLoad || isLoading || isLoadingMonitoring ? VStack(Spinner()) :
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
                                                    {parameters.map((parameter) =>
                                                        <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "0.5px solid lightgray", alignItems: "center", padding: "10px" }}>
                                                            <div style={{ fontSize: "14px", fontWeight: 400 }}>
                                                                {parameter.name}
                                                            </div>
                                                            <div style={{ width: "100px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                <Switch color="primary"
                                                                    checked={parameter.is_active}
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
