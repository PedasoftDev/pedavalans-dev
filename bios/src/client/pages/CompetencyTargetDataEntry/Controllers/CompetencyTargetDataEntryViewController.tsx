import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, nanoid, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Container, LeftContainer, LeftContainerContent, LeftContainerContentItem, LeftContainerHeader, RightContainer, RightContainerHeader } from "../Views/View";
import { Views } from "../../../components/Views";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Toast } from "../../../components/Toast";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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
import CompetencyGradeValue from "../../../../server/hooks/competencyGradeValue/main";
import Competency from "../../../../server/hooks/competency/main";
import ICompetency from "../../../interfaces/ICompetency";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import EmployeeCompetencyValue from "../../../../server/hooks/EmployeeCompetencyValue/main";
import AppInfo from "../../../../AppInfo";

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

    public LoadView(): UIView {

        const [selectedTable, setSelectedTable] = useState<IPolyvalenceUnit.IPolyvalenceUnit>(resetUnitTable);
        const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");
        const [selectedPeriod, setSelectedPeriod] = useState<string>("");

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);
        const { competencyGradeValueList, isLoadingCompetencyGradeValueList } = CompetencyGradeValue.GetList(me?.prefs?.organization);
        const { competencyDepartments } = CompetencyDepartment.GetByDepartmentId(selectedTable.polyvalence_department_id);
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { createEmployeeCompetencyValue } = EmployeeCompetencyValue.Create();
        const { updateEmployeeCompetencyValue } = EmployeeCompetencyValue.Update();


        return (
            isLoading || isLoadingPolyvalenceUnit || isLoadingPeriods || isLoadingEmployees || isLoadingGroups || isLoadingCompetencyGradeValueList || isLoadingCompetencyList ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                    const [selectedGroupId, setSelectedGroupId] = useState<string>("");
                    const [selectedCompetencyList, setSelectedCompetencyList] = useState<ICompetency.ICompetency[]>([]);
                    const [employeeCompetencyValue, setEmployeeCompetencyValue] = useState<IEmployeeCompetencyValue.IEmployeeCompetencyValue[]>([]);

                    const onChangeTable = (e: SelectChangeEvent<string>) => {
                        const table = polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === e.target.value);
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
                        { field: "competency_name", headerName: "Yetkinlik Adı", flex: 1 },
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
                                                    employee_name: employees.find((employee) => employee.id === selectedEmployeeId)?.first_name
                                                        + " " + employees.find((employee) => employee.id === selectedEmployeeId)?.last_name,
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
                                        {competencyGradeValueList.filter(x => x.competency_id === params.row.competency_id)
                                            .sort((a: any, b: any) => a.grade_level_number - b.grade_level_number)
                                            .map((value) => (
                                                <MenuItem value={value.grade_level_number} key={value.competency_grade_value_id}>{value.grade_level_number}</MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>

                            )
                        },
                    ];

                    const getCompetencies = async (employee_id: string) => {
                        const selectedEmployeeInfo = employees.find((employee) => employee.id === employee_id);
                        const appendToSelectedCompetencyList = [];
                        await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, "employee_competency_value",
                            [
                                Query.equal("employee_id", employee_id), Query.equal("competency_evaluation_period", selectedPeriod),
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
                    }, [])

                    return (
                        VStack(
                            HStack({ alignment: cLeading })(
                                Views.Title("Yetkinlik Hedef Değer Girişi").paddingTop("10px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            ReactView(
                                <Container>
                                    <LeftContainer>
                                        <LeftContainerHeader>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Polivalans Tablosu</InputLabel>
                                                <Select
                                                    name="polyvalence_table_id"
                                                    value={selectedTable?.polyvalence_table_id}
                                                    label="Polivalans Tablosu"
                                                    onChange={onChangeTable}
                                                    size="small"
                                                    required
                                                >
                                                    {polyvalenceUnitList.map((unit) => (
                                                        <MenuItem value={unit.polyvalence_table_id} key={unit.polyvalence_table_id}>{unit.polyvalence_table_name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Değerlendirme Dönemi</InputLabel>
                                                <Select
                                                    name="evaluation_period"
                                                    value={selectedPeriod}
                                                    label="Değerlendirme Dönemi"
                                                    onChange={(e) => {
                                                        setSelectedPeriod(e.target.value);
                                                        setSelectedEmployeeId("")
                                                        setSelectedGroupId("")
                                                        setSelectedCompetencyList([])
                                                        setEmployeeCompetencyValue([])
                                                    }}
                                                    size="small"
                                                    required
                                                >
                                                    {dataYear.map((period, i) => (
                                                        <MenuItem value={period.name} key={i}>{period.name}</MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </LeftContainerHeader>
                                        {
                                            selectedTable && selectedPeriod &&
                                            <LeftContainerContent>
                                                {
                                                    employees
                                                        .filter((employee) => employee.department_id === selectedTable.polyvalence_department_id)
                                                        .sort((a, b) => a.first_name.localeCompare(b.first_name))
                                                        .map((employee, i) =>
                                                            <LeftContainerContentItem key={employee.id} selected={selectedEmployeeId === employee.id} onClick={() => selectEmployee(employee.id)}>
                                                                <IoPersonCircleOutline size={25} {...(selectedEmployeeId === employee.id && { color: "#3BA2EE" })} />
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
                                                <FormControl fullWidth size="small">
                                                    <InputLabel>Yetkinlik Grubu</InputLabel>
                                                    <Select
                                                        name="group"
                                                        value={selectedGroupId}
                                                        label="Yetkinlik Grubu"
                                                        onChange={(e) => setSelectedGroupId(e.target.value)}
                                                        size="small"
                                                        required
                                                    >
                                                        {groups.map((group, i) => (
                                                            <MenuItem value={group.competency_group_id} key={i}>{group.competency_group_name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </RightContainerHeader>
                                            <div style={{
                                                height: "calc(100vh - 120px)",
                                                width: "100%",
                                                padding: "0 20px"
                                            }}>
                                                <StyledDataGrid
                                                    columns={columns}
                                                    rows={selectedCompetencyList}
                                                    getRowId={(row) => row.competency_id}
                                                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                />
                                            </div>
                                        </RightContainer>
                                    }
                                </Container>
                            )
                        ).padding("0 20px")
                    )
                })
        )
    }
}