import { HStack, UIController, UIView, VStack, cLeading, cTopLeading, useParams, ReactView, Spinner, UIViewBuilder, UINavigate } from "@tuval/forms";
import { Views } from "../../../components/Views";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { GridColDef, trTR } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import getYearPeriods from "../../../assets/Functions/getYearPeriods";
import getHalfYearPeriods from "../../../assets/Functions/getHalfYearPeriods";
import getQuarterYearPeriods from "../../../assets/Functions/getQuarterYearPeriods";
import getMonthPeriods from "../../../assets/Functions/getMonthPeriods";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import AppInfo from "../../../../AppInfo";
import SkillSlice from "../../../components/SkillSlice";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { CircularProgressbar } from 'react-circular-progressbar';
import CompetencyGradeValue from "../../../../server/hooks/competencyGradeValue/main";
import { getReportToExcelByPolyvalenceTable } from "../../../assets/Functions/getReportToExcelByPolyvalenceTable";
import { SiMicrosoftexcel } from "react-icons/si";
import Competency from "../../../../server/hooks/competency/main";
import CompetencyGroup from "../../../../server/hooks/competencyGroup/main";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import Collections from "../../../../server/core/Collections";
import { Resources } from "../../../assets/Resources";
import { getReportToExcelByMachinePolyvalenceTable } from "../../../assets/Functions/getReportToExcelByMachinePolyvalenceTable";
import { GridContainer } from "../Views/View";
import CompetencyGrade from "../../../../server/hooks/competencyGrade/main";
import OrganizationStructurePosition from "../../../../server/hooks/organizationStructrePosition/main";

export class ReportPolyvalenceUnitList extends UIController {


    public LoadView(): UIView {
        const { id } = useParams();
        const { me, isLoading } = useGetMe("console");
        const { polyvalenceUnit, isLoadingPolyvalenceUnit } = PolyvalenceUnit.Get(id);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { grades, isLoading: isLoadingGrades } = CompetencyGrade.GetCompetencyGrades(me?.prefs?.organization);
        const { levels, isLoadingLevels } = CompetencyGrade.GetGradeLevelList();
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { activeGroups: groups, isLoading: isLoadingGroups } = CompetencyGroup.GetActiveCompetencyGroups();
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { isLoadingPositions, positions } = OrganizationStructurePosition.GetList(me?.prefs?.organization);

        let excelData: any[] = [];

        return (
            isLoading || isLoadingPolyvalenceUnit || isLoadingPositions || isLoadingCompetencyList || isLoadingPeriods || isLoadingGrades || isLoadingLevels || isLoadingEmployees || isLoadingGroups ? VStack(Spinner()) :
                periods.length == 0 ? UINavigate("/") :
                    UIViewBuilder(() => {
                        const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                        const [selectedPeriod, setSelectedPeriod] = useState<string>("");

                        const [columns, setColumns] = useState<GridColDef[]>([]);
                        const [rows, setRows] = useState<any[]>([]);

                        useEffect(() => {
                            const periodYear = Number(periods[0].evaluation_period_year);
                            if (polyvalenceUnit.polyvalence_evaluation_frequency == "Yıl") {
                                setDataYear(getYearPeriods(periodYear))
                            }
                            else if (polyvalenceUnit.polyvalence_evaluation_frequency == "Yarıyıl") {
                                setDataYear(getHalfYearPeriods(periodYear))
                            }
                            else if (polyvalenceUnit.polyvalence_evaluation_frequency == "Çeyrekyıl") {
                                setDataYear(getQuarterYearPeriods(periodYear))
                            }
                            else if (polyvalenceUnit.polyvalence_evaluation_frequency == "Ay") {
                                setDataYear(getMonthPeriods(periodYear))
                            }
                        }, [])

                        const handleChangeEvaluationPeriod = (e: SelectChangeEvent<string>) => {
                            setSelectedPeriod(e.target.value);
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, "employee_competency_value",
                                [
                                    Query.equal("competency_evaluation_period", e.target.value),
                                    Query.equal("polyvalence_table_id", id), Query.equal("is_deleted_competency_value", false),
                                    Query.equal("tenant_id", me?.prefs?.organization),
                                    Query.limit(10000)
                                ]).then((res: any) => {
                                    const copyColumns: GridColDef[] = []
                                    const copyEmployees: { id: string, name: string, position: string }[] = []

                                    copyColumns.push({
                                        field: "id", headerName: "Çalışan Adı Soyadı", minWidth: 200, width: 200,
                                        valueGetter: (params: any) => {
                                            return params.row.name
                                        }
                                    })

                                    copyColumns.push({
                                        field: "position", headerName: "Pozisyon", minWidth: 200, width: 200,
                                        valueGetter: (params: any) => {
                                            return params.row.position
                                        }
                                    })

                                    res.documents.forEach((item: IEmployeeCompetencyValue.IEmployeeCompetencyValue) => {
                                        if (!copyEmployees.some(x => x.id == item.employee_id)) {
                                            const position = positions.find(x => x.$id === employees.find(y => y.$id === item.employee_id)?.position_id)?.name;
                                            copyEmployees.push({ id: item.employee_id, name: item.employee_name, position: position })
                                        }
                                        if (!copyColumns.some(x => x.field == item.competency_id)) {
                                            copyColumns.push({
                                                field: item.competency_id,
                                                headerName: item.competency_name,
                                                minWidth: 200,
                                                width: 200,
                                                hideSortIcons: true,
                                                renderCell: (params) => {
                                                    const value: IEmployeeCompetencyValue.IEmployeeCompetencyValue = res.documents.find((x: IEmployeeCompetencyValue.IEmployeeCompetencyValue) => x.employee_id == params.row.id && x.competency_id === item.competency_id)
                                                    let real: number = 0;
                                                    let target: number = 0;
                                                    let percentage: number = 0;
                                                    let targetTotal: number = 0;
                                                    if (value && value.competency_real_value && value.competency_target_value) {
                                                        real = Number(value.competency_real_value);
                                                        target = Number(value.competency_target_value);
                                                        percentage = (real / target) * 100;
                                                        percentage = isNaN(percentage) ? 0 : percentage;
                                                        percentage = parseFloat(percentage.toFixed(1));
                                                        const grade = grades.find(x => x.$id === groups.find(y => y.$id === competencyList.find(z => z.$id === item.competency_id)?.competency_group_id)?.competency_grade_id);
                                                        targetTotal = levels.filter(x => x.grade_id === grade?.$id).length;
                                                    }
                                                    return (
                                                        <div style={{ display: "flex", gap: "10px" }}>
                                                            <SkillSlice real={real} target={targetTotal} />
                                                            <div style={{ width: "40px", height: "40px" }}>
                                                                <CircularProgressbar value={percentage} text={`${percentage}%`} />
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    })
                                    setColumns(copyColumns)
                                    setRows(copyEmployees)
                                    excelData = res.documents;
                                })
                        }

                        const exportPolyvalenceUnitToXlsx = () => {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.equal("name", Resources.ParameterLocalStr.machine_based_polyvalence_management), Query.equal("tenant_id", me?.prefs?.organization)]).then(res => {
                                if (res.documents && res.documents[0] && res.documents[0].is_active) {
                                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Machine, [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted", false), Query.equal("is_active", true)]).then(machineRes => {
                                        Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.CompetencyMachineAssociation, [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted", false)]).then(competencyMachineRes => {
                                            getReportToExcelByMachinePolyvalenceTable(machineRes.documents as any, competencyMachineRes.documents as any, competencyList, groups, excelData, polyvalenceUnit.polyvalence_table_name)
                                        })
                                    })
                                } else {
                                    getReportToExcelByPolyvalenceTable(competencyList, groups, excelData, polyvalenceUnit.polyvalence_table_name, employees, positions)
                                }
                            })
                        }

                        return (
                            VStack({ alignment: cTopLeading })(
                                VStack({ alignment: cTopLeading })(
                                    HStack({ alignment: cLeading })(
                                        Views.Title(polyvalenceUnit.polyvalence_table_name)
                                    ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                    HStack({ spacing: 10 })(
                                        VStack(
                                            ReactView(
                                                <div style={{ display: "flex", gap: "10px", width: "100%" }}>
                                                    <FormControl fullWidth size="small">
                                                        <InputLabel>Değerlendirme Dönemi</InputLabel>
                                                        <Select
                                                            name="evaluation_period"
                                                            value={selectedPeriod}
                                                            label="Değerlendirme Dönemi"
                                                            onChange={handleChangeEvaluationPeriod}
                                                            size="small"
                                                            required
                                                        >
                                                            {dataYear.map((period, i) => (
                                                                <MenuItem value={period.name} key={i}>{period.name}</MenuItem>
                                                            ))}
                                                        </Select>
                                                    </FormControl>
                                                    {rows.length != 0 &&
                                                        <IconButton onClick={exportPolyvalenceUnitToXlsx}>
                                                            <SiMicrosoftexcel />
                                                        </IconButton>
                                                    }
                                                </div>
                                            )
                                        ),
                                    ),
                                ).height().paddingTop("15px"),
                                VStack(
                                    ReactView(
                                        <GridContainer>
                                            {rows.length != 0 &&
                                                <StyledDataGrid rows={rows} columns={columns} localeText={trTR.components.MuiDataGrid.defaultProps.localeText} style={{ width: "100%" }} />
                                            }
                                        </GridContainer>
                                    )
                                )
                            ).padding("0 20px")
                        )
                    })
        )
    }
}