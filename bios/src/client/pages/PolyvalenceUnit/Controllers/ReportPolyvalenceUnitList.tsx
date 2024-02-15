import { HStack, UIController, UIView, VStack, cLeading, cTopLeading, useParams, Text, ReactView, Spinner, UIViewBuilder } from "@tuval/forms";
import { Views } from "../../../components/Views";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import getYearPeriods from "../../../assets/Functions/getYearPeriods";
import getHalfYearPeriods from "../../../assets/Functions/getHalfYearPeriods";
import getQuarterYearPeriods from "../../../assets/Functions/getQuarterYearPeriods";
import getMonthPeriods from "../../../assets/Functions/getMonthPeriods";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import AppInfo from "../../../../AppInfo";

export class ReportPolyvalenceUnitList extends UIController {


    public LoadView(): UIView {
        const { id } = useParams();
        const { me, isLoading } = useGetMe("console");
        const { polyvalenceUnit, isLoadingPolyvalenceUnit } = PolyvalenceUnit.Get(id);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);

        return (
            isLoading || isLoadingPolyvalenceUnit || isLoadingPeriods ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                    const [selectedPeriod, setSelectedPeriod] = useState<string>("");
                    const [reportData, setReportData] = useState<any[]>([]);

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
                                Query.equal("tenant_id", me?.prefs?.organization)
                            ]).then((res) => {
                                setReportData(res.documents);
                                console.log(res.documents);
                                columns: 
                                const competencies: { id: string, name: string }[] = [];
                                res.documents.forEach((item: any) => {
                                    if (!competencies.some((c) => c.id == item.competency_id)) {
                                        competencies.push({ id: item.competency_id, name: item.competency_name });
                                    }
                                });
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
                                Text(" ")
                            )
                        ).padding("0 20px")
                    )
                })
        )


    }
}