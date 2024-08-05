import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Switch, TextField, Tooltip } from "@mui/material";
import { HStack, ReactView, Spinner, UIFormController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate, useParams } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Views } from "../../../components/Views";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { Query, Services, useDeleteCache, useGetMe } from "@realmocean/sdk";
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
import AssignedEducationEmployees from "../../../../server/hooks/assignedEducationEmployees/main";

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
        const { deleteCache } = useDeleteCache(AppInfo.Name);

        const dispatch = useAppDispatch();
        const selector = useAppSelector;
        const setAssignEducationNull = () => dispatch(setAssignEducationToNull());

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { assignedEducationResultList, isLoadingAssignedEducationResultList } = AssignEducationResult.GetList(me?.prefs?.organization);
        const { updateAssignedEducation } = AssignEducation.Update();
        const { createAssignedEducationResult } = AssignEducationResult.Create();
        const { updateAssignedEducationResult } = AssignEducationResult.Update();
        const { educationList, isLoading: isLoadingEducations } = Education.GetList();
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { educationCompetencyRelationList, isLoading: isLoadingRelation } = EducationCompetencyRelation.GetList(me?.prefs?.organization);

        const { educationPlanList, isLoading: isLoadingEducationPlan } = EducationPlan.GetList();

        const { assignedEducationEmpList, isLoadingAssignedEducationEmpList } = AssignedEducationEmployees.GetList(me?.prefs?.organization);

        const [rowsActive, setRowsActive] = useState(true);
        const [filterKey, setFilterKey] = useState("");
        const [checkedRows, setCheckedRows] = useState({});


        return (
            isLoading || isLoadingResult || isLoadingAssignedEducationEmpList || isLoadingAssignedEducationResultList || isLoadingEducationPlan || isLoadingEducations || isLoadingCompetencyList || isLoadingRelation ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {

                        const [assignedEducationList, setAssignedEducationList] = useState<IAssignedEducation.IBase[]>([]);
                        const [selectedAssinedEducationId, setSelectedAssinedEducationId] = useState<string>("");
                        const [open, setOpen] = useState(false);
                        const [assignedEducationResultListArr, setAssignedEducationResultListArr] = useState<IAssignedEducationResult.IBase[]>([]);
                        /* GLOBAL STATE ASSIGN EDUCATION */
                        const assignEducationState: IAssignedEducation.IBase = selector(selectAssignEducation);
                        const [rowForms, setRowForms] = useState<IAssignedEducationResult.ICreate>({
                            assigned_education_id: "",
                            education_id: "",
                            employee_id: "",
                            employee_name: "",
                            educator_id: "",
                            educator_name: "",
                            educator_comment: "",
                            is_education_completed: false,
                            tenant_id: "",
                            attendance_status: true,
                            point: 0
                        });

                        // const handleCheckboxChange = (rowId, checked) => {
                        //     setChecked(true)
                        //     setRowForms(prevState => ({
                        //         ...prevState,
                        //         [rowId]: {
                        //             ...prevState[rowId],
                        //             attendance_status: checked
                        //         }
                        //     }));
                        // };
                        const handleCheckboxChange = (rowId, checked) => {
                            setCheckedRows(prevState => ({
                                ...prevState,
                                [rowId]: checked
                            }));
                            setRowForms(prevState => ({
                                ...prevState,
                                [rowId]: {
                                    ...prevState[rowId],
                                    attendance_status: checked
                                }
                            }));
                        };


                        const handleTextFieldChange = (rowId, field, value) => {
                            // Puan için 0-100 arası kontrol
                            if (field === 'point' && (value < 0 || value > 100)) {
                                return;
                            }

                            setRowForms(prevState => ({
                                ...prevState,
                                [rowId]: {
                                    ...prevState[rowId],
                                    [field]: value
                                }
                            }));
                        };

                        const initializeRowForm = (row) => {
                            if (!rowForms[row.$id]) {
                                setRowForms(prevState => ({
                                    ...prevState,
                                    [row.$id]: {
                                        employee_id: row.employee_id,
                                        employee_name: row.employee_name,
                                        educator_id: assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.educator_id,
                                        educator_name: assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.educator_name,
                                        education_id: assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.education_id,
                                        assigned_education_id: row.main_assigned_education_id,
                                        attendance_status: false,
                                        point: 0,
                                        educator_comment: ''
                                    }
                                }));
                            }
                        };


                        const [dialogForm, setDialogForm] = useState<IAssignedEducationResult.ICreate>({
                            assigned_education_id: "",
                            education_id: "",
                            employee_id: "",
                            employee_name: "",
                            educator_id: "",
                            educator_name: "",
                            educator_comment: "",
                            is_education_completed: false,
                            tenant_id: "",
                            attendance_status: true,
                            point: 0
                        });


                        const handleOpenDialog = (assigned_education_id: string) => {
                            setSelectedAssinedEducationId(assigned_education_id);
                            if (assignedEducationResultList.find((item) => item.assigned_education_id === assigned_education_id)) {
                                assignedEducationResultList.filter((item) => item.$id === item.row_id && item.assigned_education_id === assigned_education_id).map((item) => {
                                    setRowForms(prevState => ({
                                        ...prevState,
                                        [item.row_id]: {
                                            employee_id: item.employee_id,
                                            employee_name: item.employee_name,
                                            educator_id: item.educator_id,
                                            educator_name: item.educator_name,
                                            education_id: item.education_id,
                                            assigned_education_id: item.assigned_education_id,
                                            attendance_status: item.attendance_status,
                                            point: item.point,
                                            educator_comment: item.educator_comment
                                        }
                                    }))
                                })
                            }
                            setOpen(true);
                        }

                        const handleCloseDialog = () => {
                            deleteCache()
                            setOpen(false);
                        }

                        const handleSubmitDialog = async () => {
                            const formattedData = Object.keys(rowForms).map(rowId => {
                                const row = rowForms[rowId];
                                return {
                                    row_id: rowId,
                                    assigned_education_id: row.assigned_education_id,
                                    attendance_status: row.attendance_status,
                                    education_id: row.education_id,
                                    educator_comment: row.educator_comment,
                                    educator_id: row.educator_id,
                                    educator_name: row.educator_name,
                                    employee_id: row.employee_id,
                                    employee_name: row.employee_name,
                                    point: row.point,
                                    tenant_id: me?.prefs?.organization
                                };
                            });
                            for (const data of formattedData) {
                                try {
                                    await createAssignedEducationResult({
                                        documentId: data.row_id,
                                        data: data
                                    });
                                    Toast.fire({
                                        icon: "success",
                                        title: "Eğitim sonucu başarıyla kaydedildi."
                                    });
                                } catch (error) {
                                    console.error("Hata:", error);
                                    Toast.fire({
                                        icon: "error",
                                        title: "Eğitim sonucu kaydedilemedi."
                                    });
                                }
                            }
                            updateAssignedEducation({
                                databaseId: AppInfo.Database,
                                collectionId: Collections.AssignedEducation,
                                documentId: selectedAssinedEducationId,
                                data: {
                                    status: "completed"
                                }
                            });
                            handleCloseDialog();
                        }

                        const handleUpdateDialog = async () => {
                            const formattedData = Object.keys(rowForms).map(rowId => {
                                const row = rowForms[rowId];
                                return {
                                    row_id: rowId,
                                    assigned_education_id: row.assigned_education_id,
                                    attendance_status: row.attendance_status,
                                    education_id: row.education_id,
                                    educator_comment: row.educator_comment,
                                    educator_id: row.educator_id,
                                    educator_name: row.educator_name,
                                    employee_id: row.employee_id,
                                    employee_name: row.employee_name,
                                    point: row.point,
                                    tenant_id: me?.prefs?.organization
                                };
                            });
                            for (const data of formattedData) {
                                try {
                                    await updateAssignedEducationResult({
                                        databaseId: AppInfo.Database,
                                        collectionId: Collections.AssignedEducationResult,
                                        documentId: data.row_id,
                                        data: data
                                    });
                                    Toast.fire({
                                        icon: "success",
                                        title: "Eğitim sonucu başarıyla güncellendi."
                                    });
                                } catch (error) {
                                    console.error("Hata:", error);
                                    Toast.fire({
                                        icon: "error",
                                        title: "Eğitim sonucu güncellenemedi."
                                    });
                                }
                            }

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
                                valueGetter(params) {
                                    return assignedEducationEmpList.filter((item) => item.main_assigned_education_id === params.row.$id).map((item) => item.employee_name).join(", ");
                                },
                                renderCell(params) {
                                    const employeeNames = params.value.split(", ");
                                    return (
                                        <Tooltip title={employeeNames.join(", ")}>
                                            <span>{employeeNames.slice(0, 1).join(", ")}{employeeNames.length > 1 && ', ...'}</span>
                                        </Tooltip>
                                    )
                                },
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
                                headerName: "Eğitim Süresi(Saat)",
                                width: 130,
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
                                width: (accountRelations[0].is_admin || accountRelations[0].authorization_profile === "admin") ? 200 : 200,
                                renderCell: (params) => {
                                    return (
                                        <div style={{ display: "flex", gap: "5px" }}>
                                            <Button onClick={() => handleOpenDialog(params.value)} size="small" fullWidth variant="text">
                                                İncele
                                            </Button>
                                            {(accountRelations[0].is_admin || accountRelations[0].authorization_profile === "admin") &&
                                                id ? <Button onClick={() => navigate(`/app/education-plan/assigned/${id}/${params.value}`)} size="small" fullWidth variant="text">Düzenle</Button>
                                                : <Button onClick={() => navigate(`/app/education-plan/assigned/${params.value}`)} size="small" fullWidth variant="text">Düzenle</Button>
                                            }
                                        </div>
                                    )
                                }
                            }
                        ];





                        //     {
                        //         field: "employee_name",
                        //         headerName: "Adı Soyadı",
                        //         flex: 1
                        //     },
                        //     {
                        //         field: "attendance_status",
                        //         headerName: "Katılım Durumu",
                        //         flex: 1,
                        //         renderCell: (params) => {
                        //             const rowId = params.id;
                        //             const attendanceStatus = rowForms[rowId]?.attendance_status || rowForms[params.row.row_id]?.attendance_status;
                        //             return (
                        //                 <Checkbox
                        //                     checked={attendanceStatus}
                        //                     onChange={(event) => handleCheckboxChange(rowId, event.target.checked)}
                        //                 />
                        //             );
                        //         }
                        //     },
                        //     {
                        //         field: "end_date",
                        //         headerName: "Katılım Tarihi",
                        //         flex: 1,
                        //         valueGetter: (params) => {
                        //             checked ? ((new Date(assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.end_date).toLocaleDateString('tr-TR')))
                        //                 : ((""))
                        //         }
                        //     },
                        //     {
                        //         field: "point",
                        //         headerName: "Puan",
                        //         flex: 1,
                        //         renderCell: (params) => {
                        //             const rowId = params.id;
                        //             const employeeId = params.row.row_id;
                        //             const point = rowForms[rowId]?.point || rowForms[employeeId]?.point;
                        //             return (
                        //                 <TextField
                        //                     disabled={!checked}
                        //                     type="number"
                        //                     value={point}
                        //                     variant="standard"
                        //                     onChange={(event) => handleTextFieldChange(rowId, 'point', Number(event.target.value))}
                        //                     inputProps={{ min: 0, max: 100 }}
                        //                 />
                        //             );
                        //         }
                        //     },
                        //     {
                        //         field: "educator_comment",
                        //         headerName: "Açıklama",
                        //         flex: 1,
                        //         renderCell: (params) => {
                        //             const rowId = params.id;
                        //             const comment = rowForms[rowId]?.educator_comment || rowForms[params.row.row_id]?.educator_comment;
                        //             return (
                        //                 <TextField
                        //                     value={comment}
                        //                     variant="standard"
                        //                     onChange={(event) => handleTextFieldChange(rowId, 'educator_comment', event.target.value)}
                        //                 />
                        //             );
                        //         }
                        //     }
                        // ];

                        const columnsForDialogContent: GridColDef[] = [
                            {
                                field: "employee_name",
                                headerName: "Adı Soyadı",
                                flex: 1
                            },
                            {
                                field: "attendance_status",
                                headerName: "Katılım Durumu",
                                flex: 1,
                                renderCell: (params) => {
                                    const rowId = params.id;
                                    const attendanceStatus = rowForms[rowId]?.attendance_status;
                                    const isChecked = checkedRows[rowId] || false;
                                    return (
                                        <Checkbox
                                            checked={attendanceStatus}
                                            onChange={(event) => handleCheckboxChange(rowId, event.target.checked)}
                                        />
                                    );
                                }
                            },
                            {
                                field: "end_date",
                                headerName: "Katılım Tarihi",
                                flex: 1,
                                valueGetter: (params) => {
                                    const isChecked = checkedRows[params.id] || false;
                                    return isChecked ?
                                        (new Date(assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.end_date).toLocaleDateString('tr-TR')) :
                                        ("");
                                }
                            },
                            {
                                field: "point",
                                headerName: "Puan",
                                flex: 1,
                                renderCell: (params) => {
                                    const rowId = params.id;
                                    const employeeId = params.row.row_id;
                                    const point = rowForms[rowId]?.point || rowForms[employeeId]?.point;
                                    const isChecked = checkedRows[rowId] || false;
                                    return (
                                        <TextField
                                            disabled={!isChecked}
                                            type="number"
                                            value={point}
                                            variant="standard"
                                            onChange={(event) => handleTextFieldChange(rowId, 'point', Number(event.target.value))}
                                            inputProps={{ min: 0, max: 100 }}
                                        />
                                    );
                                }
                            },
                            {
                                field: "educator_comment",
                                headerName: "Açıklama",
                                flex: 1,
                                renderCell: (params) => {
                                    const rowId = params.id;
                                    const comment = rowForms[rowId]?.educator_comment || rowForms[params.row.row_id]?.educator_comment;
                                    return (
                                        <TextField
                                            value={comment}
                                            variant="standard"
                                            onChange={(event) => handleTextFieldChange(rowId, 'educator_comment', event.target.value)}
                                        />
                                    );
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
                                            : rowsActive ? "Plansız Eğitimler" : "Pasif Plansız Eğitimler"
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
                                                fullWidth
                                                maxWidth="md"
                                            >
                                                <DialogTitle>{
                                                    assignedEducationList.find((item) => item.$id === selectedAssinedEducationId)?.education_name
                                                } - Eğitim Gerçekleştirme</DialogTitle>
                                                <DialogContent>
                                                    <div>
                                                        <div style={{ height: 300, width: '100%' }}>
                                                            <StyledDataGrid
                                                                rows={assignedEducationEmpList.filter((item) => item.main_assigned_education_id === selectedAssinedEducationId && item.employee_name.toLowerCase().includes(filterKey.toLowerCase()))}
                                                                columns={columnsForDialogContent}
                                                                getRowId={(row) => row.$id}
                                                                localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                                isCellEditable={() => false}
                                                                rowHeight={30}
                                                                columnHeaderHeight={30}
                                                                initialState={{
                                                                    pagination: {
                                                                        paginationModel: {
                                                                            pageSize: 10,
                                                                        },
                                                                    },
                                                                }}
                                                                pageSizeOptions={[10, 20, 30]}
                                                                onRowClick={(params) => initializeRowForm(params.row)} // Satır tıklandığında formu başlat

                                                            />
                                                        </div>
                                                    </div>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseDialog} color='error' variant='contained'>İptal</Button>
                                                    {assignedEducationResultList.find((item) => item.assigned_education_id === selectedAssinedEducationId) &&
                                                        <Button variant='contained' color='primary' onClick={handleUpdateDialog}>Düzenle</Button>}
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
                                                    <IconButton onClick={() => {
                                                        if (id) {
                                                            getEducationReportToExcel(educationList, competencyList, educationCompetencyRelationList, assignedEducationList.filter((item) => item.education_plan_id === id && item.is_active === rowsActive))
                                                        } else {
                                                            getEducationReportToExcel(educationList, competencyList, educationCompetencyRelationList, assignedEducationList)
                                                        }
                                                    }
                                                    }>
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
                                                            <Button size="small" fullWidth variant="outlined" onClick={() => navigate(`/app/education-plan/assign/${id}`)}>Yeni Eğitim Ata</Button>
                                                            :
                                                            <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education-plan/assign")}>Yeni Eğitim Ata</Button>
                                                    }
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education/list")}>Eğitimler</Button>
                                                    <Button size="small" fullWidth variant="outlined" onClick={() => navigate("/app/education-plan/plans")}>Eğitim Planları</Button>
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