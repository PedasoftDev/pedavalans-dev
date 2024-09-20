import { HStack, ReactView, Spinner, State, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, nanoid, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Container, LeftContainer, LeftContainerContent, LeftContainerContentItem, LeftContainerHeader, RightContainer, RightContainerHeader } from "../../CompetencyTargetDataEntry/Views/View";
import { Views } from "../../../components/Views";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Toast } from "../../../components/Toast";
import { Query, Services, useGetFileDownload, useGetMe, useListAccounts } from "@realmocean/sdk";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, MenuItem, Select, TextField, Tooltip } from "@mui/material";
import IPolyvalenceUnit from "../../../interfaces/IPolyvalenceUnit";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import { IoPersonCircleOutline } from "react-icons/io5";
import getYearPeriods from "../../../assets/Functions/getYearPeriods";
import getHalfYearPeriods from "../../../assets/Functions/getHalfYearPeriods";
import getQuarterYearPeriods from "../../../assets/Functions/getQuarterYearPeriods";
import getMonthPeriods from "../../../assets/Functions/getMonthPeriods";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import Competency from "../../../../server/hooks/competency/main";
import ICompetency from "../../../interfaces/ICompetency";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import EmployeeCompetencyValue from "../../../../server/hooks/EmployeeCompetencyValue/main";
import AppInfo from "../../../../AppInfo";
import { TbPencilPlus } from "react-icons/tb";
import Collections from "../../../../server/core/Collections";
import { Resources } from "../../../assets/Resources";
import IAccountRelation from "../../../interfaces/IAccountRelation";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Education from "../../../../server/hooks/education/main";
import IEducation from "../../../interfaces/IEducation";
import IAssignedEducation from "../../../interfaces/IAssignedEducation";
import AssignEducation from "../../../../server/hooks/assignEducation/main";
import CompetencyGrade from "../../../../server/hooks/competencyGrade/main";
import 'dayjs/locale/tr';
import dayjs from "dayjs";
import Trainers from "../../../../server/hooks/trainers/main";
import EducationCompetencyRelation from "../../../../server/hooks/educationCompetencyRelation/main";
import TrainerEducations from "../../../../server/hooks/trainerEducations/main";
import { useAppSelector, useAppDispatch } from "../../../hooks";
import { selectPendingEvaluation, setPendingEvaluationToNull } from "../../../features/pendingEvaluation";
import IAssignedEducationEmployees from "../../../interfaces/IAssignedEducationEmployees";
import AssignedEducationEmployees from "../../../../server/hooks/assignedEducationEmployees/main";
import EmailMessage from "../../../../server/hooks/emailMessage/main";
import OrganizationStructureWorkPlace from "../../../../server/hooks/organizationStructureWorkPlace/main";
import styled from "styled-components";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import BucketFiles from "../../../../server/hooks/bucketFiles/Main";
import EmployeeMultipleLines from "../../../../server/hooks/employeeMultipleLines/Main";
import CompetencyLineRelation from "../../../../server/hooks/competencyLineRelation/main";
import PolyvalenceUnitTableLineRelation from "../../../../server/hooks/polyvalenceUnitTableLineRelation/main";

const resetUnitTable: IPolyvalenceUnit.IPolyvalenceUnit = {
    is_active_table: true,
    polyvalence_department_id: "",
    polyvalence_table_id: "",
    polyvalence_table_name: "",
    is_deleted_table: false,
    polyvalence_department_name: "",
    polyvalence_evaluation_frequency: "",
    realm_id: "",
    tenant_id: ""
}

const resetForm: IAssignedEducation.ICreate = {
    education_code: "",
    employee_id: "",
    educator_id: "",
    start_date: "",
    end_date: "",
    tenant_id: "",
    education_id: "",
    education_name: "",
    location: "",
    hour: "0:00",
    start_hour: "0:00",
    educator_name: "",
    employee_name: "",
    status: "open",
};

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

export class CompetencyRealDataEntryViewController extends UIController {

    @State()
    private polyvalenceUnitList: IPolyvalenceUnit.IPolyvalenceUnit[] = [];

    protected BindRouterParams(): void {
        Services.Accounts.get().then((me) => {
            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.limit(10000), Query.equal("name", Resources.ParameterLocalStr.polyvalence_unit_table_auth), Query.equal("tenant_id", me?.prefs?.organization)]).then((parameter) => {
                if (parameter && parameter.documents[0] && parameter.documents[0]?.is_active) {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, [Query.limit(10000), Query.equal("account_id", me.$id)]).then((accountRelation: any) => {

                        const accountRelationData: IAccountRelation.IBase = accountRelation.documents[0];
                        if (accountRelationData.is_admin || accountRelationData.authorization_profile === "admin") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                this.polyvalenceUnitList = unitTables.documents as any
                            })
                        } else if (accountRelationData.authorization_profile === "responsible") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible, [Query.limit(10000), Query.equal("responsible_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                const responsibleTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                    this.polyvalenceUnitList = unitTables.documents.filter((x) => responsibleTableIds.includes(x.polyvalence_table_id)) as any
                                })
                            })
                        }
                        else if (accountRelationData.authorization_profile === "viewer") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer, [Query.limit(10000), Query.equal("viewer_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                const viewerTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                    this.polyvalenceUnitList = unitTables.documents.filter((x) => viewerTableIds.includes(x.polyvalence_table_id)) as any
                                })
                            })
                        }
                    })
                } else {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
                        this.polyvalenceUnitList = unitTables.documents as any
                    })
                }
            })
        })
    }

    public LoadView(): UIView {

        const [selectedTable, setSelectedTable] = useState<IPolyvalenceUnit.IPolyvalenceUnit>(resetUnitTable);
        const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
        const [selectedPeriod, setSelectedPeriod] = useState<string>("");

        const dispatch = useAppDispatch();
        const selector = useAppSelector;
        const setAssignEducationNull = () => dispatch(setPendingEvaluationToNull());

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);
        const { levels, isLoadingLevels } = CompetencyGrade.GetGradeLevelList();
        const { competencyDepartments } = CompetencyDepartment.GetByDepartmentId(selectedTable.polyvalence_department_id);
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { createEmployeeCompetencyValue } = EmployeeCompetencyValue.Create();
        const { updateEmployeeCompetencyValue } = EmployeeCompetencyValue.Update();

        const { educationList, isLoading: isLoadingEducation } = Education.GetList();
        const { accounts, isLoading: isLoadingAccounts } = useListAccounts();
        const { createAssignedEducation } = AssignEducation.Create();
        const { createAssignedEducationEmp } = AssignedEducationEmployees.Create();

        const { createEmailRequest } = EmailMessage.Create();


        const { educationCompetencyRelationList, isLoading: isLoadingCompetencyRelations } = EducationCompetencyRelation.GetList(me?.prefs?.organization);
        const { trainersList, isLoadingTrainersList } = Trainers.GetList();
        const { trainerEducationsList, isLoadingTrainerEducationsList } = TrainerEducations.GetList()
        const { employeeMultipleLinesList, isLoading: isLoadingEmployeeMultipleLine } = EmployeeMultipleLines.GetList()
        const { competencyLineRelationList, isLoading: isLoadingCompetencyLineRelation } = CompetencyLineRelation.GetList();
        const { lineRelation, isLoading: isLoadingLineRelation } = PolyvalenceUnitTableLineRelation.GetByPolyvalenceUnitId(selectedTable.polyvalence_table_id, me?.prefs?.organization);

        // workplace 
        const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
        const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
        const [selectedWorkPlaceId, setSelectedWorkPlaceId] = useState<string>("");
        //
        const [lineBasedCompetencyRelationship, setLineBasedCompetencyRelationship] = useState<boolean>(false);

        return (
            isLoading || this.polyvalenceUnitList == null || isLoadingPeriods || isLoadingLineRelation || isLoadingEmployeeMultipleLine || isLoadingCompetencyLineRelation || isLoadingCompetencyRelations || isLoadingTrainerEducationsList || isLoadingEmployees
                || isLoadingGroups || isLoadingLevels || isLoadingCompetencyList || isLoadingTrainersList || isLoadingEducation || isLoadingAccounts
                ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {
                        const { createFilePage } = BucketFiles.Create(AppInfo.Name, "competency_real_data_entry_bucket");
                        const [filesNames, setFilesNames] = useState([]);
                        const [selectedEmployeeCompetencyId, setSelectedEmployeeCompetencyId] = useState<string>("");
                        const { fileDownload } = useGetFileDownload(AppInfo.Name, "competency_real_data_entry_bucket", selectedEmployeeCompetencyId);
                        /* GLOBAL STATE ASSIGN EDUCATION */
                        const pendingEvaluation: { polyvalence_table_id: string; evaluation_period: string; } = selector(selectPendingEvaluation);

                        const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                        const [selectedGroupId, setSelectedGroupId] = useState<string>("");
                        const [selectedCompetencyList, setSelectedCompetencyList] = useState<ICompetency.ICompetency[]>([]);
                        const [employeeCompetencyValue, setEmployeeCompetencyValue] = useState<IEmployeeCompetencyValue.IEmployeeCompetencyValue[]>([]);

                        // MUI Dialog
                        const [openDialog, setOpenDialog] = useState(false);
                        const [description, setDescription] = useState("");
                        const [selectedCompetencyId, setSelectedCompetencyId] = useState("");


                        // dialog for education
                        const [form, setForm] = useState(resetForm);

                        const [selectedEmployees, setSelectedEmployees] = useState<typeof employees>([]);
                        const [openEducationDialog, setOpenEducationDialog] = useState(false);

                        const [competencyEducationRelationship, setCompetencyEducationRelationship] = useState<boolean>(false);

                        const handleCloseEducationDialog = () => {
                            setOpenEducationDialog(false);
                            setForm(resetForm);
                            setSelectedEmployees([]);
                        }

                        const handleOpenEducationDialog = (employee_id: string) => {
                            const selectedEmployee = employees.find((employee) => employee.$id === employee_id);
                            if (selectedEmployee) {
                                setSelectedEmployees([selectedEmployee]);
                                setOpenEducationDialog(true);
                            }
                        }
                        // const handleSubmitEducationDialog = (e) => {
                        //     e.preventDefault();

                        //     selectedEmployees.forEach((employee, _i) => {
                        //         const createForm: IAssignedEducation.ICreate = {
                        //             education_code: form.education_code,
                        //             employee_id: employee.$id,
                        //             education_id: form.education_id,
                        //             education_name: form.education_name,
                        //             educator_id: form.educator_id,
                        //             educator_name: form.educator_name,
                        //             employee_name: `${employee.first_name} ${employee.last_name}`,
                        //             hour: form.hour,
                        //             start_hour: form.start_hour,
                        //             start_date: form.start_date,
                        //             end_date: form.end_date,
                        //             location: form.location,
                        //             status: "open",
                        //             tenant_id: me?.prefs?.organization
                        //         }
                        //         createAssignedEducation({
                        //             data: createForm
                        //         }, () => {
                        //             if (_i === selectedEmployees.length - 1) {
                        //                 Toast.fire({
                        //                     icon: "success",
                        //                     title: "Eğitim atamaları başarıyla yapıldı.",
                        //                     timer: 1000
                        //                 })
                        //                 handleCloseEducationDialog();
                        //             }
                        //         })
                        //     })
                        // }
                        const handleSubmitEducationDialog = (e) => {
                            e.preventDefault();
                            const assignedEducationId = nanoid();
                            createAssignedEducation({
                                documentId: assignedEducationId,
                                data: {
                                    id: assignedEducationId,
                                    education_code: form.education_code,
                                    education_id: form.education_id,
                                    education_name: form.education_name,
                                    educator_id: form.educator_id,
                                    educator_name: form.educator_name,
                                    hour: form.hour,
                                    start_hour: form.start_hour,
                                    start_date: form.start_date,
                                    end_date: form.end_date,
                                    location: form.location,
                                    status: "open",
                                    tenant_id: me?.prefs?.organization
                                }
                            }, () => {
                                selectedEmployees.forEach((employee, i) => {
                                    const createForm: IAssignedEducationEmployees.ICreate = {
                                        main_assigned_education_id: assignedEducationId,
                                        employee_id: employee.$id,
                                        employee_name: `${employee.first_name} ${employee.last_name}`,
                                        tenant_id: me?.prefs?.organization
                                    }
                                    createAssignedEducationEmp({
                                        data: createForm
                                    }, () => {
                                        const emailValues = {
                                            educatorName: form.educator_name,
                                            code: form.education_code,
                                            name: form.education_name,
                                            hour: form.hour,
                                            startDate: new Date(form.start_date).toLocaleDateString("tr-TR"),
                                            endDate: new Date(form.end_date).toLocaleDateString("tr-TR"),
                                            location: form.location,
                                            employeeName: `${employee.first_name} ${employee.last_name}`
                                        }
                                        createEmailRequest({
                                            data: {
                                                sender: me?.email,
                                                recipient: accounts.find(x => x.$id === form.educator_id)?.email,
                                                subject: "education",
                                                content: JSON.stringify(emailValues),
                                                status: "pending",
                                                errorReason: "",
                                                attemptCount: 0
                                            }
                                        })
                                        if (i === selectedEmployees.length - 1) {
                                            Toast.fire({
                                                icon: "success",
                                                title: "Eğitim atamaları başarıyla yapıldı.",
                                                timer: 1000
                                            })
                                            handleCloseEducationDialog();
                                        }
                                    })
                                });
                            })
                        }




                        const handleClickOpenDialog = (description: string, competency_id: string) => {
                            Services.Storage.listFiles("competency_real_data_entry_bucket").then((res) => {
                                setFilesNames(res.files)
                            })
                            const alreadyExist = employeeCompetencyValue.find((value) => value.competency_id === competency_id);
                            if (alreadyExist && alreadyExist?.competency_real_value) {
                                setDescription(description);
                                setSelectedCompetencyId(competency_id)
                                setOpenDialog(true);
                                setSelectedEmployeeCompetencyId(alreadyExist?.employee_competency_value_id);
                            } else {
                                Toast.fire({
                                    icon: "warning",
                                    text: "Bu yetkinlik için bir gerçekleşme değeri girilmemiştir.",
                                    titleText: "Lütfen önce değer giriniz."
                                })
                                return;
                            }
                        };

                        const handleCloseDialog = () => {
                            setOpenDialog(false);
                            setDescription("");
                            setSelectedCompetencyId("");
                        };

                        const onChangeTable = (polyvalence_table_id: string) => {
                            const table = this.polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === polyvalence_table_id);
                            const periodYear = Number(periods[0].evaluation_period_year);
                            setSelectedTable(table)
                            setSelectedPeriod("")
                            setSelectedEmployeeId("")
                            setSelectedGroupId("")
                            setSelectedCompetencyList([])
                            setEmployeeCompetencyValue([])
                            if (table.polyvalence_evaluation_frequency == "Yıl") {
                                setDataYear(getYearPeriods(periodYear))
                            }
                            else if (table.polyvalence_evaluation_frequency == "Yarıyıl") {
                                setDataYear(getHalfYearPeriods(periodYear))
                            }
                            else if (table.polyvalence_evaluation_frequency == "Çeyrekyıl") {
                                setDataYear(getQuarterYearPeriods(periodYear))
                            }
                            else if (table.polyvalence_evaluation_frequency == "Ay") {
                                setDataYear(getMonthPeriods(periodYear))
                            }
                        }

                        const selectEmployee = (id: string) => {
                            if (selectedEmployeeId === id) {
                                setSelectedEmployeeId("");
                            } else {
                                setSelectedEmployeeId(id);
                                getCompetencies(id);
                            }
                            Services.Databases.listDocuments(
                                AppInfo.Name,
                                AppInfo.Database,
                                Collections.AssignedEducationResult,
                                [
                                    Query.limit(10000),
                                    Query.equal("employee_id", id),
                                ]
                            ).then((res) => {
                                const educationId = res.documents.find((x) => x.employee_id === id)?.education_id;
                                const selectedEmployeePoint = res.documents.find((x) => x.employee_id === id)?.point;
                                Services.Databases.listDocuments(
                                    AppInfo.Name,
                                    AppInfo.Database,
                                    Collections.EducationCompetencyStatusInfos,
                                    [
                                        Query.limit(10000),
                                        Query.equal("education_id", educationId),
                                    ]
                                ).then((res) => {
                                    const matchedDocument = res.documents.find((x) =>
                                        x.education_id === educationId &&
                                        selectedEmployeePoint >= x.lower_bound &&
                                        selectedEmployeePoint <= x.upper_bound
                                    );

                                    if (matchedDocument) {
                                        const competencyId = matchedDocument.competency_id;
                                        const matchedCompetencyLevel = matchedDocument.competency_level;
                                        const matchedCompetencyLevelId = matchedDocument.competency_level_id;
                                        Services.Databases.listDocuments(
                                            AppInfo.Name,
                                            AppInfo.Database,
                                            Collections.CompetencyGradeLevel,
                                            [
                                                Query.limit(10000),
                                                Query.equal("grade_level_id", matchedCompetencyLevelId)
                                            ]
                                        ).then((res) => {
                                            const matchedCompetencyGradeLevelNumber = res.documents[0].grade_level_number;
                                            console.log(`Point ${selectedEmployeePoint} is within range ${matchedDocument.lower_bound}-${matchedDocument.upper_bound} for competency ID: ${competencyId} and competency level: ${matchedCompetencyLevel} and competency level id ${matchedCompetencyLevelId} and competency grade level number ${matchedCompetencyGradeLevelNumber}`);

                                        })
                                        // Burada competency_level ile ilgili daha fazla işlem yapabilirsiniz.
                                    } else {
                                        console.log('No matching competency found for the given point.');
                                    }
                                })
                            })



                        }

                        const handleSubmitDialog = (e) => {
                            e.preventDefault();

                            if (description === "") {
                                Toast.fire({
                                    icon: "warning",
                                    title: "Açıklama boş bırakılamaz."
                                })
                                return;
                            }
                            const alreadyExist = employeeCompetencyValue.find((value) => value.competency_id === selectedCompetencyId);
                            updateEmployeeCompetencyValue({
                                databaseId: AppInfo.Database,
                                collectionId: "employee_competency_value",
                                documentId: alreadyExist?.employee_competency_value_id,
                                data: {
                                    ...removeDollarProperties(alreadyExist),
                                    competency_value_desc: description,
                                }
                            }, () => {
                                Toast.fire({
                                    icon: "success",
                                    title: "Açıklama güncellendi.",
                                    timer: 1000
                                })
                                setSelectedCompetencyList(selectedCompetencyList.map((competency) => {
                                    if (competency.competency_id === selectedCompetencyId) {
                                        return {
                                            ...competency,
                                            competency_value_desc: description,
                                        }
                                    }
                                    return competency;
                                }));
                                setEmployeeCompetencyValue(employeeCompetencyValue.map((value) => {
                                    if (value.competency_id === selectedCompetencyId) {
                                        return {
                                            ...value,
                                            competency_value_desc: description,
                                        }
                                    }
                                    return value;
                                }));
                            })
                            createFilePage({
                                bucketId: "competency_real_data_entry_bucket",
                                fileId: alreadyExist?.employee_competency_value_id,
                                file: file,
                                onProgress: (progress) => {
                                    console.log('Yükleme durumu:', progress);
                                    return {};
                                },
                            })

                            handleCloseDialog();
                        }

                        const columns: GridColDef[] = [
                            {
                                field: "competency_name", headerName: "Yetkinlik Adı", flex: 1,
                                renderCell: (params) =>
                                    <Tooltip title={params.row.competency_description}>
                                        {params.value}
                                    </Tooltip>
                            },
                            {
                                field: "competency_target_value", headerName: "Hedef Değer", align: "center", width: 100, minWidth: 100,
                                valueGetter: (params) => {
                                    return params.row.competency_target_value === "no-target" ? "Hedefi Yok" : params.row.competency_target_value
                                }
                            },
                            {
                                field: "competency_real_value", headerName: "Gerçekleşme Değeri", width: 150, minWidth: 150,
                                renderCell: (params) => (
                                    <FormControl fullWidth size="small">
                                        {params.row.competency_target_value != "no-target" &&
                                            <Select
                                                name="competency_real_value"
                                                value={params.value}
                                                onChange={(e) => {
                                                    const alreadyExist = employeeCompetencyValue.find((value) => value.competency_id === params.row.competency_id);
                                                    if (alreadyExist) {
                                                        updateEmployeeCompetencyValue({
                                                            databaseId: AppInfo.Database,
                                                            collectionId: "employee_competency_value",
                                                            documentId: alreadyExist?.employee_competency_value_id,
                                                            data: {
                                                                ...removeDollarProperties(alreadyExist),
                                                                competency_real_value: e.target.value,
                                                            }
                                                        }, () => {
                                                            Toast.fire({
                                                                icon: "success",
                                                                title: "Değer güncellendi.",
                                                                timer: 1000
                                                            })
                                                            setEmployeeCompetencyValue(employeeCompetencyValue.map((value) => {
                                                                if (value.competency_id === params.row.competency_id) {
                                                                    return {
                                                                        ...value,
                                                                        competency_real_value: e.target.value,
                                                                    }
                                                                }
                                                                return value;
                                                            }));
                                                        })
                                                    } else {
                                                        const docId: string = nanoid();
                                                        const createObj: IEmployeeCompetencyValue.IEmployeeCompetencyValue = {
                                                            employee_competency_value_id: docId,
                                                            competency_department_id: selectedTable.polyvalence_department_id,
                                                            competency_department_name: selectedTable.polyvalence_department_name,
                                                            competency_evaluation_period: selectedPeriod,
                                                            competency_id: params.row.competency_id,
                                                            competency_name: params.row.competency_name,
                                                            competency_target_value: "",
                                                            competency_real_value: e.target.value,
                                                            competency_value_desc: "",
                                                            employee_id: selectedEmployeeId,
                                                            employee_name: employees.find((employee) => employee.$id === selectedEmployeeId)?.first_name
                                                                + " " + employees.find((employee) => employee.$id === selectedEmployeeId)?.last_name,
                                                            polyvalence_table_id: selectedTable.polyvalence_table_id,
                                                            polyvalence_table_name: selectedTable.polyvalence_table_name,
                                                            tenant_id: me?.prefs?.organization,
                                                            realm_id: me?.prefs?.organization,
                                                            is_deleted_competency_value: false,
                                                            is_active_competency_value: true
                                                        }
                                                        createEmployeeCompetencyValue({
                                                            documentId: docId,
                                                            data: createObj
                                                        }, () => {
                                                            Toast.fire({
                                                                icon: "success",
                                                                title: "Değer eklendi.",
                                                                timer: 1000
                                                            })
                                                            setEmployeeCompetencyValue([...employeeCompetencyValue, createObj]);
                                                        })
                                                    }
                                                    setSelectedCompetencyList(selectedCompetencyList.map((competency) => {
                                                        if (competency.competency_id === params.row.competency_id) {
                                                            return {
                                                                ...competency,
                                                                competency_real_value: e.target.value,
                                                            }
                                                        }
                                                        return competency;
                                                    }));
                                                }}
                                                size="small"
                                                required
                                            >
                                                {levels.filter(x => x.grade_id === groups.find(x => x.competency_group_id === params.row.competency_group_id).competency_grade_id)
                                                    .sort((a: any, b: any) => a.grade_level_number - b.grade_level_number)
                                                    .map((value) => (
                                                        <MenuItem value={value.grade_level_number} key={value.grade_level_id}>{value.grade_level_number}</MenuItem>
                                                    ))}
                                            </Select>
                                        }
                                    </FormControl >

                                )
                            },
                            {
                                field: "competency_value_desc", headerName: "Aksiyonlar", width: 100, minWidth: 100,
                                renderCell: (params) => (
                                    <div style={{ display: "flex", gap: "5px" }}>
                                        <IconButton color="primary" onClick={() => {
                                            handleClickOpenDialog(params.row.competency_value_desc, params.row.competency_id)
                                        }}>
                                            <TbPencilPlus title="Açıklama Ekle" />
                                        </IconButton>
                                        <IconButton color="primary" onClick={() => {
                                            handleOpenEducationDialog(params.row.employee_id)
                                            setSelectedCompetencyId(params.row.competency_id)
                                        }}>
                                            <MdOutlineLibraryBooks title="Eğitim Planla" />
                                        </IconButton>
                                    </div>
                                )
                            }
                        ];

                        const getCompetencies = async (employee_id: string) => {
                            const selectedEmployeeInfo = employees.find((employee) => employee.$id === employee_id);
                            const appendToSelectedCompetencyList = [];
                            await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, "employee_competency_value",
                                [
                                    Query.limit(10000), Query.equal("employee_id", employee_id), Query.equal("competency_evaluation_period", selectedPeriod),
                                    Query.equal("polyvalence_table_id", selectedTable.polyvalence_table_id), Query.equal("is_deleted_competency_value", false),
                                    Query.equal("tenant_id", me?.prefs?.organization)
                                ]).then((res) => {
                                    setEmployeeCompetencyValue(res.documents as any[]);
                                    competencyList.filter(x => x.is_active_competency).forEach((competency) => {
                                        competencyDepartments.forEach((department) => {
                                            if (competency.competency_id === department.competency_id) {
                                                const listItem = removeDollarProperties(competency);
                                                const competencyData: IEmployeeCompetencyValue.IEmployeeCompetencyValue = res.documents.find((value) => value.competency_id === listItem.competency_id) as any;
                                                appendToSelectedCompetencyList.push({
                                                    ...listItem,
                                                    employee_id: employee_id,
                                                    employee_name: `${selectedEmployeeInfo?.first_name} ${selectedEmployeeInfo?.last_name}`,
                                                    polyvalence_table_id: selectedTable.polyvalence_table_id,
                                                    polyvalence_table_name: selectedTable.polyvalence_table_name,
                                                    competency_evaluation_period: selectedPeriod,
                                                    competency_department_id: department.competency_department_id,
                                                    competency_department_name: department.competency_department_name,
                                                    competency_target_value: competencyData ? competencyData?.competency_target_value : "",
                                                    competency_real_value: competencyData ? competencyData?.competency_real_value : "",
                                                    competency_value_desc: competencyData ? competencyData?.competency_value_desc : "",
                                                })
                                            }
                                        })
                                    })
                                })
                            setSelectedCompetencyList(appendToSelectedCompetencyList);
                        }


                        useEffect(() => {
                            if (!me) {
                                Toast.fire({
                                    icon: "warning",
                                    title: "Kişi bilgileri alınamadı."
                                })
                                navigate("/login")
                            }
                            if (!periods[0]) {
                                Toast.fire({
                                    icon: "warning",
                                    title: "Henüz bir yetkinlik değerlendirme dönemi tanımlanmamış."
                                })
                                navigate("/app/competency-evaluation-period/list")
                            }
                            if (pendingEvaluation) {
                                onChangeTable(pendingEvaluation.polyvalence_table_id);
                                setSelectedPeriod(pendingEvaluation.evaluation_period);
                                setSelectedEmployeeId("")
                                setSelectedGroupId("")
                                setSelectedCompetencyList([])
                                setEmployeeCompetencyValue([])
                                setAssignEducationNull();
                            }
                            Services.Databases.listDocuments(
                                AppInfo.Name,
                                AppInfo.Database,
                                Collections.Parameter,
                                [
                                    Query.equal("name", "competency_education_relationship"),
                                    Query.limit(10000),
                                ]
                            ).then((res) => {
                                setCompetencyEducationRelationship(res.documents[0]?.is_active)
                            }).then(() => {
                                Services.Databases.listDocuments(
                                    AppInfo.Name,
                                    AppInfo.Database,
                                    Collections.Parameter,
                                    [
                                        Query.equal("name", "work_place_definition"),
                                        Query.limit(10000)
                                    ]
                                ).then((res) => {
                                    setWorkPlaceDefination(res.documents[0]?.is_active)
                                })
                            }).then(() => {
                                Services.Databases.listDocuments(
                                    AppInfo.Name,
                                    AppInfo.Database,
                                    Collections.Parameter,
                                    [
                                        Query.equal("name", "line_based_competency_relationship"),
                                        Query.limit(10000)
                                    ]
                                ).then((res) => {
                                    setLineBasedCompetencyRelationship(res.documents[0]?.is_active)
                                })
                            })
                        }, [])

                        //attechment
                        const [file, setFile] = useState(null);

                        const handleFileChange = (event) => {
                            const uploadedFile = event.target.files[0];
                            setFile(uploadedFile);
                            console.log('Dosya yüklendi:', uploadedFile);
                        };

                        return (
                            VStack(
                                HStack({ alignment: cLeading })(
                                    Views.Title("Yetkinlik Değerlendirme Girişi").paddingTop("10px")
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                ReactView(
                                    <Container>
                                        <LeftContainer>
                                            <LeftContainerHeader>
                                                {
                                                    workPlaceDefination ? (<Autocomplete
                                                        options={workPlaces.filter((x) => x.is_active)}
                                                        onChange={(event, newValue) => {
                                                            setSelectedWorkPlaceId(newValue?.$id || "")
                                                        }}
                                                        getOptionLabel={(option) => option.name}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="İşyeri"
                                                                name="work_place_id"
                                                                size="small"
                                                                required
                                                            />
                                                        )}
                                                        fullWidth
                                                    />) : null
                                                }
                                                <Autocomplete
                                                    options={
                                                        workPlaceDefination ? this.polyvalenceUnitList.filter((item) => item.work_place_id === selectedWorkPlaceId)
                                                            : this.polyvalenceUnitList
                                                    }
                                                    value={selectedTable}
                                                    onChange={(event, newValue) => {
                                                        onChangeTable(newValue.polyvalence_table_id);
                                                    }}
                                                    getOptionLabel={(option) => option.polyvalence_table_name}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Polivalans Tablosu"
                                                            name="polyvalence_table_id"
                                                            size="small"
                                                            required
                                                        />
                                                    )}
                                                    fullWidth
                                                    disableClearable
                                                />
                                                <Autocomplete
                                                    options={dataYear}
                                                    value={dataYear.find((year) => year.name === selectedPeriod)}
                                                    onChange={(event, newValue) => {
                                                        setSelectedPeriod(newValue?.name || "");
                                                        setSelectedEmployeeId("");
                                                        setSelectedGroupId("");
                                                        setSelectedCompetencyList([]);
                                                        setEmployeeCompetencyValue([]);
                                                    }}
                                                    getOptionLabel={(option) => option.name}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            label="Değerlendirme Dönemi"
                                                            name="evaluation_period"
                                                            size="small"
                                                            required
                                                        />
                                                    )}
                                                    fullWidth
                                                />
                                            </LeftContainerHeader>
                                            {
                                                selectedTable && selectedPeriod &&
                                                <LeftContainerContent>
                                                    {
                                                        lineBasedCompetencyRelationship ?
                                                            (
                                                                employeeMultipleLinesList
                                                                    .filter((item) => item.line_id === lineRelation[0].line_id)
                                                                    .filter((item) => employees.some((x) => x.$id === item.employee_id))
                                                                    .map((employeeItem, i) => {
                                                                        const employee = employees.find((x) => x.$id === employeeItem.employee_id);
                                                                        console.log('EmployeeItem:', employeeItem);
                                                                        console.log('Found Employee:', employee);

                                                                        if (!employee) return null;

                                                                        return (
                                                                            <LeftContainerContentItem
                                                                                key={employeeItem.employee_id}
                                                                                selected={selectedEmployeeId === employeeItem.employee_id}
                                                                                onClick={() => selectEmployee(employeeItem.employee_id)}
                                                                            >
                                                                                <IoPersonCircleOutline
                                                                                    size={25}
                                                                                    {...(selectedEmployeeId === employeeItem.employee_id && { color: "#3BA2EE" })}
                                                                                />
                                                                                {employee.first_name} {employee.last_name}
                                                                            </LeftContainerContentItem>
                                                                        );
                                                                    })
                                                            )
                                                            :
                                                            (employees
                                                                .filter((employee) => employee.department_id === selectedTable.polyvalence_department_id)
                                                                .filter((employee) => employee.is_active)
                                                                .sort((a, b) => a.first_name.localeCompare(b.first_name))
                                                                .map((employee, i) =>
                                                                    <LeftContainerContentItem key={employee.id} selected={selectedEmployeeId === employee.$id} onClick={() => selectEmployee(employee.$id)}>
                                                                        <IoPersonCircleOutline size={25} {...(selectedEmployeeId === employee.$id && { color: "#3BA2EE" })} />
                                                                        {employee.first_name} {employee.last_name}
                                                                    </LeftContainerContentItem>
                                                                ))
                                                    }
                                                </LeftContainerContent>
                                            }
                                        </LeftContainer>
                                        {
                                            selectedTable && selectedPeriod && selectedEmployeeId &&
                                            <RightContainer>
                                                <RightContainerHeader>
                                                    <Autocomplete
                                                        options={groups}
                                                        value={groups.find(group => group.competency_group_id === selectedGroupId) || null}
                                                        onChange={(event, newValue) => {
                                                            setSelectedGroupId(newValue?.competency_group_id || "");
                                                        }}
                                                        getOptionLabel={(option) => option.competency_group_name}
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Yetkinlik Grubu"
                                                                name="group"
                                                                size="small"
                                                                required
                                                            />
                                                        )}
                                                        fullWidth
                                                    />
                                                </RightContainerHeader>
                                                <div style={{
                                                    height: "calc(100vh - 160px)",
                                                    width: "100%",
                                                    padding: "0 20px"
                                                }}>
                                                    <StyledDataGrid
                                                        columns={columns}
                                                        rows={
                                                            lineBasedCompetencyRelationship ?
                                                                (
                                                                    competencyLineRelationList
                                                                        .filter((item) => item.line_id === lineRelation[0].line_id)
                                                                        .filter((item) => selectedCompetencyList.some((x) => x.competency_id === item.competency_id))
                                                                        .map((relation) => selectedCompetencyList.find((x) => x.competency_id === relation.competency_id))
                                                                )
                                                                : (selectedCompetencyList.filter((competency) => selectedGroupId === "" ? true : competency.competency_group_id === selectedGroupId))}
                                                        getRowId={(row) => row.competency_id}
                                                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                    />
                                                </div>
                                            </RightContainer>
                                        }
                                        <Dialog
                                            open={openDialog}
                                            onClose={handleCloseDialog}>
                                            <form onSubmit={handleSubmitDialog} style={{ width: "400px" }}>
                                                <DialogTitle>Açıklama Giriniz</DialogTitle>
                                                <DialogContent>
                                                    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                                                        <TextField
                                                            rows={4}
                                                            multiline
                                                            fullWidth
                                                            variant="outlined"
                                                            required
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                        />
                                                        <Button
                                                            component="label"
                                                            role={undefined}
                                                            variant="contained"
                                                            tabIndex={-1}
                                                            startIcon={<CloudUploadIcon />}
                                                            size="small"
                                                        >
                                                            Dosya Yükle
                                                            <VisuallyHiddenInput
                                                                type="file"
                                                                onChange={handleFileChange}
                                                                multiple
                                                            />
                                                        </Button>
                                                        {file && <p>Yüklenen Dosya: {file.name}</p>}
                                                        {
                                                            filesNames.filter((item) => item.$id === selectedEmployeeCompetencyId).map((item) => {
                                                                return <p>Yüklü Dosya : <a href={fileDownload as any} style={{ fontSize: "12px", color: "blue", cursor: "pointer" }}>{item.name}</a></p>
                                                            })
                                                        }
                                                    </div>

                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={handleCloseDialog}>İptal</Button>
                                                    <Button type="submit">Açıklamayı Kaydet</Button>
                                                </DialogActions>
                                            </form>
                                        </Dialog>

                                        <Dialog
                                            open={openEducationDialog}
                                            onClose={handleCloseEducationDialog}>
                                            <DialogTitle>Eğitim Atama</DialogTitle>
                                            <DialogContent>
                                                <form
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        gap: "10px",
                                                        padding: "10px",
                                                    }}
                                                    onSubmit={handleSubmitEducationDialog}
                                                >
                                                    {
                                                        competencyEducationRelationship ? (
                                                            <Autocomplete
                                                                options={
                                                                    educationCompetencyRelationList.filter((item) => item.competency_id === selectedCompetencyId).map((item) => educationList.find((education) => education.$id === item.education_id)).filter((item) => item.is_active === true && item.is_deleted === false)
                                                                }
                                                                value={
                                                                    educationList.find((education) => education.$id === form.education_id) || null
                                                                }
                                                                onChange={(event, newValue) => {
                                                                    setForm({
                                                                        ...form,
                                                                        education_id: newValue?.$id || "",
                                                                        education_name: newValue?.name || "",
                                                                        education_code: newValue?.code || ""
                                                                    });
                                                                }}
                                                                getOptionLabel={(option) => option.name}
                                                                renderInput={(params) => (
                                                                    <TextField
                                                                        {...params}
                                                                        label="Eğitim"
                                                                        name="education_id"
                                                                        size="small"
                                                                        required
                                                                    />
                                                                )}
                                                            />
                                                        )
                                                            :
                                                            (
                                                                <Autocomplete
                                                                    options={educationList.filter((item) => item.is_active === true && item.is_deleted === false)}
                                                                    value={educationList.find((education) => education.$id === form.education_id) || null}
                                                                    onChange={(event, newValue) => {
                                                                        setForm({
                                                                            ...form,
                                                                            education_id: newValue?.$id || "",
                                                                            education_name: newValue?.name || "",
                                                                            education_code: newValue?.code || ""
                                                                        });
                                                                    }}
                                                                    getOptionLabel={(option) => option.name}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="Eğitim"
                                                                            name="education_id"
                                                                            size="small"
                                                                            required
                                                                        />
                                                                    )}
                                                                />
                                                            )
                                                    }

                                                    <Autocomplete
                                                        multiple
                                                        disableCloseOnSelect
                                                        options={employees}
                                                        getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
                                                        filterSelectedOptions
                                                        defaultValue={selectedEmployees}
                                                        size="small"
                                                        renderInput={(params) => (
                                                            <TextField
                                                                {...params}
                                                                label="Eğitim Alacak Personel"
                                                                size="small"
                                                            />
                                                        )}
                                                        onChange={(event, newValue) => {
                                                            setSelectedEmployees(newValue);
                                                        }}
                                                    />
                                                    {
                                                        competencyEducationRelationship ?
                                                            (
                                                                <Autocomplete
                                                                    options={
                                                                        trainerEducationsList.filter((item) => item.trainer_duty_id === form.education_id).map((item) => trainersList.find((trainer) => trainer.id === item.trainer_id))
                                                                    }
                                                                    value={
                                                                        trainersList.find((trainer) => trainer.trainer_id === form.educator_id) || null
                                                                    }
                                                                    onChange={(event, newValue) => {
                                                                        setForm({
                                                                            ...form,
                                                                            educator_id: newValue?.trainer_id || "",
                                                                            educator_name: newValue?.trainer_name || ""
                                                                        });
                                                                    }}
                                                                    getOptionLabel={
                                                                        (option) => option?.trainer_name
                                                                    }
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="Eğitimci"
                                                                            name="educator_id"
                                                                            size="small"
                                                                            required
                                                                        />
                                                                    )}
                                                                />
                                                            ) :
                                                            (

                                                                <Autocomplete
                                                                    options={trainersList}
                                                                    value={trainersList.find((trainer) => trainer.trainer_id === form.educator_id) || null}
                                                                    onChange={(event, newValue) => {
                                                                        setForm({
                                                                            ...form,
                                                                            educator_id: newValue?.trainer_id || "",
                                                                            educator_name: newValue?.trainer_name || ""
                                                                        });
                                                                    }}
                                                                    getOptionLabel={(option) => option.trainer_name}
                                                                    renderInput={(params) => (
                                                                        <TextField
                                                                            {...params}
                                                                            label="Eğitimci"
                                                                            name="educator_id"
                                                                            size="small"
                                                                            required
                                                                        />
                                                                    )}
                                                                />
                                                            )
                                                    }
                                                    <div style={{
                                                        display: "flex",
                                                        gap: "10px",
                                                    }}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker label="Eğitim Başlangıç Tarihi"
                                                                format="DD/MM/YYYY"
                                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                                value={dayjs(form.start_date)}
                                                                onChange={(e: any) => {
                                                                    setForm({
                                                                        ...form,
                                                                        start_date: e.$d,
                                                                        end_date: e.$d
                                                                    });
                                                                }} />
                                                        </LocalizationProvider>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DatePicker label="Eğitim Bitiş Tarihi"
                                                                format="DD/MM/YYYY"
                                                                value={dayjs(form.end_date)}
                                                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                                                                onChange={(e: any) => {
                                                                    setForm({ ...form, end_date: e.$d });
                                                                }} />
                                                        </LocalizationProvider>
                                                    </div>
                                                    <TextField
                                                        label="Eğitim Yeri"
                                                        name="location"
                                                        value={form.location}
                                                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                                                        size="small"
                                                        required
                                                        fullWidth
                                                    />
                                                    <TextField
                                                        label="Eğitimin Saati"
                                                        name="start_hour"
                                                        value={form.start_hour}
                                                        onChange={
                                                            (e) => {
                                                                setForm({ ...form, start_hour: e.target.value });
                                                            }
                                                        }
                                                        size="small"
                                                        required
                                                        type="time"
                                                        fullWidth
                                                    />
                                                    <div style={{
                                                        display: "flex",
                                                        gap: "10px",
                                                    }}>
                                                        <TextField
                                                            label="Saat"
                                                            name="hour"
                                                            value={form.hour.split(":")[0]}
                                                            onChange={(e) => {
                                                                const minute = form.hour.split(":")[1];
                                                                let hour = e.target.value;
                                                                if (hour.startsWith("0")) {
                                                                    hour = hour.substring(1);
                                                                }
                                                                setForm({ ...form, hour: `${hour}:${minute}` });
                                                            }}
                                                            size="small"
                                                            required
                                                            fullWidth
                                                            type="number"
                                                            inputProps={{
                                                                min: 0
                                                            }}
                                                        />
                                                        <TextField
                                                            label="Dakika"
                                                            name="minute"
                                                            fullWidth
                                                            value={form.hour.split(":")[1]}
                                                            onChange={(e) => {
                                                                const hour = form.hour.split(":")[0];
                                                                if (e.target.value.startsWith("0")) {
                                                                    e.target.value = e.target.value.substring(1);
                                                                }
                                                                if (parseInt(e.target.value) > 59) {
                                                                    e.target.value = "59";
                                                                }
                                                                setForm({ ...form, hour: `${hour}:${e.target.value}` });
                                                            }}
                                                            size="small"
                                                            required
                                                            type="number"
                                                            inputProps={{
                                                                min: 0,
                                                                max: 59,
                                                                step: 15
                                                            }}
                                                        />
                                                    </div>
                                                    <div
                                                        style={{
                                                            display: "flex",
                                                            gap: "10px",
                                                            flexDirection: "column",
                                                            marginTop: "10px",
                                                        }}
                                                    >
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            size="small"
                                                        >
                                                            Kaydet
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            color="info"
                                                            size="small"
                                                            onClick={handleCloseEducationDialog}
                                                        >
                                                            İptal
                                                        </Button>
                                                    </div>
                                                </form>
                                            </DialogContent>
                                        </Dialog>


                                    </Container>
                                )
                            ).padding("0 20px")
                        )
                    })
        )
    }
}