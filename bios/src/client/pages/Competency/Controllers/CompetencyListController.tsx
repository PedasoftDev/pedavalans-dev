import { HStack, ReactView, Spinner, State, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useState, useEffect } from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import StyledDataGrid from "../../../components/StyledDataGrid";
import { Views } from "../../../components/Views";
import ICompetency from "../../../interfaces/ICompetency";
import Competency from "../../../../server/hooks/competency/main";
import { useGetMe } from "@realmocean/sdk";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";

export class CompetencyListController extends UIController {

    public LoadView(): UIView {

        const navigate = useNavigate();

        const { me, isLoading: isMeLoading } = useGetMe("console");

        const { competencyList, isLoadingCompetencyList, totalCompetencyList } = Competency.GetList(me?.prefs?.organization)
        const { competencyDepartmentList, isLoadingCompetencyDepartmentList, totalCompetencyDepartmentList } = CompetencyDepartment.GetList(me?.prefs?.organization)

        return (
            isMeLoading || isLoadingCompetencyList || isLoadingCompetencyDepartmentList ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [filterKey, setFilterKey] = useState("");
                    const [rowsActive, setRowsActive] = useState<boolean>(true);

                    const columns: GridColDef[] = [
                        {
                            field: "competency_name",
                            headerName: "Yetkinlik Adı",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1
                        },
                        {
                            field: "competency_group_name",
                            headerName: "Yetkinlik Grubu",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1
                        },
                        {
                            field: "competency_departments",
                            headerName: "Departmanlar",
                            minWidth: 200,
                            editable: false,
                            disableColumnMenu: true,
                            flex: 1,
                            valueGetter: (params) => {
                                return competencyDepartmentList.filter((item) => item.competency_id === params.row.$id)
                                    .map((item) => item.competency_department_name).join(", ");
                            }
                        },
                        {
                            field: "competency_id",
                            headerName: "İşlemler",
                            minWidth: 70,
                            editable: false,
                            disableColumnMenu: true,
                            renderCell: (params) => {
                                return (
                                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                        <Button variant="text" size="small" onClick={() => navigate(`/app/competency/edit/${params.value}`)}>Düzenle</Button>
                                    </div>
                                )
                            }
                        }
                    ];

                    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
                        setFilterKey(e.target.value);
                    }

                    const handleSetActiveRows = () => {
                        setRowsActive(!rowsActive);
                    }

                    return (
                        VStack({ spacing: 15, alignment: cTopLeading })(
                            HStack({ alignment: cLeading })(
                                Views.Title("Yetkinlikler").paddingTop("10px")
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
                                                <TextField placeholder="Yetkinlik Arayın..." size="small" fullWidth onChange={handleSearch} />
                                            </div>
                                            <Tooltip title={`${rowsActive ? "Pasif" : "Aktif"} Yetkinlikleri Göster`}>
                                                <IconButton onClick={handleSetActiveRows}>
                                                    <FilterAltOutlinedIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <div style={{
                                                width: "20%",
                                            }}>
                                                <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/competency/create")}>Yeni Yetkinlik</Button>
                                            </div>
                                        </div>
                                        <div style={{ height: "calc(100vh - 150px)", width: "calc(100vw - 330px)" }}>
                                            <StyledDataGrid
                                                rows={competencyList.filter((item) => item.is_active_competency === rowsActive).filter((item) => item.competency_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
                                                columns={columns}
                                                getRowId={(row) => row.$id}
                                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                            />
                                        </div>
                                    </div>
                                )
                            )
                        ).padding("0 20px")
                    )
                })
        )


    }
}