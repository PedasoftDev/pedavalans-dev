import { cCenter, cLeading, cTop, cTopLeading, ForEach, HStack, ReactView, ScrollView, Spinner, State, UIController, UIViewBuilder, useNavigate, VStack } from '@tuval/forms';
import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Views } from '../../../components/Views';
import { Query, Services } from '@realmocean/sdk';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import IPolyvalenceUnit from '../../../interfaces/IPolyvalenceUnit';
import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';
import { Resources } from '../../../assets/Resources';
import IAccountRelation from '../../../interfaces/IAccountRelation';
import { Toast } from '../../../components/Toast';

interface IPolyvalenceUnitWithResponsible extends IPolyvalenceUnit.IPolyvalenceUnit {
    is_responsible: boolean;
    is_viewer: boolean;
    is_admin: boolean;
}
export class PolyvalenceUnitListController extends UIController {
    public LoadView() {

        const isAdmin = localStorage.getItem("isAdmin") === "true";
        const navigate = useNavigate();
        // const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);
        const [polyvalenceUnitList, setPolyvalenceUnitList] = useState<IPolyvalenceUnitWithResponsible[]>(null);

        useEffect(() => {
            Services.Accounts.get().then((me) => {
                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.limit(10000), Query.equal("name", Resources.ParameterLocalStr.polyvalence_unit_table_auth), Query.equal("tenant_id", me?.prefs?.organization)]).then((parameter) => {
                    if (parameter && parameter.documents[0] && parameter.documents[0]?.is_active) {
                        Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, [Query.limit(10000), Query.equal("account_id", me.$id)]).then((accountRelation: any) => {
                            const accountRelationData: IAccountRelation.IBase = accountRelation.documents[0];
                            if (accountRelationData.is_admin || accountRelationData.authorization_profile === "admin") {
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
                                    setPolyvalenceUnitList(unitTables.documents as any);
                                })
                            } else {
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible, [Query.limit(10000), Query.equal("responsible_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                    const dataResponsibleTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer, [Query.limit(10000), Query.equal("viewer_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                        const viewerTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                        Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
                                            const unitTablesData: IPolyvalenceUnitWithResponsible[] = unitTables.documents as any;
                                            const filteredUnitTables = unitTablesData.filter((x) => dataResponsibleTableIds.includes(x.$id) || viewerTableIds.includes(x.$id));
                                            setPolyvalenceUnitList(filteredUnitTables.map((x) => {
                                                return {
                                                    ...x,
                                                    is_admin: false,
                                                    is_responsible: dataResponsibleTableIds.includes(x.$id),
                                                    is_viewer: viewerTableIds.includes(x.$id)
                                                }
                                            }));
                                        })
                                    })
                                })
                            }
                        })
                    } else {
                        Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
                            const unitTablesData: IPolyvalenceUnitWithResponsible[] = unitTables.documents as any;
                            setPolyvalenceUnitList(unitTablesData.map((x) => { return { ...x, is_admin: true, is_responsible: true, is_viewer: true } }));
                        })
                    }
                })
            }).catch((err) => {
                console.log(err);
                Toast.fire({ icon: "error", title: "Yetkinlik tabloları yüklenirken bir hata oluştu." });
                navigate("/");
            })
        }, []);


        return (
            polyvalenceUnitList == null ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [isActive, setIsActive] = useState(true);
                    const [searchText, setSearchText] = useState("");

                    const filteredPolyvalenceUnitList = polyvalenceUnitList.filter(x => x.polyvalence_table_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);

                    return (
                        VStack({ alignment: cTopLeading })(
                            VStack({ alignment: cTopLeading })(
                                HStack({ alignment: cLeading })(
                                    Views.Title("Polivalans Tabloları")
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                HStack({ spacing: 10 })(
                                    VStack(
                                        ReactView(
                                            <TextField label="Tablo Arayın" onChange={(e) => setSearchText(e.target.value)} fullWidth size="small" />
                                        )
                                    ).width(isAdmin ? "80%" : "100%"),
                                    ReactView(
                                        <Tooltip title={`${isActive ? "Pasif" : "Aktif"} Yetkinlik Gruplarını Göster`}>
                                            <IconButton onClick={() => setIsActive(!isActive)}>
                                                <FilterAltOutlinedIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ),
                                    VStack(
                                        ReactView(
                                            <div style={{ width: "100%" }}>
                                                {isAdmin ?
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate(isAdmin ? "/app/polyvalence-unit/create" : "/")}>Yeni Tablo</Button>
                                                    : null
                                                }
                                            </div>
                                        )
                                    ).width(isAdmin ? "20%" : "0%")
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
                                                    item.is_admin || item.is_responsible || isAdmin ? {
                                                        title: "Düzenle",
                                                        action: () => navigate(`/app/polyvalence-unit/edit/${item.polyvalence_table_id}`)
                                                    } : null,
                                                    () => navigate(`/app/polyvalence-unit/report/${item.polyvalence_table_id}`)
                                                    //   ],
                                                ).margin("0 20px 20px 0")
                                            ),
                                            isAdmin ? Views.NewPolyvalenceUnitCard("/app/polyvalence-unit/create").margin("0 20px 20px 0") : null

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
