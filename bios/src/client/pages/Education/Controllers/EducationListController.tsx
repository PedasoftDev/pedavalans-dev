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
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { GridContainer } from "../Views/Views";


export class EducationListController extends UIFormController {


    public LoadView(): UIView {

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { educationList, isLoading: isLoadingEducation } = Education.GetList(me?.prefs?.organization);
        const { educationCompetencyRelationList, isLoading: isLoadingRelation } = EducationCompetencyRelation.GetList(me?.prefs?.organization);

        const [rowsActive, setRowsActive] = useState(true);
        const [filterKey, setFilterKey] = useState("");

        return (
            isLoading || isLoadingEducation || isLoadingRelation || isLoadingResult ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {
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
                                flex: 1,
                                valueGetter: (params) => {
                                    const relatedCompetencies = educationCompetencyRelationList.filter((item) => item.education_id === params.row.$id);
                                    return relatedCompetencies.map((item) => item.competency_name).join(", ");
                                }
                            },
                            {
                                field: "type",
                                headerName: "Eğitim Türü",
                                width: 200,
                                valueGetter: (params) => {
                                    return Resources.EducationTypes.find((item) => item.id === params.value)?.name;
                                }
                            },
                            {
                                field: "$id",
                                headerName: "İşlemler",
                                width: 200,
                                renderCell: (params) => {
                                    return (
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <Button size="small" variant="outlined" onClick={() => navigate(`/app/education/edit/${params.value}`)}>Düzenle</Button>
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
                                                <div style={{ width: "70%" }}>
                                                    <TextField placeholder="Eğitim Arayın..." size="small" fullWidth onChange={handleSearch} />
                                                </div>
                                                <Tooltip title={`${rowsActive ? "Pasif" : "Aktif"} Eğitimleri Göster`}>
                                                    <IconButton onClick={handleSetActiveRows}>
                                                        <FilterAltOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <div style={{
                                                    width: "30%",
                                                    display: "flex",
                                                    gap: "10px"
                                                }}>
                                                    {accountRelations[0].is_admin && <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/create")}>Yeni Eğitim</Button>}
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/assigned")}>Atanan Eğitimler</Button>
                                                </div>
                                            </div>
                                            <GridContainer>
                                                <StyledDataGrid
                                                    rows={educationList.filter((item) => item.is_active === rowsActive).filter((item) => item.name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)}
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