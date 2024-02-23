import { cCenter, cLeading, cTop, cTopLeading, ForEach, HStack, ReactView, ScrollView, Spinner, UIController, UIViewBuilder, useNavigate, VStack } from '@tuval/forms';
import React, { useState } from 'react';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Views } from '../../../components/Views';
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main';
import { useGetMe } from '@realmocean/sdk';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';


export class PolyvalenceUnitListController extends UIController {
    // accountName: string;
    // tenantName: string;

    // protected BindRouterParams() {
    //     Promise.all([
    //         RealmBrokerClient.GetSessionInfo(),
    //         PolivalansBrokerClient.GetParameterByNameAndTenantId("Polivalans tablolarında yetkilendirme kullanılsın mı?"),
    //     ]).then(res => {
    //         const [sessionInfo, unitTableAuth] = res;
    //         this.accountName = sessionInfo.account_name;
    //         this.tenantName = sessionInfo.tenant_name;
    //         if (unitTableAuth && sessionInfo.is_tenant_admin == false) {
    //             PolivalansBrokerClient.GetPolyvalenceTablesByDataResponsibleAndViewerId().then((polyvalenceUnitTables) => {
    //                 this.showingPolyvalenceUnitTables = this.polyvalenceUnitTables = polyvalenceUnitTables
    //             })
    //         } else {
    //             PolivalansBrokerClient.GetPolyvalenceTables().then((polyvalenceUnitTables) => {
    //                 this.showingPolyvalenceUnitTables = this.polyvalenceUnitTables = polyvalenceUnitTables
    //             })
    //         }
    //         // this.showingPolyvalenceUnitTables = this.polyvalenceUnitTables = polyvalenceUnitTables
    //     })
    // }

    // private ShowDialog(polyvalence_table_id: string) {
    //     PolyvalenceUnitTableExcelDialog.Show({ polyvalence_table_id })
    // }

    public LoadView() {

        // const isAdmin = localStorage.getItem("polyvalenceUnitTableAuth") == "admin";
        const navigate = useNavigate();

        const { me, isLoading, error, isError } = useGetMe("console");
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);


        return (
            isLoading || isLoadingPolyvalenceUnit ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [isActive, setIsActive] = useState(true);
                    const [searchText, setSearchText] = useState("");

                    const filteredPolyvalenceUnitList = polyvalenceUnitList.filter(x => x.polyvalence_table_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);

                    return (
                        VStack({ alignment: cTopLeading })(
                            VStack({ alignment: cTopLeading })(
                                HStack({ alignment: cLeading })(
                                    Views.Title("Birim Polivalans Tabloları")
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                HStack({ spacing: 10 })(
                                    VStack(
                                        ReactView(
                                            <TextField label="Tablo Arayın" onChange={(e) => setSearchText(e.target.value)} fullWidth size="small" />
                                        )
                                    ).width("80%"),
                                    ReactView(
                                        <Tooltip title={`${isActive ? "Pasif" : "Aktif"} Yetkinlik Gruplarını Göster`}>
                                            <IconButton onClick={() => setIsActive(!isActive)}>
                                                <FilterAltOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ),
                                    VStack(
                                        ReactView(
                                            <Button size="small" fullWidth variant="outlined" onClick={() =>
                                                // navigate(isAdmin ? "/app/com.pedasoft.app.pedavalans/polyvalenceUnit/add" : "/app/com.pedasoft.app.pedavalans/")}>Yeni Tablo</Button>
                                                navigate("/app/polyvalence-unit/create")}>Yeni Tablo</Button>
                                        )
                                    ).width("20%")
                                ),
                            ).height().paddingTop("15px"),
                            HStack({ alignment: cTop })(
                                filteredPolyvalenceUnitList.length > 0 ?
                                    ScrollView({ axes: "cVertical" })(
                                        HStack({ alignment: cTop })(
                                            ...ForEach(filteredPolyvalenceUnitList.filter(x => x.is_active_table === isActive).sort((a, b) => a.polyvalence_table_name.localeCompare(b.polyvalence_table_name)))((item, i) =>
                                                Views.PolyvalenceUnitCard(item.polyvalence_table_name, item.polyvalence_department_name, item.polyvalence_evaluation_frequency,

                                                    //    [
                                                    // {
                                                    //     title: "Excel'e Aktar",
                                                    //     action: () => {
                                                    //         // this.ShowDialog(item.polyvalence_table_id)
                                                    //     }
                                                    // },
                                                    {
                                                        title: "Düzenle",
                                                        action: () => navigate(`/app/polyvalence-unit/edit/${item.polyvalence_table_id}`)
                                                    },
                                                    () => navigate(`/app/polyvalence-unit/report/${item.polyvalence_table_id}`)
                                                    //   ],
                                                ).margin("0 20px 20px 0")
                                            ),
                                            // isAdmin ? Views.NewPolyvalenceUnitCard("/app/com.pedasoft.app.pedavalans/polyvalenceUnit/add").margin("0 20px 20px 0") : null
                                            Views.NewPolyvalenceUnitCard("/app/polyvalence-unit/create").margin("0 20px 20px 0")

                                        ).wrap("wrap").paddingTop("10px")
                                    )
                                    :
                                    HStack({ alignment: cCenter })(
                                        // isAdmin ? Views.NewPolyvalenceUnitCard("/app/com.pedasoft.app.pedavalans/polyvalenceUnit/add") : null
                                        Views.NewPolyvalenceUnitCard("/app/polyvalence-unit/create")
                                    )
                            ).marginBottom("10px")
                        ).padding("0 20px")
                    )
                })
        )


    }
}
