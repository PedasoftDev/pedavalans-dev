import React, { useState } from "react";
import { HStack, Spinner, ReactView, UIController, UIView, UIViewBuilder, VStack, cLeading, cTopLeading, cTop, useNavigate } from "@tuval/forms";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import { Views as ViewsMain } from "../../../components/Views";
import { Views } from "../Views/Views";
import { CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Tooltip } from "@mui/material";
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import getYearPeriods from "../../../assets/Functions/getYearPeriods";
import getHalfYearPeriods from "../../../assets/Functions/getHalfYearPeriods";
import getQuarterYearPeriods from "../../../assets/Functions/getQuarterYearPeriods";
import getMonthPeriods from "../../../assets/Functions/getMonthPeriods";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import { BsPersonCircle } from "react-icons/bs";
import { CircularProgressbar } from "react-circular-progressbar";
import { RiExternalLinkFill } from "react-icons/ri";

const resetForm = {
    polyvalence_table_id: "",
    evaluation_period: "",
    percentage: "",
};

export class CompetencyStatusReportViewController extends UIController {
    public LoadView(): UIView {

        const { me, isLoading } = useGetMe("console");
        const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetList(me?.prefs?.organization);
        const { periods, isLoading: isLoadingPeriod } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const navigate = useNavigate();

        return (

            isLoading || isLoadingPolyvalenceUnit || isLoadingPeriod ? VStack(Spinner()) :

                UIViewBuilder(() => {
                    // tablo, dönem, yüzdelik filtresi
                    const [formFilters, setFormFilters] = useState(resetForm);
                    const [evaluationPeriod, setEvaluationPeriod] = useState([]);
                    const [employeePercentages, setEmployeePercentages] = useState([]);
                    const [isLoading, setIsLoading] = useState(false);

                    const handleChangePolyvalenceTable = (e) => {
                        const selectedEvaluationFrequency = polyvalenceUnitList.find((item) => item.$id === e.target.value).polyvalence_evaluation_frequency
                        const periodYear = Number(periods[0].evaluation_period_year)
                        if (selectedEvaluationFrequency == "Yıl") {
                            setEvaluationPeriod(getYearPeriods(periodYear))
                        }
                        else if (selectedEvaluationFrequency == "Yarıyıl") {
                            setEvaluationPeriod(getHalfYearPeriods(periodYear))
                        }
                        else if (selectedEvaluationFrequency == "Çeyrekyıl") {
                            setEvaluationPeriod(getQuarterYearPeriods(periodYear))
                        }
                        else if (selectedEvaluationFrequency == "Ay") {
                            setEvaluationPeriod(getMonthPeriods(periodYear))
                        }

                        setFormFilters({ ...formFilters, polyvalence_table_id: e.target.value });
                    }

                    const getReport = async (e) => {
                        setEmployeePercentages([])
                        e.preventDefault();
                        setIsLoading(true);
                        const employeeCompetencyValues: IEmployeeCompetencyValue.IEmployeeCompetencyValue[] = await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.EmployeeCompetencyValue, [Query.limit(10000), Query.equal("polyvalence_table_id", formFilters.polyvalence_table_id), Query.equal("competency_evaluation_period", formFilters.evaluation_period),
                        Query.notEqual("competency_target_value", "no-target"), Query.notEqual("competency_real_value", "")]).then((res) => res.documents as any[])

                        const employees: { employee_id: string, employee_name: string, targetTotal: number, realTotal: number }[] = []
                        employeeCompetencyValues.forEach((item) => {
                            const employee = employees.find((employee) => employee.employee_id === item.employee_id);
                            if (employee) {
                                employee.targetTotal += Number(item.competency_target_value)
                                employee.realTotal += Number(item.competency_real_value)
                            } else {
                                employees.push({
                                    employee_id: item.employee_id,
                                    employee_name: item.employee_name,
                                    targetTotal: Number(item.competency_target_value),
                                    realTotal: Number(item.competency_real_value)
                                })
                            }
                        })
                        const employeePercentageData = []
                        employees.forEach((employee) => {
                            if (((employee.realTotal / employee.targetTotal) * 100) < Number(formFilters.percentage)) {
                                employeePercentageData.push({
                                    employee_id: employee.employee_id,
                                    employee_name: employee.employee_name,
                                    percentage: (employee.realTotal / employee.targetTotal) * 100
                                })
                            }
                        })
                        setEmployeePercentages(employeePercentageData)
                        setIsLoading(false);
                    }
                    return (
                        VStack({ alignment: cTopLeading })(
                            HStack({ alignment: cLeading })(
                                ViewsMain.Title("Yetkinlik Durum İzleme Raporu").paddingTop("10px"),
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            HStack({ alignment: cTop })(
                                ReactView(
                                    <Views.Container>
                                        <form onSubmit={getReport}>
                                            <Views.SelectItems>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel>Polivalans Tablosu</InputLabel>
                                                    <Select
                                                        name="polyvalence_table_id"
                                                        label="Polivalans Tablosu"
                                                        size="small"
                                                        required
                                                        value={formFilters.polyvalence_table_id}
                                                        onChange={handleChangePolyvalenceTable}
                                                    >
                                                        {polyvalenceUnitList.map((item) => (
                                                            <MenuItem key={item.$id} value={item.$id}>
                                                                {item.polyvalence_table_name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel>Değerlendirme Dönemi</InputLabel>
                                                    <Select
                                                        name="evaluation_period"
                                                        label="Değerlendirme Dönemi"
                                                        size="small"
                                                        required
                                                        value={formFilters.evaluation_period}
                                                        onChange={(e: SelectChangeEvent) => {
                                                            setFormFilters({ ...formFilters, evaluation_period: e.target.value });
                                                        }}
                                                    >
                                                        {evaluationPeriod.map((item) => (
                                                            <MenuItem key={item.name} value={item.name}>
                                                                {item.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                <TextField
                                                    name="percentage"
                                                    label="Yüzdelik"
                                                    size="small"
                                                    required
                                                    type="number"
                                                    value={formFilters.percentage}
                                                    onChange={(e) => {
                                                        setFormFilters({ ...formFilters, percentage: e.target.value });
                                                    }}
                                                />
                                                <Tooltip title="Filtrele">
                                                    <IconButton type="submit">
                                                        <FilterAltOutlinedIcon />
                                                    </IconButton>
                                                </Tooltip>
                                            </Views.SelectItems>
                                        </form>
                                        <Views.List>
                                            {
                                                isLoading ?
                                                    <CircularProgress />
                                                    :
                                                    employeePercentages.map((item) => (
                                                        <Views.ListItem key={item.employee_id}>
                                                            <Views.ListEmployeeIcon>
                                                                <BsPersonCircle size={25} style={{ marginRight: 10 }} />
                                                            </Views.ListEmployeeIcon>
                                                            <Views.ListEmployeeName>
                                                                {item.employee_name}
                                                            </Views.ListEmployeeName>
                                                            <Views.ListEmployeePercentage>
                                                                <CircularProgressbar value={item.percentage} text={`${item.percentage}%`} />
                                                            </Views.ListEmployeePercentage>
                                                            <Views.ListEmployeeLink>
                                                                <Views.ListEmployeeLinkIcon>
                                                                    <RiExternalLinkFill size={25} cursor={"pointer"} onClick={(e)=> navigate('/app/employee-dashboard/view/' + item.employee_id)}/>
                                                                </Views.ListEmployeeLinkIcon>
                                                            </Views.ListEmployeeLink>
                                                        </Views.ListItem>
                                                    ))
                                            }
                                        </Views.List>
                                    </Views.Container >
                                )
                            )
                        ).padding("0 20px")
                    )
                })
        )
    }
}