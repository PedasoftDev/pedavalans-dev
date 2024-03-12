import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { HStack, ReactView, UIFormController, UIView, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import { Views } from "../../../components/Views";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';


export class EducationListController extends UIFormController {


    public LoadView(): UIView {

        const navigate = useNavigate();
        const [rowsActive, setRowsActive] = useState(true);
        const [filterKey, setFilterKey] = useState("");

        const columns: GridColDef[] = [
            {
                field: "code",
                headerName: "Eğitim Katalogu Kodu",
                width: 150,
            },
            {
                field: "name",
                headerName: "Eğitim Adı",
                flex: 1
            },
            {
                field: "relatedCompetencies",
                headerName: "İlgili Yetkinlikler",
                type: "string[]",
                flex: 1
            },
            {
                field: "type",
                headerName: "Eğitim Türü",
                width: 200,
            },
        ];

        const handleSetActiveRows = () => { }

        const handleSearch = (e: any) => { }


        return (
            VStack({ spacing: 15, alignment: cTopLeading })(
                HStack({ alignment: cLeading })(
                    Views.Title("Eğitimler").paddingTop("10px")
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
                                    <TextField placeholder="Eğitim Arayın..." size="small" fullWidth onChange={handleSearch} />
                                </div>
                                <Tooltip title={`${rowsActive ? "Pasif" : "Aktif"} Eğitimleri Göster`}>
                                    <IconButton onClick={handleSetActiveRows}>
                                        <FilterAltOutlinedIcon />
                                    </IconButton>
                                </Tooltip>
                                <div style={{
                                    width: "20%",
                                }}>
                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/create")}>Yeni Eğitim</Button>
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
    }
}