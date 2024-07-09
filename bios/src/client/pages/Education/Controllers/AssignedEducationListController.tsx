import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Switch, TextField, Tooltip } from "@mui/material";
import { HStack, ReactView, Spinner, UIFormController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate, useParams } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Views } from "../../../components/Views";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Query, Services, useGetMe } from "@realmocean/sdk";
import AssignEducation from "../../../../server/hooks/assignEducation/main";
import IAssignedEducationResult from "../../../interfaces/IAssignedEducationResult";
import AssignEducationResult from "../../../../server/hooks/assignEducationResult/main";
import { Toast } from "../../../components/Toast";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import IAssignedEducation from "../../../interfaces/IAssignedEducation";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { selectAssignEducation, setAssignEducationToNull } from "../../../features/assignEducation";
import { DialogLabel, GridContainer } from "../Views/Views";
import getEducationReportToExcel from "../../../assets/Functions/getEducationReportToExcel";
import Education from "../../../../server/hooks/education/main";
import Competency from "../../../../server/hooks/competency/main";
import EducationCompetencyRelation from "../../../../server/hooks/educationCompetencyRelation/main";
import EducationPlan from "../../../../server/hooks/educationPlan/main";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "styled-components";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export class AssignedEducationListController extends UIFormController {


    public LoadView(): UIView {
        const { id } = useParams();

        const dispatch = useAppDispatch();
        const selector = useAppSelector;
        const setAssignEducationNull = () => dispatch(setAssignEducationToNull());

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { assignedEducationResultList, isLoadingAssignedEducationResultList } = AssignEducationResult.GetList(me?.prefs?.organization);
        const { updateAssignedEducation } = AssignEducation.Update();
        const { createAssignedEducationResult } = AssignEducationResult.Create();
        const { educationList, isLoading: isLoadingEducations } = Education.GetList();
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { educationCompetencyRelationList, isLoading: isLoadingRelation } = EducationCompetencyRelation.GetList(me?.prefs?.organization);

        const { educationPlanList, isLoading: isLoadingEducationPlan } = EducationPlan.GetList();

        const [rowsActive, setRowsActive] = useState(true);
        const [filterKey, setFilterKey] = useState("");

        return (
            isLoading || isLoadingResult || isLoadingAssignedEducationResultList || isLoadingEducationPlan || isLoadingEducations || isLoadingCompetencyList || isLoadingRelation ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {

                        const [assignedEducationList, setAssignedEducationList] = useState<IAssignedEducation.IBase[]>([]);
                        const [selectedAssinedEducationId, setSelectedAssinedEducationId] = useState<string>("");
                        const [open, setOpen] = useState(false);

                        /* GLOBAL STATE ASSIGN EDUCATION */
                        const assignEducationState: IAssignedEducation.IBase = selector(selectAssignEducation);

                        const [dialogForm, setDialogForm] = useState<IAssignedEducationResult.ICreate>({
                            assigned_education_id: "",
                            educator_comment: "",
                            education_id: "",
                            educator_id: "",
                            educator_name: "",
                            employee_id: "",
                            employee_name: "",
                            is_education_completed: false,
                            tenant_id: "",
                        });


                        const handleOpenDialog = (assigned_education_id: string) => {
                            setSelectedAssinedEducationId(assigned_education_id);
                            if (assignedEducationResultList.find((item) => item.assigned_education_id === assigned_education_id)) {
                                const result = assignedEducationResultList.find((item) => item.assigned_education_id === assigned_education_id);
                                setDialogForm({
                                    assigned_education_id: result.assigned_education_id,
                                    educator_comment: result.educator_comment,
                                    education_id: result.education_id,
                                    educator_id: result.educator_id,
                                    educator_name: result.educator_name,
                                    employee_id: result.employee_id,
                                    employee_name: result.employee_name,
                                    is_education_completed: result.is_education_completed,
                                    tenant_id: result.tenant_id
                                })
                            }
                            setOpen(true);
                        }

                        const handleCloseDialog = () => {
                            setOpen(false);
                        }

                        const handleSubmitDialog = () => {
                            const submitData: IAssignedEducationResult.ICreate = {
                                assigned_education_id: selectedAssinedEducationId,
                                educator_comment: dialogForm.educator_comment,
                                education_id: assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.education_id,
                                educator_id: assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.educator_id,
                                educator_name: assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.educator_name,
                                employee_id: assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.employee_id,
                                employee_name: assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.employee_name,
                                is_education_completed: dialogForm.is_education_completed,
                                tenant_id: me?.prefs?.organization
                            }
                            createAssignedEducationResult({
                                data: submitData,
                                documentId: selectedAssinedEducationId
                            }, () => {
                                if (submitData.is_education_completed) {
                                    updateAssignedEducation({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.AssignedEducation,
                                        documentId: selectedAssinedEducationId,
                                        data: { status: "completed" }
                                    }, () => {
                                        getAssignedEducationList();
                                        setOpen(false);
                                        setSelectedAssinedEducationId("");
                                        Toast.fire({
                                            icon: "success",
                                            title: "Eğitim sonucu başarıyla kaydedildi."
                                        })
                                    })
                                } else {
                                    getAssignedEducationList();
                                    setOpen(false);
                                    setSelectedAssinedEducationId("");
                                    Toast.fire({
                                        icon: "success",
                                        title: "Eğitim sonucu başarıyla kaydedildi."
                                    })
                                }

                            })
                        }


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
                                valueGetter: (params) => {
                                    return new Date(params.value).toLocaleDateString('tr-TR')
                                }
                            },
                            {
                                field: "end_date",
                                headerName: "Eğitim Bitiş Tarihi",
                                flex: 1,
                                valueGetter: (params) => {
                                    return new Date(params.value).toLocaleDateString('tr-TR')
                                }
                            },
                            {
                                field: "hour",
                                headerName: "Saat",
                                width: 100,
                            },
                            {
                                field: "status",
                                headerName: "Durum",
                                width: 100,
                                valueGetter: (params) => {
                                    return params.value === "completed" ? "Tamamlandı" : "Açık";
                                }
                            },
                            {
                                field: "$id",
                                headerName: "İşlemler",
                                width: (accountRelations[0].is_admin || accountRelations[0].authorization_profile === "admin") ? 200 : 100,
                                renderCell: (params) => {
                                    return (
                                        <div style={{ display: "flex", gap: "5px" }}>
                                            <Button onClick={() => handleOpenDialog(params.value)} size="small" fullWidth variant="text">
                                                İncele
                                            </Button>
                                            {(accountRelations[0].is_admin || accountRelations[0].authorization_profile === "admin") &&
                                                id ? <Button onClick={() => navigate(`/app/education/assigned/${id}/${params.value}`)} size="small" fullWidth variant="text">Düzenle</Button>
                                                : <Button onClick={() => navigate(`/app/education/assigned/${params.value}`)} size="small" fullWidth variant="text">Düzenle</Button>
                                            }
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

                        const getAssignedEducationList = async () => {

                            if (accountRelations[0].is_admin) {
                                const assignedData: IAssignedEducation.IBase[] = await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation,
                                    [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted", false), Query.limit(10000)]).then((res) => res.documents as any[]);
                                setAssignedEducationList(assignedData);
                            } else {
                                const assignedData: IAssignedEducation.IBase[] = await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation,
                                    [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("educator_id", me?.$id), Query.equal("is_deleted", false), Query.limit(10000)]).then((res) => res.documents as any[]);
                                setAssignedEducationList(assignedData);
                            }
                        };

                        useEffect(() => {

                            getAssignedEducationList();
                            if (assignEducationState) {
                                handleOpenDialog(assignEducationState.$id);
                                setTimeout(() => {
                                    setAssignEducationNull();
                                }, 1000);
                            }

                        }, [])


                        return (
                            VStack({ spacing: 15, alignment: cTopLeading })(
                                HStack({ alignment: cLeading })(
                                    Views.Title(
                                        id ?
                                            `${educationPlanList.find((item) => item.education_plan_id === id).education_plan_name} - Atanan Eğitimler`
                                            : "Atanan Eğitimler"
                                    )
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                HStack({ alignment: cTop })(
                                    ReactView(
                                        <div style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            gap: "10px",
                                            width: "100%",
                                        }}>
                                            <Dialog
                                                open={open}
                                                onClose={handleCloseDialog}
                                            >
                                                <DialogTitle>Eğitim Gerçekleştirme</DialogTitle>
                                                <DialogContent>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "400px", padding: "10px" }}>
                                                        <DialogLabel><strong>Eğitim Adı: </strong>{assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.education_name}</DialogLabel>
                                                        <DialogLabel><strong>Çalışan Adı: </strong>{assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.employee_name}</DialogLabel>
                                                        <DialogLabel><strong>Eğitim Yeri: </strong>{assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.location}</DialogLabel>
                                                        <TextField label="Eğitimcinin Yorumu" size="small" fullWidth multiline rows={4} value={dialogForm.educator_comment} onChange={(e) => setDialogForm({ ...dialogForm, educator_comment: e.target.value })} />
                                                        <FormControlLabel
                                                            sx={{ width: "100%", alignContent: "end" }}
                                                            onChange={(e: any) => {
                                                                setDialogForm({ ...dialogForm, is_education_completed: e.target.checked })
                                                            }}
                                                            value={dialogForm.is_education_completed}
                                                            control={<Switch color="primary"
                                                                checked={dialogForm.is_education_completed}
                                                            />
                                                            }
                                                            label="Eğitim Gerçekleşti"
                                                            labelPlacement="start"
                                                        />
                                                    </div>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button component="label" variant="contained" tabIndex={-1} startIcon={<CloudUploadIcon />}>Dosya Yükle<VisuallyHiddenInput type="file" /> </Button>
                                                    <Button onClick={handleCloseDialog} color='error' variant='contained'>İptal</Button>
                                                    {!assignedEducationResultList.find((item) => item.assigned_education_id === selectedAssinedEducationId) &&
                                                        <Button variant='contained' color='primary' onClick={handleSubmitDialog}>Kaydet</Button>}
                                                </DialogActions>
                                            </Dialog>

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
                                                <Tooltip title={`Eğitim Raporu`}>
                                                    <IconButton onClick={() => getEducationReportToExcel(educationList, competencyList, educationCompetencyRelationList, assignedEducationList)}>
                                                        <SummarizeIcon />
                                                    </IconButton>
                                                </Tooltip>
                                                <div style={{
                                                    width: "20%",
                                                    display: "flex",
                                                    gap: "10px"
                                                }}>
                                                    {
                                                        id ?
                                                            <Button size="small" fullWidth variant="outlined" onClick={() => navigate(`/app/education/assign/${id}`)}>Yeni Eğitim Ata</Button>
                                                            :
                                                            <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/assign")}>Yeni Eğitim Ata</Button>
                                                    }
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/assign")}>Yeni Eğitim Ata</Button>
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/list")}>Eğitimler</Button>
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/plans")}>Eğitim Planları</Button>
                                                </div>
                                            </div>
                                            <GridContainer>
                                                <StyledDataGrid
                                                    rows={
                                                        id ? assignedEducationList.filter((item) => item.education_plan_id === id && item.is_active === rowsActive && (item.education_name.toLowerCase().includes(filterKey.toLowerCase()))) :
                                                            assignedEducationList.filter((item) => item.is_active === rowsActive && item.education_plan_id === null).filter((item) => item.education_name.toLowerCase().indexOf(filterKey.toLowerCase()) > -1)
                                                    }
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
        );
    }
}