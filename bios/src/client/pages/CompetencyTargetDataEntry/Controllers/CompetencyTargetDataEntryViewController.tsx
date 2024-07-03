import { HStack, ReactView, Spinner, State, UIController, UINavigate, UIView, UIViewBuilder, VStack, cLeading, nanoid, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Container, LeftContainer, LeftContainerContent, LeftContainerContentItem, LeftContainerHeader, RightContainer, RightContainerHeader } from "../Views/View";
import { Views } from "../../../components/Views";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Toast } from "../../../components/Toast";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material";
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
import IAccountRelation from "../../../interfaces/IAccountRelation";
import Collections from "../../../../server/core/Collections";
import { Resources } from "../../../assets/Resources";
import CompetencyGrade from "../../../../server/hooks/competencyGrade/main";
import { FaRegCopy } from "react-icons/fa6";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { Umay } from "@tuval/core";
import LinearProgressWithLabel from '../../../components/LinearProgressWithLabel';

import { useAppSelector, useAppDispatch } from "../../../hooks";
import { selectPendingEvaluation, setPendingEvaluationToNull } from "../../../features/pendingEvaluation";

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

export class CompetencyTargetDataEntryViewController extends UIController {

    @State()
    private polyvalenceUnitList: IPolyvalenceUnit.IPolyvalenceUnit[];

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

        const dispatch = useAppDispatch();
        const selector = useAppSelector;
        const setAssignEducationNull = () => dispatch(setPendingEvaluationToNull());

        const [selectedTable, setSelectedTable] = useState<IPolyvalenceUnit.IPolyvalenceUnit>(resetUnitTable);
        const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
        const [selectedPeriod, setSelectedPeriod] = useState<string>("");

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { periods: periodList, isLoading: isLoadingPeriodList } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);
        const { competencyDepartments } = CompetencyDepartment.GetByDepartmentId(selectedTable.polyvalence_department_id);
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { levels, isLoadingLevels } = CompetencyGrade.GetGradeLevelList();
        const { createEmployeeCompetencyValue } = EmployeeCompetencyValue.Create();
        const { updateEmployeeCompetencyValue } = EmployeeCompetencyValue.Update();


        return (
            isLoading || this.polyvalenceUnitList == null || isLoadingPeriods || isLoadingEmployees || isLoadingGroups || isLoadingCompetencyList || isLoadingLevels || isLoadingPeriodList ? VStack(Spinner()) :
                me === null ? UINavigate("/login") :
                    UIViewBuilder(() => {

                        /* GLOBAL STATE ASSIGN EDUCATION */
                        const pendingEvaluation: { polyvalence_table_id: string; evaluation_period: string; } = selector(selectPendingEvaluation);

                        const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                        const [selectedGroupId, setSelectedGroupId] = useState<string>("");
                        const [selectedCompetencyList, setSelectedCompetencyList] = useState<ICompetency.ICompetency[]>([]);
                        const [employeeCompetencyValue, setEmployeeCompetencyValue] = useState<IEmployeeCompetencyValue.IEmployeeCompetencyValue[]>([]);

                        // Dialog State
                        const [dialogOpen, setDialogOpen] = useState(false);
                        const [dialogForm, setDialogForm] = useState<{ polyvalence_table_id: string, previous_evaluation_period: string, current_evaluation_period: string }>({
                            polyvalence_table_id: "",
                            previous_evaluation_period: "",
                            current_evaluation_period: ""
                        });
                        const [dialogDataYear, setDialogDataYear] = useState<{ name: string }[]>([]);
                        const [startDialogTransferData, setStartDialogTransferData] = useState(false);
                        const [dialogAlreadyExistData, setDialogAlreadyExistData] = useState(false);
                        const [dialogPercent, setDialogPercent] = useState(0);

                        const handleOpenDialog = () => {
                            setDialogOpen(true);
                        }

                        const handleCloseDialog = () => {
                            setDialogOpen(false);
                            setDialogDataYear([]);
                            setDialogForm({
                                polyvalence_table_id: "",
                                previous_evaluation_period: "",
                                current_evaluation_period: ""
                            })
                        }

                        const confirmTransferData = async () => {
                            const tasks = new Umay();
                            const data = await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.EmployeeCompetencyValue,
                                [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_competency_value", false),
                                Query.equal("polyvalence_table_id", dialogForm.polyvalence_table_id), Query.equal("competency_evaluation_period", dialogForm.previous_evaluation_period)]).then((res) => res.documents)
                            data.forEach((value, index) => {
                                tasks.Task(async () => {
                                    const docId: string = nanoid();
                                    const createObj: IEmployeeCompetencyValue.ICreateEmployeeCompetencyValue = {
                                        competency_department_id: value.competency_department_id,
                                        competency_department_name: value.competency_department_name,
                                        competency_evaluation_period: dialogForm.current_evaluation_period,
                                        competency_id: value.competency_id,
                                        competency_name: value.competency_name,
                                        competency_real_value: "",
                                        competency_target_value: value.competency_target_value,
                                        competency_value_desc: "",
                                        employee_id: value.employee_id,
                                        employee_name: value.employee_name,
                                        polyvalence_table_id: value.polyvalence_table_id,
                                        polyvalence_table_name: value.polyvalence_table_name,
                                        tenant_id: value.tenant_id,
                                        employee_competency_value_id: docId,
                                        realm_id: value.realm_id,
                                    }
                                    try {
                                        await Services.Databases.createDocument(AppInfo.Name, AppInfo.Database, Collections.EmployeeCompetencyValue, docId, createObj)
                                        setDialogPercent(((index + 1) / data.length) * 100)
                                    }
                                    catch (err) {
                                        console.error(err)
                                    }
                                })
                                tasks.Wait(1);
                            })
                            tasks.Wait(1);
                            tasks.Task(() => {
                                window.location.reload();
                            })
                            tasks.Run();
                        }

                        const handleStartDialogTransferData = () => {
                            setStartDialogTransferData(true);
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.EmployeeCompetencyValue,
                                [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_competency_value", false),
                                Query.equal("polyvalence_table_id", dialogForm.polyvalence_table_id), Query.equal("competency_evaluation_period", dialogForm.current_evaluation_period)]
                            ).then((currentPeriodData) => {
                                if (currentPeriodData.documents.length > 0) {
                                    setDialogAlreadyExistData(true);
                                } else {
                                    confirmTransferData();
                                }
                            })
                        }

                        const onChangeTableToDialog = (e: SelectChangeEvent<string>) => {
                            const table = this.polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === e.target.value);
                            const appedValue = []
                            setDialogForm({
                                ...dialogForm,
                                polyvalence_table_id: e.target.value
                            })
                            if (table.polyvalence_evaluation_frequency == "Yıl") {
                                periodList.forEach((period) => {
                                    getYearPeriods(Number(period.evaluation_period_year)).forEach((value) => appedValue.push(value))
                                })
                                setDialogDataYear(appedValue)
                            }
                            else if (table.polyvalence_evaluation_frequency == "Yarıyıl") {
                                periodList.forEach((period) => {
                                    getHalfYearPeriods(Number(period.evaluation_period_year)).forEach((value) => appedValue.push(value))
                                })
                                setDialogDataYear(appedValue)
                            }
                            else if (table.polyvalence_evaluation_frequency == "Çeyrekyıl") {
                                periodList.forEach((period) => {
                                    getQuarterYearPeriods(Number(period.evaluation_period_year)).forEach((value) => appedValue.push(value))
                                })
                                setDialogDataYear(appedValue)
                            }
                            else if (table.polyvalence_evaluation_frequency == "Ay") {
                                periodList.forEach((period) => {
                                    getMonthPeriods(Number(period.evaluation_period_year)).forEach((value) => appedValue.push(value))
                                })
                                setDialogDataYear(appedValue)
                            }
                        }

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
                                field: "competency_target_value", headerName: "Hedef Değer", width: 100, minWidth: 100,
                                renderCell: (params) => (
                                    <FormControl fullWidth size="small">
                                        <Select
                                            name="competency_target_value"
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
                                                            competency_target_value: e.target.value
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
                                                                    competency_target_value: e.target.value
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
                                                        competency_target_value: e.target.value,
                                                        competency_real_value: "",
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
                                                            competency_target_value: e.target.value
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
                                            <MenuItem value={"no-target"} key={"-"}>{"Hedefi Yok"}</MenuItem>
                                        </Select>
                                    </FormControl>
                                )
                            },
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
                                    competencyList.forEach((competency) => {
                                        competencyDepartments.forEach((department) => {
                                            if (competency.competency_id === department.competency_id) {
                                                const listItem = removeDollarProperties(competency);
                                                const target_value = res.documents.find((value) => value.competency_id === listItem.competency_id)?.competency_target_value;
                                                appendToSelectedCompetencyList.push({
                                                    ...listItem,
                                                    employee_id: employee_id,
                                                    employee_name: `${selectedEmployeeInfo?.first_name} ${selectedEmployeeInfo?.last_name}`,
                                                    polyvalence_table_id: selectedTable.polyvalence_table_id,
                                                    polyvalence_table_name: selectedTable.polyvalence_table_name,
                                                    competency_evaluation_period: selectedPeriod,
                                                    competency_department_id: department.competency_department_id,
                                                    competency_department_name: department.competency_department_name,
                                                    competency_target_value: target_value ? target_value : ""
                                                })
                                            }
                                        })
                                    })
                                })
                            console.log(appendToSelectedCompetencyList)
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
                            // eklendi
                            if (pendingEvaluation) {
                                onChangeTable(pendingEvaluation.polyvalence_table_id);
                                setSelectedPeriod(pendingEvaluation.evaluation_period);
                                setSelectedEmployeeId("")
                                setSelectedGroupId("")
                                setSelectedCompetencyList([])
                                setEmployeeCompetencyValue([])
                                setAssignEducationNull();
                            }
                        }, [])

                        return (
                            VStack(
                                HStack({ alignment: cLeading })(
                                    Views.Title("Yetkinlik Hedef Değer Girişi").paddingTop("10px"),
                                    accountRelations[0].is_admin &&
                                    HStack(
                                        ReactView(
                                            <FaRegCopy size={18} />
                                        )
                                    ).width().height().paddingTop("10px").marginLeft("10px").tooltip("Önceki Dönemden Veri Aktarımı").cursor("pointer").onClick(() => {
                                        handleOpenDialog();
                                    })
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                ReactView(
                                    <Container>
                                        <LeftContainer>
                                            <LeftContainerHeader>
                                                <Autocomplete
                                                    options={this.polyvalenceUnitList}
                                                    value={this.polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === selectedTable?.polyvalence_table_id) || null}
                                                    onChange={(event, newValue) => onChangeTable(newValue?.polyvalence_table_id || "")}
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
                                                    disableClearable
                                                    fullWidth
                                                />
                                                <Autocomplete
                                                    options={dataYear}
                                                    value={dataYear.find((period) => period.name === selectedPeriod) || null}
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
                                                        employees
                                                            .filter((employee) => employee.department_id === selectedTable.polyvalence_department_id)
                                                            .filter((employee) => employee.is_active)
                                                            .sort((a, b) => a.first_name.localeCompare(b.first_name))
                                                            .map((employee, i) =>
                                                                <LeftContainerContentItem key={employee.id} selected={selectedEmployeeId === employee.$id} onClick={() => selectEmployee(employee.$id)}>
                                                                    <IoPersonCircleOutline size={25} {...(selectedEmployeeId === employee.$id && { color: "#3BA2EE" })} />
                                                                    {employee.first_name} {employee.last_name}
                                                                </LeftContainerContentItem>
                                                            )
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
                                                        value={groups.find((group) => group.competency_group_id === selectedGroupId) || null}
                                                        onChange={(event, newValue) => setSelectedGroupId(newValue?.competency_group_id || "")}
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
                                                        rows={selectedGroupId ? selectedCompetencyList.filter((competency) => competency.competency_group_id === selectedGroupId) : selectedCompetencyList}
                                                        getRowId={(row) => row.competency_id}
                                                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                    />
                                                </div>
                                            </RightContainer>
                                        }
                                        <Dialog
                                            open={dialogOpen}
                                            onClose={handleCloseDialog}
                                        >
                                            <DialogTitle>Önceki Dönemden Veri Aktarımı</DialogTitle>
                                            <DialogContent>
                                                {startDialogTransferData ?
                                                    <div>
                                                        {dialogAlreadyExistData ?
                                                            <div>
                                                                <p>Seçtiğiniz dönem için veri zaten mevcut.</p>
                                                                <p>Üzerine yazmak istiyor musunuz? Bu işlem geri alınamaz.</p>
                                                                <Button color="error" onClick={handleCloseDialog}>
                                                                    İptal
                                                                </Button>
                                                                <Button onClick={() => { confirmTransferData(); }}>
                                                                    Verilerin Üzerine Yaz ve Aktarımı Başlat
                                                                </Button>
                                                            </div>
                                                            :
                                                            <div>
                                                                <p>Veri aktarımı başlatıldı. Lütfen bekleyin ve işlem tamamlanana kadar sayfayı kapatmayın.</p>
                                                                <LinearProgressWithLabel value={dialogPercent} />
                                                            </div>
                                                        }
                                                    </div>
                                                    : <div style={{ width: "400px" }}>
                                                        <FormControl fullWidth size="small" margin="normal">
                                                            <InputLabel>Polivalans Tablosu</InputLabel>
                                                            <Select
                                                                name="polyvalence_table_id"
                                                                value={dialogForm.polyvalence_table_id}
                                                                label="Polivalans Tablosu"
                                                                onChange={onChangeTableToDialog}
                                                                size="small"
                                                                required
                                                            >
                                                                {this.polyvalenceUnitList.map((unit) => (
                                                                    <MenuItem value={unit.polyvalence_table_id} key={unit.polyvalence_table_id}>{unit.polyvalence_table_name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth size="small" margin="normal">
                                                            <InputLabel>Önceki Değerlendirme Dönemi</InputLabel>
                                                            <Select
                                                                name="evaluation_period"
                                                                value={dialogForm.previous_evaluation_period}
                                                                label="Önceki Değerlendirme Dönemi"
                                                                onChange={(e) => {
                                                                    setDialogForm({
                                                                        ...dialogForm,
                                                                        previous_evaluation_period: e.target.value
                                                                    })
                                                                }}
                                                                size="small"
                                                                required
                                                            >
                                                                {dialogDataYear.map((period, i) => (
                                                                    <MenuItem value={period.name} key={i}>{period.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                        <FormControl fullWidth size="small" margin="normal">
                                                            <InputLabel>Mevcut Değerlendirme Dönemi</InputLabel>
                                                            <Select
                                                                name="evaluation_period"
                                                                value={dialogForm.current_evaluation_period}
                                                                label="Mevcut Değerlendirme Dönemi"
                                                                onChange={(e) => {
                                                                    setDialogForm({
                                                                        ...dialogForm,
                                                                        current_evaluation_period: e.target.value
                                                                    })
                                                                }}
                                                                size="small"
                                                                required
                                                            >
                                                                {dialogDataYear.filter((period) => period.name !== dialogForm.previous_evaluation_period)
                                                                    .filter((period) => Number(period.name.slice(0, 4)) >= Number(dialogForm.previous_evaluation_period.slice(0, 4)))
                                                                    .map((period, i) => (
                                                                        <MenuItem value={period.name} key={i}>{period.name}</MenuItem>
                                                                    ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>}
                                            </DialogContent>
                                            {!startDialogTransferData && <DialogActions>
                                                <Button color={"error"} onClick={handleCloseDialog}>
                                                    İptal
                                                </Button>
                                                <Button onClick={handleStartDialogTransferData}>
                                                    Aktarımı Başlat
                                                </Button>
                                            </DialogActions>}
                                        </Dialog>
                                    </Container>
                                )
                            ).padding("0 20px")
                        )
                    })
        )
    }
}