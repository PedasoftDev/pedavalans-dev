import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { HStack, ReactView, Spinner, UIFormController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import { Views } from "../../../components/Views";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useGetMe } from "@realmocean/sdk";
import Education from "../../../../server/hooks/education/main";
import EducationCompetencyRelation from "../../../../server/hooks/educationCompetencyRelation/main";
import { Resources } from "../../../assets/Resources";
import AssignEducation from "../../../../server/hooks/assignEducation/main";


export class AssignedEducationListController extends UIFormController {


    public LoadView(): UIView {

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { assignedEducationList, isLoadingAssignedEducationList } = AssignEducation.GetList(me?.prefs?.organization);

        const [rowsActive, setRowsActive] = useState(true);
        const [filterKey, setFilterKey] = useState("");

        return (
            isLoading || isLoadingAssignedEducationList ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {
                        const columns: GridColDef[] = [
                            {
                                field: "education_code",
                                headerName: "Eğitim Katalogu Kodu",
                                width: 150,
                            },
                            {
                                field: "education_name",
                                headerName: "Eğitim Adı",
                                flex: 1
                            },
                            {
                                field: "employee_name",
                                headerName: "Eğitimi Alacak Personel",
                                flex: 1,
                            },
                            {
                                field: "educator_name",
                                headerName: "Eğitimci",
                                flex: 1,
                            },
                            {
                                field: "start_date",
                                headerName: "Eğitim Başlangıç Tarihi",
                                flex: 1,
                            },
                            {
                                field: "end_date",
                                headerName: "Eğitim Bitiş Tarihi",
                                flex: 1,
                            },
                            {
                                field: "status",
                                headerName: "Durum",
                                width: 100,
                                valueGetter: (params) => {
                                    return params.value === "completed" ? "Tamamlandı" : "Açık";
                                }
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
                                    Views.Title("Atanan Eğitimler").paddingTop("10px")
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
                                                    display: "flex",
                                                    gap: "10px"
                                                }}>
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/assign")}>Yeni Eğitim Ata</Button>
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/list")}>Eğitimler</Button>
                                                </div>
                                            </div>
                                            <div style={{ height: "calc(100vh - 150px)", width: "calc(100vw - 330px)" }}>
                                                <StyledDataGrid
                                                    rows={assignedEducationList.filter((item) => item.is_active === rowsActive).filter((item) => item.education_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
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
        );
    }
}