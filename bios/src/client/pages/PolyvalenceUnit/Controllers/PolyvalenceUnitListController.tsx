import { cCenter, cLeading, cTop, cTopLeading, ForEach, HStack, ReactView, ScrollView, Spinner, State, UIController, UIViewBuilder, useNavigate, VStack } from '@tuval/forms';
import React, { useState } from 'react';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Views } from '../../../components/Views';
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main';
import { Query, Services, useGetMe } from '@realmocean/sdk';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import IPolyvalenceUnit from '../../../interfaces/IPolyvalenceUnit';
import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';
import { Resources } from '../../../assets/Resources';


export class PolyvalenceUnitListController extends UIController {
    // @State()
    // private unitTables: IPolyvalenceUnit.IPolyvalenceUnit[];

    // @State()
    // private authParameter: boolean;

    // @State()
    // private viewerTableIds: string[];

    // @State()
    // private dataResponsibleTableIds: string[];

    // @State()
    // private isAdmin: boolean;

    // protected BindRouterParams(): void {
    //     Services.Accounts.get().then((account) => {
    //         Services.Databases.getDocument(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, account.$id).then((accountRelation) => {
    //             this.isAdmin = accountRelation.is_admin;
    //             Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.equal("tenant_id", accountRelation.tenant_id), Query.equal("is_deleted_table", false)]).then((unitTables) => {
    //                 if (accountRelation.is_admin) {
    //                     this.unitTables = unitTables as any;
    //                 } else {
    //                     Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.equal("name", Resources.ParameterLocalStr.polyvalence_unit_table_auth), Query.equal("tenant_id", accountRelation.tenant_id), Query.equal("is_deleted", false)]).then((parameter) => {
    //                         if (parameter && parameter[0] && parameter.documents[0]?.is_active) {
    //                             let viewerTables = []
    //                             let dataResponsibleTables = []
    //                             Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible, [Query.equal("data_responsible_id", account.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
    //                                 dataResponsibleTables = polyvalenceUnitTables.documents;
    //                                 this.dataResponsibleTableIds = dataResponsibleTables.map((x) => x.polyvalence_table_id)
    //                             })
    //                             Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer, [Query.equal("viewer_employee_id", account.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
    //                                 viewerTables = polyvalenceUnitTables.documents;
    //                                 this.viewerTableIds = viewerTables.map((x) => x.polyvalence_table_id)
    //                             })
    //                             const tables = unitTables.documents.filter((x) => viewerTables.map((x) => x.polyvalence_table_id).includes(x.$id) || dataResponsibleTables.map((x) => x.polyvalence_table_id).includes(x.$id))
    //                             this.unitTables = tables as any;
    //                         }
    //                         this.authParameter = parameter.documents[0]?.is_active;
    //                     })
    //                 }
    //             })
    //         })
    //     })
    // }


    public LoadView() {

        const isAdmin = localStorage.getItem("isAdmin") === "true";
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
                                            <Button size="small" fullWidth variant="outlined" onClick={() => navigate(isAdmin ? "/app/polyvalence-unit/create" : "/")}>Yeni Tablo</Button>
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
                                            isAdmin ? Views.NewPolyvalenceUnitCard("//app/polyvalence-unit/create").margin("0 20px 20px 0") : null

                                        ).wrap("wrap").paddingTop("10px")
                                    )
                                    :
                                    HStack({ alignment: cCenter })(
                                        isAdmin ? Views.NewPolyvalenceUnitCard("/app/polyvalence-unit/create") : null
                                    )
                            ).marginBottom("10px")
                        ).padding("0 20px")
                    )
                })
        );
    }
}
