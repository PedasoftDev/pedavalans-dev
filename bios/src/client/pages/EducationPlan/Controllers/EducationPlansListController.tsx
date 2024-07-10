import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { HStack, ReactView, Spinner, UIFormController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate } from "@tuval/forms";
import React, { useState } from "react";
import { Views } from "../../../components/Views";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import { useGetMe } from "@realmocean/sdk";
import { Resources } from "../../../assets/Resources";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { GridContainer } from "../Views/Views";
import EducationPlan from "../../../../server/hooks/educationPlan/main";


export class EducationPlansListController extends UIFormController {


    public LoadView(): UIView {

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { educationPlanList, isLoading: isLoadingEducationPlan } = EducationPlan.GetList();

        const [rowsActive, setRowsActive] = useState(true);
        const [filterKey, setFilterKey] = useState("");

        return (
            isLoading || isLoadingEducationPlan || isLoadingResult ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {
                        const columns: GridColDef[] = [
                            {
                                field: "education_plan_name",
                                headerName: "Eğitim Plan Adı",
                                flex: 1,
                            },
                            {
                                field: 'plan_start_date',
                                headerName: 'Plan Başlangıç Tarihi',
                                flex: 1,
                                align: "center",
                                valueGetter: (params: any) => {
                                    return Resources.Functions.formatDate(params.value);
                                }
                            },
                            {
                                field: 'plan_end_date',
                                headerName: 'Plan Bitiş Tarihi',
                                flex: 1,
                                align: "center",
                                valueGetter: (params: any) => {
                                    return Resources.Functions.formatDate(params.value);
                                }
                            },
                            {
                                field: "$id",
                                headerName: "İşlemler",
                                width: 230,
                                align: "center",
                                renderCell: (params) => {
                                    return (
                                        <div style={{ display: "flex", gap: "3px" }}>
                                            {(accountRelations[0].is_admin || accountRelations[0].authorization_profile == "admin") &&
                                                <Button size="small" variant="outlined" onClick={() => navigate(`/app/education/plan-edit/${params.value}`)}>Düzenle</Button>
                                            }<Button size="small" variant="outlined" onClick={() => navigate(`/app/education/planed/${params.value}`)}>Atanan Eğitimler</Button>
                                        </div>
                                    )
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
                                    Views.Title("Eğitim Planları").paddingTop("10px")
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
                                                <div style={{ width: "70%" }}>
                                                    <TextField placeholder="Eğitim Planı Arayın..." size="small" fullWidth onChange={handleSearch} />
                                                </div>
                                                <Tooltip title={`${rowsActive ? "Pasif" : "Aktif"} Eğitim Planlarını Göster`}>
                                                    <IconButton onClick={handleSetActiveRows}>
                                                        <FilterAltOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <div style={{
                                                    width: "30%",
                                                    display: "flex",
                                                    gap: "10px"
                                                }}>
                                                    {(accountRelations[0].is_admin || accountRelations[0].authorization_profile === "admin") && <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/planed")}>Yeni Eğitim Planı Ekle</Button>}
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/list")}>Eğitimler</Button>
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/assigned")}>Atanan Eğitimler</Button>
                                                </div>
                                            </div>
                                            <GridContainer>
                                                <StyledDataGrid
                                                    rows={educationPlanList.filter((item) => item.is_active === rowsActive).filter((item) => item.education_plan_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
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