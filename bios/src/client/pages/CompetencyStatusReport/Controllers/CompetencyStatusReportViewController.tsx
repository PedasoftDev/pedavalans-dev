import React, { useEffect, useState } from "react";
import { HStack, Spinner, ReactView, UIController, UIView, UIViewBuilder, VStack, cLeading, cTopLeading, cTop, useNavigate, UINavigate, State } from "@tuval/forms";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";
import { Views as ViewsMain } from "../../../components/Views";
import { Views } from "../Views/Views";
import { CircularProgress, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Autocomplete, TextField, Tooltip } from "@mui/material";
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
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import PolyvalenceUnitTableDataResponsible from "../../../../server/hooks/polyvalenceUnitTableDataResponsible/main";
import PolyvalenceUnitTableDataViewer from "../../../../server/hooks/polyvalenceUnitTableDataViewer/main";
import Parameters from "../../../../server/hooks/parameters/main";
import { Resources } from "../../../assets/Resources";
import IPolyvalenceUnit from "../../../interfaces/IPolyvalenceUnit";
import OrganizationStructureEmployee from "../../../../server/hooks/organizationStructureEmployee/main";
import IEmployeeDashboard from "../../../interfaces/IEmployeeDashboard";
import { setEmployeeDashboard } from "../../../features/employeeDashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectCompetencyStatusReport, setCompetencyStatusReport, setCompetencyStatusReportToNull } from "../../../features/competencyStatusReport";
import IAccountRelation from "../../../interfaces/IAccountRelation";
import OrganizationStructureWorkPlace from "../../../../server/hooks/organizationStructureWorkPlace/main";

const resetForm = {
    polyvalence_table_id: "",
    evaluation_period: "",
    percentage: "",
};

export class CompetencyStatusReportViewController extends UIController {
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

        const { me, isLoading } = useGetMe("console");
        const { dataResponsible, isLoadingDataResponsible } = PolyvalenceUnitTableDataResponsible.GetListByAccountId(me?.$id);
        const { dataViewer, isLoadingDataViewer } = PolyvalenceUnitTableDataViewer.GetListByAccountId(me?.$id);
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { parameters: tableAuth, isLoading: isLoadingTableAuth } = Parameters.GetParameterByName(Resources.ParameterLocalStr.polyvalence_unit_table_auth)
        const { periods, isLoading: isLoadingPeriod } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
        const navigate = useNavigate();

        const dispatch = useAppDispatch();
        const selector = useAppSelector;
        const setEmployeeDashboardToHook = (value: IEmployeeDashboard.IBase) => dispatch(setEmployeeDashboard(value));

        const setCompetencyStatusReportToHook = (value: any) => dispatch(setCompetencyStatusReport(value));
        const setCompetencyStatusReportNull = () => dispatch(setCompetencyStatusReportToNull());

        const competencyStatusReport: any = selector(selectCompetencyStatusReport);

        const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
        const [selectedWorkPlaceId, setSelectedWorkPlaceId] = useState<string>("");

        return (

            isLoading || this.polyvalenceUnitList == null || isLoadingWorkPlace || isLoadingPeriod || isLoadingResult || isLoadingDataResponsible || isLoadingDataViewer || isLoadingTableAuth ? VStack(Spinner()) :
                me == null ? UINavigate("/login") :
                    UIViewBuilder(() => {
                        // tablo, dönem, yüzdelik filtresi
                        const [formFilters, setFormFilters] = useState(resetForm);
                        const [evaluationPeriod, setEvaluationPeriod] = useState([]);
                        const [employeePercentages, setEmployeePercentages] = useState<{
                            employee_id: string,
                            employee_name: string,
                            percentage: number
                        }[]>([]);
                        const [isLoading, setIsLoading] = useState(false);
                        const [filteredPolyTable, setFilteredPolyTable] = useState<IPolyvalenceUnit.IPolyvalenceUnit[]>([]);

                        useEffect(() => {
                            if (competencyStatusReport !== null) {
                                handleChangePolyvalenceTable({ target: { value: competencyStatusReport.polyvalence_table_id } } as any)
                                setFormFilters({
                                    ...formFilters,
                                    polyvalence_table_id: competencyStatusReport.polyvalence_table_id,
                                    evaluation_period: competencyStatusReport.evaluation_period
                                })
                                setEmployeePercentages([])

                                setIsLoading(true);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.EmployeeCompetencyValue, [Query.limit(10000), Query.equal("polyvalence_table_id", competencyStatusReport.polyvalence_table_id), Query.equal("competency_evaluation_period", competencyStatusReport.evaluation_period),
                                Query.notEqual("competency_target_value", "no-target"), Query.notEqual("competency_real_value", "")]).then((res) => {
                                    const employeeCompetencyValues: IEmployeeCompetencyValue.IEmployeeCompetencyValue[] = res.documents as any[]
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
                                        employeePercentageData.push({
                                            employee_id: employee.employee_id,
                                            employee_name: employee.employee_name,
                                            percentage: (employee.realTotal / employee.targetTotal) * 100
                                        })
                                    })
                                    setEmployeePercentages(employeePercentageData.sort((a, b) => b.percentage - a.percentage))
                                    setIsLoading(false);
                                    setCompetencyStatusReportNull()
                                })
                            }
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
                        }, [])

                        const handleChangePolyvalenceTable = (e) => {
                            const selectedEvaluationFrequency = this.polyvalenceUnitList.find((item) => item.$id === e.target.value).polyvalence_evaluation_frequency
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
                            setCompetencyStatusReportToHook({
                                polyvalence_table_id: formFilters.polyvalence_table_id,
                                polycalence_table_name: this.polyvalenceUnitList.find((x) => x.$id === formFilters.polyvalence_table_id).polyvalence_table_name,
                                evaluation_period: formFilters.evaluation_period,
                                frequency: this.polyvalenceUnitList.find((x) => x.$id === formFilters.polyvalence_table_id).polyvalence_evaluation_frequency
                            })
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
                                employeePercentageData.push({
                                    employee_id: employee.employee_id,
                                    employee_name: employee.employee_name,
                                    percentage: (employee.realTotal / employee.targetTotal) * 100
                                })
                            })
                            setEmployeePercentages(employeePercentageData.sort((a, b) => b.percentage - a.percentage))
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
                                                            workPlaceDefination ? this.polyvalenceUnitList.filter((item) => item.work_place_id === selectedWorkPlaceId) : this.polyvalenceUnitList
                                                        }
                                                        value={this.polyvalenceUnitList.find((item) => item.$id === formFilters.polyvalence_table_id) || null}
                                                        onChange={(event, newValue) => {
                                                            const selectedEvaluationFrequency = newValue?.polyvalence_evaluation_frequency;
                                                            const periodYear = Number(periods[0].evaluation_period_year);
                                                            let evaluationPeriod = [];
                                                            switch (selectedEvaluationFrequency) {
                                                                case "Yıl":
                                                                    evaluationPeriod = getYearPeriods(periodYear);
                                                                    break;
                                                                case "Yarıyıl":
                                                                    evaluationPeriod = getHalfYearPeriods(periodYear);
                                                                    break;
                                                                case "Çeyrekyıl":
                                                                    evaluationPeriod = getQuarterYearPeriods(periodYear);
                                                                    break;
                                                                case "Ay":
                                                                    evaluationPeriod = getMonthPeriods(periodYear);
                                                                    break;
                                                                default:
                                                                    evaluationPeriod = [];
                                                                    break;
                                                            }
                                                            setEvaluationPeriod(evaluationPeriod);
                                                            setFormFilters({ ...formFilters, polyvalence_table_id: newValue?.$id || "" });
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
                                                    />
                                                    <Autocomplete
                                                        options={evaluationPeriod}
                                                        value={evaluationPeriod.find((item) => item.name === formFilters.evaluation_period) || null}
                                                        onChange={(event, newValue) => {
                                                            setFormFilters({ ...formFilters, evaluation_period: newValue?.name || "" });
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
                                                                    <CircularProgressbar value={item.percentage} text={`${item.percentage.toFixed(1)}%`} />
                                                                </Views.ListEmployeePercentage>
                                                                <Views.ListEmployeeLink>
                                                                    <Views.ListEmployeeLinkIcon>
                                                                        <RiExternalLinkFill size={25} cursor={"pointer"} onClick={(e) => {
                                                                            setEmployeeDashboardToHook({
                                                                                ...employees.find((employee) => employee.$id === item.employee_id),
                                                                                competency_evaluation_period: formFilters.evaluation_period,
                                                                                polyvalence_table_id: formFilters.polyvalence_table_id,
                                                                                frequency: this.polyvalenceUnitList.find((x) => x.$id === formFilters.polyvalence_table_id).polyvalence_evaluation_frequency
                                                                            })
                                                                            navigate('/app/employee-dashboard/view')
                                                                        }} />
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

