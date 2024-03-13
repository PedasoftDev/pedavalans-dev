import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { HStack, ReactView, Spinner, UIFormController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import { Views } from "../../../components/Views";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { FiEdit } from "react-icons/fi";
import { useGetMe } from "@realmocean/sdk";

export class MachineListController extends UIFormController {


    public LoadView(): UIView {

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
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
                flex: 1
            },
            {
                field: 'difficulty_coefficient',
                headerName: 'Zorluk Katsayısı',
                width: 150
            },
            {
                field: 'is_active_machine',
                headerName: 'İşlemler',
                width: 150,
                renderCell: (params: any) => (
                    <div style={{ display: "flex", gap: 15 }}>
                        <div>
                            <FiEdit size={20} cursor={"pointer"} color="blue" onClick={() => navigate(`/app/machine/edit/${params.id}`)} />
                        </div>
                    </div>
                )
            }
        ];

        const handleSetActiveRows = () => {
            setRowsActive(!rowsActive);
        }

        const handleSearch = (e: any) => { }

        return (
            isLoading ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {
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
                                            <div style={{ height: "calc(100vh - 150px)", width: "calc(100vw - 330px)" }}>
                                                <StyledDataGrid
                                                    rows={[]}
                                                    columns={columns}
                                                    // rows={competencyList.filter((item) => item.is_active_competency === rowsActive).filter((item) => item.competency_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
                                                    // columns={columns}
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