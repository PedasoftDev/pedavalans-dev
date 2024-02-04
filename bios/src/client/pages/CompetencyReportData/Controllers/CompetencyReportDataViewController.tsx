import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, useNavigate } from "@tuval/forms";
import { Views } from "../../../components/Views";
import { Container, LeftContainer, LeftContainerContent, LeftContainerContentItem, LeftContainerHeader, RightContainer, RightContainerHeader } from "../../CompetencyTargetDataEntry/Views/View";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React, { useEffect, useState } from "react";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import Competency from "../../../../server/hooks/competency/main";
import { useGetMe } from "@realmocean/sdk";
import IPolyvalenceUnit from "../../../interfaces/IPolyvalenceUnit";
import { IoPersonCircleOutline } from "react-icons/io5";
import StyledDataGrid from "../../../components/StyledDataGrid";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import { Toast } from "../../../components/Toast";
import { GridColDef, trTR } from "@mui/x-data-grid";
import getMonthPeriods from "../../../assets/Functions/getMonthPeriods";
import getQuarterYearPeriods from "../../../assets/Functions/getQuarterYearPeriods";
import getHalfYearPeriods from "../../../assets/Functions/getHalfYearPeriods";
import getYearPeriods from "../../../assets/Functions/getYearPeriods";
import ICompetency from "../../../interfaces/ICompetency";
import EmployeeCompetencyValue from "../../../../server/hooks/EmployeeCompetencyValue/main";

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
};

export class CompetencyReportDataViewController extends UIController {
    public LoadView(): UIView {

        const [selectedTable, setSelectedTable] = useState<IPolyvalenceUnit.IPolyvalenceUnit>(resetUnitTable);
        const [selectedPeriod, setSelectedPeriod] = useState<string>("");
        const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>("");

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod();
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);
        const { competencyDepartments } = CompetencyDepartment.GetByDepartmentId(selectedTable.polyvalence_department_id);
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { employeeCompetencyValue, isLoadingEmployeeCompetencyValue } = EmployeeCompetencyValue.GetByEmployeeIdEvaluationPeriod(selectedEmployeeId, selectedPeriod, selectedTable.polyvalence_table_id, me?.prefs?.organization);

        return (
            isLoading || isLoadingPolyvalenceUnit || isLoadingPeriods || isLoadingEmployees || isLoadingGroups || isLoadingCompetencyList ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                    const [selectedGroupId, setSelectedGroupId] = useState<string>("");
                    const [selectedCompetencyList, setSelectedCompetencyList] = useState<ICompetency.ICompetency[]>([]);

                    const onChangeTable = (e: SelectChangeEvent<string>) => {
                        const table = polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === e.target.value);
                        const periodYear = Number(periods[0].evaluation_period_year);
                        setSelectedTable(table)
                        setSelectedPeriod("")
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
                        { field: "competency_target_value", headerName: "Hedef Değer", width: 150, minWidth: 150 },
                        { field: "competency_real_value", headerName: "Dönem Sonucu", width: 150, minWidth: 150 },
                        { field: "competency_real_value_description", headerName: "Yüzdelik", width: 150, minWidth: 150 }
                    ];

                    const getCompetencies = (employee_id: string) => {
                        const selectedEmployeeInfo = employees.find((employee) => employee.id === employee_id);
                        const appendToSelectedCompetencyList = [];
                        competencyList.forEach((competency) => {
                            competencyDepartments.forEach((department) => {
                                if (competency.competency_id === department.competency_id) {
                                    const listItem = removeDollarProperties(competency);
                                    appendToSelectedCompetencyList.push({
                                        ...listItem,
                                        employee_id: employee_id,
                                        employee_name: `${selectedEmployeeInfo?.first_name} ${selectedEmployeeInfo?.last_name}`,
                                        polyvalence_table_id: selectedTable.polyvalence_table_id,
                                        polyvalence_table_name: selectedTable.polyvalence_table_name,
                                        competency_evaluation_period: selectedPeriod,
                                        competency_department_id: department.competency_department_id,
                                        competency_department_name: department.competency_department_name,
                                    })
                                }
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
                                Views.Title("Çalışan Yetkinlik Karnesi").paddingTop("10px")
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
                                                    onChange={(e) => setSelectedPeriod(e.target.value)}
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