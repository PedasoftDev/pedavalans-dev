import { HStack, ReactView, Spinner, State, UIController, UIView, UIViewBuilder, VStack, cLeading, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Container, LeftContainer, LeftContainerContent, LeftContainerContentItem, LeftContainerHeader, RightContainer, RightContainerHeader } from "../../CompetencyTargetDataEntry/Views/View";
import { Views } from "../../../components/Views";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Toast } from "../../../components/Toast";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import { Autocomplete, Button, IconButton, SelectChangeEvent, TextField, Tooltip as TooltipMUI } from "@mui/material";
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
import AppInfo from "../../../../AppInfo";
import { BiConfused, BiHappy, BiSad, BiSmile } from "react-icons/bi";
import IAccountRelation from "../../../interfaces/IAccountRelation";
import Collections from "../../../../server/core/Collections";
import { Resources } from "../../../assets/Resources";
import { Legend, PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';
import { SiMicrosoftexcel } from "react-icons/si";
import { getReportToExcelByEmployee } from "../../../assets/Functions/getReportToExcelByEmployee";
import OrganizationStructureWorkPlace from "../../../../server/hooks/organizationStructureWorkPlace/main";
import PolyvalenceUnitTableLineRelation from "../../../../server/hooks/polyvalenceUnitTableLineRelation/main";
import EmployeeMultipleLines from "../../../../server/hooks/employeeMultipleLines/Main";
import CompetencyLineRelation from "../../../../server/hooks/competencyLineRelation/main";
import EmployeeMultipleDepartments from "../../../../server/hooks/employeeMultipleDepartments/Main";

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

interface IData extends ICompetency.ICompetency {
    employee_id: string;
    employee_name: string;
    polyvalence_table_id: string;
    polyvalence_table_name: string;
    competency_evaluation_period: string;
    competency_department_id: string;
    competency_department_name: string;
    competency_target_value: string;
    competency_real_value: string;
    competency_value_desc: string;
}

export class CompetencyReportDataViewController extends UIController {

    @State()
    private polyvalenceUnitList: IPolyvalenceUnit.IPolyvalenceUnit[];

    protected BindRouterParams(): void {
        Services.Accounts.get().then((me) => {
            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.limit(10000), Query.equal("name", Resources.ParameterLocalStr.polyvalence_unit_table_auth), Query.equal("tenant_id", me?.prefs?.organization)]).then((parameter) => {
                if (parameter && parameter.documents[0] && parameter.documents[0]?.is_active) {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, [Query.limit(10000), Query.equal("account_id", me.$id)]).then((accountRelation: any) => {

                        const accountRelationData: IAccountRelation.IBase = accountRelation.documents[0];
                        if (accountRelationData.is_admin || accountRelationData.authorization_profile === "admin") {
                            // burası
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
                        else {
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

        const navigate = useNavigate();
        const { me, isLoading } = useGetMe("console");
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriod(me?.prefs?.organization);
        const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization);
        const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);
        const { competencyDepartments } = CompetencyDepartment.GetByDepartmentId(selectedTable.polyvalence_department_id);
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { lineRelation, isLoading: isLoadingLineRelation } = PolyvalenceUnitTableLineRelation.GetByPolyvalenceUnitId(selectedTable.polyvalence_table_id, me?.prefs?.organization);
        const { employeeMultipleLinesList, isLoading: isLoadingEmployeeMultipleLine } = EmployeeMultipleLines.GetList()
        const { competencyLineRelationList, isLoading: isLoadingCompetencyLineRelation } = CompetencyLineRelation.GetList();
        const { employeeMultipleDepartmentsList, isLoading: isLoadingMultipleDepartmentsList } = EmployeeMultipleDepartments.GetList()

        // workplace 
        const { workPlaces, isLoadingWorkPlace } = OrganizationStructureWorkPlace.GetList(me?.prefs?.organization);
        const [workPlaceDefination, setWorkPlaceDefination] = useState<boolean>(false);
        const [selectedWorkPlaceId, setSelectedWorkPlaceId] = useState<string>("");
        //
        const [lineBasedCompetencyRelationship, setLineBasedCompetencyRelationship] = useState<boolean>(false);
        const [departmentBasedCompetencyRelationship, setDepartmentBasedCompetencyRelationship] = useState<boolean>(false);



        return (
            isLoading || this.polyvalenceUnitList == null || isLoadingWorkPlace || isLoadingMultipleDepartmentsList || isLoadingLineRelation || isLoadingEmployeeMultipleLine || isLoadingCompetencyLineRelation || isLoadingPeriods || isLoadingEmployees || isLoadingGroups || isLoadingCompetencyList ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                    const [selectedGroupId, setSelectedGroupId] = useState<string>("");
                    const [selectedCompetencyList, setSelectedCompetencyList] = useState<IData[]>([]);

                    // radar=true or table=false
                    const [isRadar, setIsRadar] = useState<boolean>(false);


                    // radar data
                    const [radarData, setRadarData] = useState<{ name: string, target: number, real: number }[]>([]);

                    const onChangeTable = (e: SelectChangeEvent<string>) => {
                        const table = this.polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === e.target.value);
                        const periodYear = Number(periods[0].evaluation_period_year);
                        setSelectedTable(table)
                        setSelectedPeriod("")
                        setSelectedEmployeeId("")
                        setSelectedGroupId("")
                        setSelectedCompetencyList([])
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
                                <TooltipMUI title={params.row.competency_description}>
                                    {params.value}
                                </TooltipMUI>
                        },
                        {
                            field: "competency_target_value", headerName: "Hedef Değer", align: "center", headerAlign: "center", width: 150, minWidth: 150,
                            valueGetter: (params) => {
                                return params.value === "no-target" ? "Hedefi Yok" : params.value;
                            }
                        },
                        { field: "competency_real_value", headerName: "Gerçekleşen Değer", align: "center", headerAlign: "center", width: 150, minWidth: 150 },
                        {
                            field: "value", headerName: "Dönem Ortalaması", width: 150, minWidth: 150,
                            align: "center", headerAlign: "center",
                            renderCell: (params) => {
                                let average = params.row.competency_real_value / params.row.competency_target_value * 100;
                                let averageIcon: React.ReactNode = "";
                                switch (true) {
                                    case (average < 20):
                                        averageIcon = <BiSad color="red" />;
                                        break;
                                    case (average >= 20 && average < 40):
                                        averageIcon = <BiSad color="orange" />;
                                        break;
                                    case (average >= 40 && average < 60):
                                        averageIcon = <BiConfused color="yellow" />;
                                        break;
                                    case (average >= 60 && average < 80):
                                        averageIcon = <BiSmile color="green" />;
                                        break;
                                    case (average >= 80):
                                        averageIcon = <BiHappy color="green" />;
                                        break;
                                    default:
                                        averageIcon = "";
                                }
                                if (isNaN(average)) {
                                    average = 0;
                                }
                                return <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center", width: "100px", background: "#c7c7c7", padding: "10px", borderRadius: "10px" }}>
                                    <div style={{ fontSize: "20px" }}>{averageIcon}</div>
                                    <div style={{ marginLeft: "5px", fontSize: "14px" }}>{average.toFixed(2)}%</div>
                                </div>;
                            }
                        },
                    ];

                    const getCompetencies = async (employee_id: string) => {
                        setRadarData([]);
                        const selectedEmployeeInfo = employees.find((employee) => employee.$id === employee_id);
                        const appendToSelectedCompetencyList = [];
                        await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, "employee_competency_value",
                            [
                                Query.equal("employee_id", employee_id), Query.equal("competency_evaluation_period", selectedPeriod),
                                Query.equal("polyvalence_table_id", selectedTable.polyvalence_table_id), Query.equal("is_deleted_competency_value", false),
                                Query.equal("tenant_id", me?.prefs?.organization),
                                Query.limit(10000)
                            ]).then((res) => {
                                competencyList.forEach((competency) => {
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
                                const setRadarDataValues = []
                                appendToSelectedCompetencyList.forEach((competency) => {
                                    if (competency.competency_target_value !== "no-target") {
                                        setRadarDataValues.push({
                                            name: competency.competency_name,
                                            target: competency.competency_target_value,
                                            real: competency.competency_real_value
                                        })
                                    }
                                })
                                setRadarData(setRadarDataValues)
                            })
                        setSelectedCompetencyList(appendToSelectedCompetencyList);
                    }

                    const truncateText = (text, maxLength) => {
                        if (text.length > maxLength) {
                            return text.substring(0, maxLength - 3) + '...';
                        }
                        return text;
                    };


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
                        }).then(() => {
                            Services.Databases.listDocuments(
                                AppInfo.Name,
                                AppInfo.Database,
                                Collections.Parameter,
                                [
                                    Query.equal("name", "multiple_department_definition"),
                                    Query.limit(10000)
                                ]
                            ).then((res) => {
                                setDepartmentBasedCompetencyRelationship(res.documents[0]?.is_active)
                            })
                        })
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
                                                    setSelectedTable(newValue);
                                                    setSelectedPeriod("");
                                                    setSelectedEmployeeId("");
                                                    setSelectedGroupId("");
                                                    setSelectedCompetencyList([]);
                                                    const table = this.polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === newValue?.polyvalence_table_id);
                                                    const periodYear = Number(periods[0].evaluation_period_year);
                                                    if (table?.polyvalence_evaluation_frequency == "Yıl") {
                                                        setDataYear(getYearPeriods(periodYear));
                                                    } else if (table?.polyvalence_evaluation_frequency == "Yarıyıl") {
                                                        setDataYear(getHalfYearPeriods(periodYear));
                                                    } else if (table?.polyvalence_evaluation_frequency == "Çeyrekyıl") {
                                                        setDataYear(getQuarterYearPeriods(periodYear));
                                                    } else if (table?.polyvalence_evaluation_frequency == "Ay") {
                                                        setDataYear(getMonthPeriods(periodYear));
                                                    }
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
                                                value={dataYear.find((year) => year.name === selectedPeriod) || null}
                                                onChange={(event, newValue) => {
                                                    setSelectedPeriod(newValue?.name || "");
                                                    setSelectedEmployeeId("");
                                                    setSelectedGroupId("");
                                                    setSelectedCompetencyList([]);
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
                                                {(() => {
                                                    if (lineBasedCompetencyRelationship) {
                                                        return employeeMultipleLinesList
                                                            .filter((item) => item.line_id === lineRelation[0].line_id)
                                                            .filter((item) => employees.some((x) => x.$id === item.employee_id))
                                                            .map((employeeItem, i) => {
                                                                const employee = employees.find((x) => x.$id === employeeItem.employee_id);
                                                                console.log('EmployeeItem:', employeeItem);
                                                                console.log('Found Employee:', employee);

                                                                if (!employee) return null; // Eğer çalışan bulunamazsa

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
                                                            });
                                                    } else if (departmentBasedCompetencyRelationship) {
                                                        return employeeMultipleDepartmentsList
                                                            .filter((item) => item.department_id === selectedTable.polyvalence_department_id)
                                                            .filter((item) => employees.some((x) => x.$id === item.employee_id))
                                                            .map((employeeItem, i) => {
                                                                const employee = employees.find((x) => x.$id === employeeItem.employee_id);
                                                                console.log('EmployeeItem:', employeeItem);
                                                                console.log('Found Employee:', employee);

                                                                if (!employee) return null; // Eğer çalışan bulunamazsa

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
                                                            });
                                                    }
                                                    else {
                                                        return employees
                                                            .filter((employee) => employee.department_id === selectedTable.polyvalence_department_id)
                                                            .filter((employee) => employee.is_active)
                                                            .sort((a, b) => a.first_name.localeCompare(b.first_name))
                                                            .map((employee, i) => (
                                                                <LeftContainerContentItem
                                                                    key={employee.id}
                                                                    selected={selectedEmployeeId === employee.$id}
                                                                    onClick={() => selectEmployee(employee.$id)}
                                                                >
                                                                    <IoPersonCircleOutline size={25} {...(selectedEmployeeId === employee.$id && { color: "#3BA2EE" })} />
                                                                    {employee.first_name} {employee.last_name}
                                                                </LeftContainerContentItem>
                                                            ));
                                                    }
                                                })()}
                                                {/* {
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
                                                } */}
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
                                                <Button variant="outlined" onClick={() => setIsRadar(!isRadar)}>
                                                    {isRadar ? "Tablo" : "Grafik"}
                                                </Button>
                                                <IconButton onClick={() => {
                                                    const employee = employees.find((employee) => employee.$id === selectedEmployeeId);
                                                    const employeeName = `${employee?.first_name} ${employee?.last_name}`;
                                                    getReportToExcelByEmployee(employeeName, selectedCompetencyList)
                                                }}>
                                                    <SiMicrosoftexcel />
                                                </IconButton>
                                            </RightContainerHeader>
                                            <div style={{
                                                height: "calc(100vh - 120px)",
                                                width: "100%",
                                                padding: "0 20px",
                                                display: "flex",
                                                justifyContent: "center",
                                            }}>
                                                {isRadar ?
                                                    <div style={{ width: "100%", height: "80%", display: "flex", justifyContent: "center" }}>
                                                        <ResponsiveContainer width="100%" height="100%">
                                                            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                                                <PolarGrid />
                                                                <PolarAngleAxis dataKey={"name"}
                                                                    tickFormatter={(value) => truncateText(value, 30)}
                                                                />
                                                                <Radar name="Hedef" dataKey="target" stroke="#00008B" fill="#00008B" fillOpacity={0.6} />
                                                                <Radar name="Gerçekleşen" dataKey="real" stroke="#7FFF00" fill="#7FFF00" fillOpacity={0.6} />
                                                                <Tooltip />
                                                                <Legend />
                                                            </RadarChart>
                                                        </ResponsiveContainer>
                                                    </div>
                                                    : <StyledDataGrid

                                                        columns={columns}
                                                        rows={(() => {
                                                            if (lineBasedCompetencyRelationship) {
                                                                return competencyLineRelationList
                                                                    .filter((item) => item.line_id === lineRelation[0].line_id)
                                                                    .filter((item) => selectedCompetencyList.some((x) => x.competency_id === item.competency_id))
                                                                    .map((relation) => selectedCompetencyList.find((x) => x.competency_id === relation.competency_id))
                                                            } else if (departmentBasedCompetencyRelationship) {
                                                                return selectedCompetencyList.filter((competency) => selectedGroupId === "" ? true : competency.competency_group_id === selectedGroupId)
                                                            }
                                                            else {
                                                                return selectedGroupId ? selectedCompetencyList.filter((competency) => competency.competency_group_id === selectedGroupId) : selectedCompetencyList

                                                            }
                                                        })()
                                                        }

                                                        getRowId={(row) => row.competency_id}
                                                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                                    />
                                                }
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