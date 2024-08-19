import { Button, TextField, Tooltip } from '@mui/material'
import { GridColDef, } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import { MdDisplaySettings } from 'react-icons/md'
import StyledDataGrid from '../../../../components/StyledDataGrid'
import { Resources } from '../../../../assets/Resources'
import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, useNavigate } from '@tuval/forms';
import { Query, Services, useGetMe } from '@realmocean/sdk'
import { Views } from '../../../../components/Views'
import AccountRelation from '../../../../../server/hooks/accountRelation/main'
import { GridContainer } from '../../Views/Views'
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../../../components/Tabs'
import OrganizationStructureWorkPlace from '../../../../../server/hooks/organizationStructureWorkPlace/main'
import AppInfo from '../../../../../AppInfo'
import Collections from '../../../../../server/core/Collections'


export class WorkPlaceListController extends UIController {


    public LoadView(): UIView {

        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id)
        const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);

        const navigate = useNavigate();

        return (
            isLoading || isLoadingResult || isLoadingWorkPlace ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const accountRelation = accountRelations[0]
                    const value = 5;

                    const [filterKey, setFilterKey] = useState("");
                    const [active, setActive] = useState(true);
                    const [lineRelationState, setLineRelationState] = useState<boolean>(false);
                    const columns: GridColDef[] = [
                        {
                            field: 'record_id',
                            headerName: 'Kayıt Kodu',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: 'name',
                            headerName: 'İş Yeri Adı',
                            width: 200,
                            flex: 1
                        },
                        {
                            field: '$createdAt',
                            headerName: 'Oluşturulma Tarihi',
                            width: 200,
                            flex: 1,
                            valueGetter: (params: any) => {
                                return Resources.Functions.formatDate(params.value);
                            }
                        },
                        {
                            field: 'actions',
                            headerName: 'İşlemler',
                            width: 100,
                            renderCell: (params: any) => (
                                <Button variant='text' onClick={() => {
                                    navigate(Resources.OrganizationStructureTabValues.find(x => x.value === value)?.link + "/" + params.row.$id);
                                }}>Düzenle</Button>
                            )
                        }
                    ];

                    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: any) => {
                        navigate(Resources.OrganizationStructureTabValues.find(x => x.value === newValue)?.link + "/list");
                    }
                    useEffect(() => {
                        Services.Databases.listDocuments(
                            AppInfo.Name,
                            AppInfo.Database,
                            Collections.Parameter,
                            [
                                Query.equal("name", "line_based_competency_relationship"),
                                Query.limit(10000),
                            ]
                        ).then((res) => {
                            setLineRelationState(res.documents[0]?.is_active)
                        })
                    }, [])
                    return (
                        VStack({ alignment: cTop })(
                            HStack({ alignment: cLeading })(
                                Views.Title(active ? "Organizasyon Yapısı" : "Organizasyon Yapısı / Pasif İş Yerleri").paddingTop("20px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            VStack({ alignment: cTop })(
                                ReactView(
                                    <div style={{ width: "100%", height: "100%" }}>
                                        <AntTabs value={value} onChange={handleChange}>
                                            {Resources.OrganizationStructureTabValues.map((tabValue) => (
                                                <AntTab
                                                    key={tabValue.value}
                                                    label={tabValue.label}
                                                    disabled={tabValue.value === 3 && !lineRelationState} // "Hatlar" sekmesi devre dışı bırakılır
                                                    {...a11yProps(tabValue.value)} />
                                            ))}
                                        </AntTabs>
                                        <TabPanel value={value} index={value}>
                                            <div style={{ display: "flex", flexDirection: "column", padding: "8px 0", gap: "5px" }
                                            }>
                                                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                                                    <div style={{ width: "60%" }}>
                                                        <TextField size='small' label='İş Yeri Arayın' variant='outlined' fullWidth onChange={(e) => setFilterKey(e.target.value)} />
                                                    </div>
                                                    <div style={{ width: "10%" }}>
                                                        {
                                                            <Tooltip title={`${active ? "Pasif" : "Aktif"} İş Yerlerini Göster`}>
                                                                <Button variant='contained' fullWidth onClick={() => setActive(!active)} size='small'><MdDisplaySettings size={20} /></Button>
                                                            </Tooltip>
                                                        }
                                                    </div>
                                                    <div style={{ width: "30%", display: "flex", gap: "5px" }}>
                                                        <Button variant='contained' fullWidth size='small' onClick={() => {
                                                            navigate(Resources.OrganizationStructureTabValues.find(x => x.value === value)?.link + "/create");
                                                        }}>Yeni İş Yeri</Button>
                                                    </div>
                                                </div>
                                                <GridContainer>
                                                    <StyledDataGrid
                                                        rows={workPlaces.filter(x => x.is_active === active && (x.name.toLowerCase().includes(filterKey.toLowerCase()) || x.record_id.toLowerCase().includes(filterKey.toLowerCase())))}
                                                        columns={columns} />
                                                </GridContainer>
                                            </div>
                                        </TabPanel>
                                    </div>

                                )
                            ).paddingTop("10px")
                        ).padding("0 10px 0 20px")
                    )
                })

        )
    }
}