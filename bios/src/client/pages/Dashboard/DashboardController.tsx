import { cTop, cTopLeading, HStack, ReactView, Spinner, UIController, UINavigate, useNavigate, VStack } from '@tuval/forms';
import React from 'react';
import { Chart, Series, Export, Tooltip } from 'devextreme-react/chart';
import { PortalMenu } from '../../components/PortalMenu';
import { Services, useGetMe } from '@realmocean/sdk';
import AppInfo from '../../../AppInfo';

const useGetBestFiveDepartments = [
    {
        x: "İnsan Kaynakları",
        y: 70
    },
    {
        x: "Koordinasyon",
        y: 60
    },
    {
        x: "Finansman",
        y: 80
    },
    {
        x: "Sosyal Sorumluluk",
        y: 60
    },
    {
        x: "Organizasyon",
        y: 55
    }
];
const useGetWorstFiveDepartments = [
    {
        x: "İnsan Kaynakları",
        y: 70
    },
    {
        x: "Koordinasyon",
        y: 60
    },
    {
        x: "Finansman",
        y: 80
    },
    {
        x: "Sosyal Sorumluluk",
        y: 60
    },
    {
        x: "Organizasyon",
        y: 55
    }
];



export class DashboardController extends UIController {

    navigate: any;

    protected BindRouterParams(routerParams?: any): void {
        Services.Databases.get(AppInfo.Name, AppInfo.Database).catch((err) => {
            err.code === 404 && this.navigate('/setup')
        })
    }

    public LoadView() {

        const { me, isLoading } = useGetMe(AppInfo.Name);

        this.navigate = useNavigate();

        return (
            isLoading ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    HStack({ alignment: cTopLeading })(
                        PortalMenu("Dashboard"),
                        VStack({ alignment: cTop })(
                            ReactView(
                                <div style={{ width: "100%", height: "100%", padding: "20px" }}>
                                    <span style={{ paddingTop: "15px", fontFamily: "Poppins", fontSize: "25px" }}
                                    >Dashboard</span>
                                    <div style={{ display: "flex", width: "100%", height: "100%", gap: "10px", justifyContent: "center", alignItems: "center" }}>
                                        <Chart style={{ height: "400px", width: "50%" }} dataSource={useGetBestFiveDepartments.sort((a, b) => { return a.y < b.y ? 1 : -1 })}>
                                            <Series
                                                valueField="y"
                                                argumentField="x"
                                                name="En Başarılı 5 Departman (%)"
                                                type="bar"
                                                color="#5A96E3" />
                                            <Export enabled={true} />
                                            <Tooltip
                                                enabled={true}
                                                location='edge'
                                            />
                                        </Chart>
                                        <Chart style={{ height: "400px", width: "50%" }} dataSource={useGetWorstFiveDepartments.sort((a, b) => { return a.y > b.y ? 1 : -1 })}>
                                            <Series
                                                valueField="y"
                                                argumentField="x"
                                                point={{
                                                    visible: true
                                                }}
                                                name="En Başarısız 5 Departman (%)"
                                                type="bar"
                                                color="#E7CEA6" />
                                            <Export enabled={true} />
                                            <Tooltip
                                                enabled={true}
                                                location='edge'

                                            />
                                        </Chart>
                                    </div>
                                </div>
                            )
                        ).width("100%").height("100%")
                    )

        )
    }
}