import { cCenter, cLeading, cTop, cTopLeading, ForEach, HStack, ReactView, ScrollView, Spinner, State, UIController, UIViewBuilder, useNavigate, VStack } from '@tuval/forms';
import React, { useEffect, useState } from 'react';
import { Button, IconButton, TextField, Tooltip } from '@mui/material';
import { Views } from '../../../components/Views';
import { Query, Services, useGetMe } from '@realmocean/sdk';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import IPolyvalenceUnit from '../../../interfaces/IPolyvalenceUnit';
import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';
import { Resources } from '../../../assets/Resources';
import IAccountRelation from '../../../interfaces/IAccountRelation';
import { Toast } from '../../../components/Toast';
import { IOrganizationStructure } from '../../../interfaces/IOrganizationStructure';
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
import PolyvalenceUnitPositionRelation from '../../../../server/hooks/polyvalenceUnitPositionRelation/main';
import Parameters from '../../../../server/hooks/parameters/main';
import PolyvalenceUnitTableDataResponsible from '../../../../server/hooks/polyvalenceUnitTableDataResponsible/main';
import PolyvalenceUnitTableDataViewer from '../../../../server/hooks/polyvalenceUnitTableDataViewer/main';
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main';
import AccountRelation from '../../../../server/hooks/accountRelation/main';

interface IPolyvalenceUnitWithResponsible extends IPolyvalenceUnit.IPolyvalenceUnit {
    is_responsible: boolean;
    is_viewer: boolean;
    is_admin: boolean;
    positions?: string[];
}

const positionBased = localStorage.getItem("position_based_polyvalence_management") === "true" ? true : false;

export class PolyvalenceUnitListController extends UIController {


    public LoadView() {

        const isAdmin = localStorage.getItem("isAdmin") === "true";
        const navigate = useNavigate();

        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);

        const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);
        const { polyvalenceUnitPositionRelations, isLoading: isLoadingPolyvalenceUnitPositionRelations } = PolyvalenceUnitPositionRelation.List();
        const { parameters: tableAuth, isLoading: isLoadingTableAuth } = Parameters.GetParameterByName(Resources.ParameterLocalStr.polyvalence_unit_table_auth)
        const { dataResponsible, isLoadingDataResponsible } = PolyvalenceUnitTableDataResponsible.GetListByAccountId(me?.$id);
        const { dataViewer, isLoadingDataViewer } = PolyvalenceUnitTableDataViewer.GetListByAccountId(me?.$id);
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);


        return (
            isLoading || isLoadingPolyvalenceUnitPositionRelations || isLoadingResult || isLoadingPositions || isLoadingPolyvalenceUnit || isLoadingDataViewer || isLoadingDataResponsible || isLoadingTableAuth ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [isActive, setIsActive] = useState(true);
                    const [searchText, setSearchText] = useState("");
                    const [isLoadingFirst, setIsLoadingFirst] = useState(true);

                    const [filteredPolyvalenceUnitList, setFilteredPolyvalenceUnitList] = useState<IPolyvalenceUnitWithResponsible[]>([]);

                    useEffect(() => {
                        if (tableAuth[0]?.is_active) {
                            if (accountRelations[0].is_admin || accountRelations[0].authorization_profile === "admin") {
                                setFilteredPolyvalenceUnitList(polyvalenceUnitList.map(x => {
                                    const positionIds = polyvalenceUnitPositionRelations.filter(y => y.polyvalence_unit_id === x.polyvalence_table_id)
                                    const positionNames = []
                                    positionIds.forEach(z => {
                                        const position = positions.find(y => y.$id === z.position_id)
                                        if (position) {
                                            positionNames.push(position.name)
                                        }
                                    })
                                    console.log(positionNames)
                                    return {
                                        ...x,
                                        is_responsible: true,
                                        is_viewer: true,
                                        is_admin: true,
                                        positions: positionNames
                                    }
                                }))
                            }
                            setIsLoadingFirst(false)
                        }
                    }, [])

                    const filterPolyvalenceUnitList = filteredPolyvalenceUnitList.filter(x => x.polyvalence_table_name.toLowerCase().indexOf(searchText.toLowerCase()) > -1);

                    return (
                        isLoadingFirst ? VStack(Spinner()) :
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
                                    filterPolyvalenceUnitList.length > 0 ?
                                        ScrollView({ axes: "cVertical" })(
                                            HStack({ alignment: cTop })(
                                                ...ForEach(filterPolyvalenceUnitList.filter(x => x.is_active_table === isActive).sort((a, b) => a.polyvalence_table_name.localeCompare(b.polyvalence_table_name)))((item, i) =>
                                                    positionBased ?
                                                        Views.PolyvalenceUnitCardPosition(item.polyvalence_table_name, item.positions?.join(", "),
                                                            item.polyvalence_evaluation_frequency,
                                                            item.is_admin || item.is_responsible || isAdmin ? {
                                                                title: "Düzenle",
                                                                action: () => navigate(`/app/polyvalence-unit/edit/${item.polyvalence_table_id}`)
                                                            } : null,
                                                            () => navigate(`/app/polyvalence-unit/report/${item.polyvalence_table_id}`)
                                                        ).margin("0 20px 20px 0")
                                                        :
                                                        Views.PolyvalenceUnitCard(item.polyvalence_table_name, item.polyvalence_department_name,
                                                            item.polyvalence_evaluation_frequency,
                                                            item.is_admin || item.is_responsible || isAdmin ? {
                                                                title: "Düzenle",
                                                                action: () => navigate(`/app/polyvalence-unit/edit/${item.polyvalence_table_id}`)
                                                            } : null,
                                                            () => navigate(`/app/polyvalence-unit/report/${item.polyvalence_table_id}`)
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
