import { HStack, UIController, UIView, VStack, cLeading, cTopLeading, useParams, ReactView, Spinner, UIViewBuilder, UINavigate } from "@tuval/forms";
import { Views } from "../../../components/Views";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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

export class ReportPolyvalenceUnitList extends UIController {


    public LoadView(): UIView {
        const { id } = useParams();
        const { me, isLoading } = useGetMe("console");
        const { polyvalenceUnit, isLoadingPolyvalenceUnit } = PolyvalenceUnit.Get(id);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { competencyGradeValueList, isLoadingCompetencyGradeValueList } = CompetencyGradeValue.GetList(me?.prefs?.organization)

        return (
            isLoading || isLoadingPolyvalenceUnit || isLoadingPeriods || isLoadingCompetencyGradeValueList ? VStack(Spinner()) :
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
                                    Query.limit(1000)
                                ]).then((res: any) => {
                                    const copyColumns: GridColDef[] = []
                                    const copyEmployees: { id: string, name: string }[] = []
                                    copyColumns.push({
                                        field: "id", headerName: "Çalışan Adı Soyadı", minWidth: 200, width: 200,
                                        valueGetter: (params: any) => {
                                            return params.row.name
                                        }
                                    })
                                    res.documents.forEach((item: IEmployeeCompetencyValue.IEmployeeCompetencyValue) => {
                                        if (!copyEmployees.some(x => x.id == item.employee_id)) {
                                            copyEmployees.push({ id: item.employee_id, name: item.employee_name })
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
                                                        targetTotal = competencyGradeValueList.filter((x) => x.competency_id === item.competency_id).length;
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
                                            )
                                        ),
                                    ),
                                ).height().paddingTop("15px"),
                                VStack(
                                    ReactView(
                                        <div style={{ height: "calc(100vh - 150px)", width: "calc(100vw - 330px)" }}>
                                            {rows.length != 0 &&
                                                <StyledDataGrid rows={rows} columns={columns} localeText={trTR.components.MuiDataGrid.defaultProps.localeText} style={{ width: "100%" }} />
                                            }
                                        </div>
                                    )
                                )
                            ).padding("0 20px")
                        )
                    })
        )
    }
}