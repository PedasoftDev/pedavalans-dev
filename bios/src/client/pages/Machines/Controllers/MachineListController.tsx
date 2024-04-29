import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { HStack, ReactView, Spinner, UIFormController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import { Views } from "../../../components/Views";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useGetMe } from "@realmocean/sdk";
import Machine from "../../../../server/hooks/machine/main";
import Competency from "../../../../server/hooks/competency/main";
import CompetencyMachineAssociation from "../../../../server/hooks/competencyMachineAssocation/main";
import { GridContainer } from "../Views/View";

export class MachineListController extends UIFormController {


    public LoadView(): UIView {

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { machineList, isLoading: isLoadingMachine } = Machine.GetList(me?.prefs?.organization);
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { competencyMachineAssociationList, isLoading: isLoadingAssociation } = CompetencyMachineAssociation.GetList(me?.prefs?.organization);


        return (
            isLoading || isLoadingMachine || isLoadingCompetencyList || isLoadingAssociation ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {
                        const [rowsActive, setRowsActive] = useState(true);
                        const [filterKey, setFilterKey] = useState("");

                        const columns: GridColDef[] = [
                            {
                                field: 'code',
                                headerName: 'Makine Kodu',
                                width: 150
                            },
                            {
                                field: 'name',
                                headerName: 'Makine Adı',
                                width: 200
                            },
                            {
                                field: 'difficulty_coefficient',
                                headerName: 'Zorluk Katsayısı',
                                width: 150
                            },
                            {
                                field: 'related_competencies',
                                headerName: 'İlgili Yetkinlikler',
                                flex: 1,
                                valueGetter: (params: any) => {
                                    return competencyMachineAssociationList.filter((item) => item.machine_id === params.id).map((item) => {
                                        return competencyList.find((comp) => comp.$id === item.competency_id)?.competency_name;
                                    }).join(", ");
                                }
                            },
                            {
                                field: 'is_active',
                                headerName: 'İşlemler',
                                width: 150,
                                renderCell: (params: any) => (
                                    <div style={{ display: "flex", gap: 15 }}>
                                        <Button size="small" variant="outlined" onClick={() => navigate(`/app/machine/edit/${params.id}`)}>Düzenle</Button>
                                    </div>
                                )
                            }
                        ];

                        const handleSetActiveRows = () => {
                            setRowsActive(!rowsActive);
                        }

                        const handleSearch = (e: any) => {
                            setFilterKey(e.target.value);
                        }
                        return (
                            VStack({ spacing: 15, alignment: cTopLeading })(
                                HStack({ alignment: cLeading })(
                                    Views.Title("Makineler").paddingTop("10px")
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                HStack({ alignment: cTop })(
                                    ReactView(
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                            width: "100%",
                                        }}>
                                            <div style={{
                                                display: "flex",
                                                gap: "10px",
                                                alignItems: "center"
                                            }}>
                                                <div style={{ width: "80%" }}>
                                                    <TextField placeholder="Makine Arayın..." size="small" fullWidth onChange={handleSearch} />
                                                </div>
                                                <Tooltip title={`${rowsActive ? "Pasif" : "Aktif"} Makineleri Göster`}>
                                                    <IconButton onClick={handleSetActiveRows}>
                                                        <FilterAltOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <div style={{
                                                    width: "20%",
                                                }}>
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/machine/create")}>Yeni Makine</Button>
                                                </div>
                                            </div>
                                            <GridContainer>
                                                <StyledDataGrid
                                                    rows={machineList.filter((item) => item.is_active === rowsActive).filter((item) => item.name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
                                                    columns={columns}
                                                    getRowId={(row) => row.$id}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                />
                                            </GridContainer>
                                        </div>
                                    )
                                )
                            ).padding("0 20px")
                        )
                    })
        )

    }
}