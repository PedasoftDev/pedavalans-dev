import { HStack, ReactView, Spinner, State, UIController, UIView, UIViewBuilder, VStack, cLeading, nanoid, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Container, LeftContainer, LeftContainerContent, LeftContainerContentItem, LeftContainerHeader, RightContainer, RightContainerHeader } from "../../CompetencyTargetDataEntry/Views/View";
import { Views } from "../../../components/Views";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Toast } from "../../../components/Toast";
import { Query, Services, useGetMe } from "@realmocean/sdk";
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
import Competency from "../../../../server/hooks/competency/main";
import ICompetency from "../../../interfaces/ICompetency";
import CompetencyDepartment from "../../../../server/hooks/competencyDepartment/main";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";
import EmployeeCompetencyValue from "../../../../server/hooks/EmployeeCompetencyValue/main";
import AppInfo from "../../../../AppInfo";
import { MdMood } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { BiConfused, BiHappy, BiSad, BiSmile } from "react-icons/bi";
import IAccountRelation from "../../../interfaces/IAccountRelation";
import Collections from "../../../../server/core/Collections";
import { Resources } from "../../../assets/Resources";

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

export class CompetencyReportDataViewController extends UIController {

    @State()
    private polyvalenceUnitList: IPolyvalenceUnit.IPolyvalenceUnit[];

    protected BindRouterParams(): void {
        Services.Accounts.get().then((me) => {
            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.equal("name", Resources.ParameterLocalStr.polyvalence_unit_table_auth), Query.equal("tenant_id", me?.prefs?.organization)]).then((parameter) => {
                if (parameter && parameter.documents[0] && parameter.documents[0]?.is_active) {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, [Query.equal("account_id", me.$id)]).then((accountRelation: any) => {

                        const accountRelationData: IAccountRelation.IBase = accountRelation.documents[0];
                        if (accountRelationData.is_admin || accountRelationData.authorization_profile === "admin" || accountRelationData.authorization_profile === "responsible") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
                                this.polyvalenceUnitList = unitTables.documents as any
                            })
                        } else {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer, [Query.equal("viewer_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                const viewerTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
                                    this.polyvalenceUnitList = unitTables.documents.filter((x) => viewerTableIds.includes(x.polyvalence_table_id)) as any
                                })
                            })
                        }
                    })
                } else {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
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


        return (
            isLoading || this.polyvalenceUnitList == null || isLoadingPeriods || isLoadingEmployees || isLoadingGroups || isLoadingCompetencyList ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                    const [selectedGroupId, setSelectedGroupId] = useState<string>("");
                    const [selectedCompetencyList, setSelectedCompetencyList] = useState<ICompetency.ICompetency[]>([]);
                    const [employeeCompetencyValue, setEmployeeCompetencyValue] = useState<IEmployeeCompetencyValue.IEmployeeCompetencyValue[]>([]);

                    const onChangeTable = (e: SelectChangeEvent<string>) => {
                        const table = this.polyvalenceUnitList.find((unit) => unit.polyvalence_table_id === e.target.value);
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
                        { field: "competency_target_value", headerName: "Hedef Değer", align: "center", headerAlign: "center", width: 150, minWidth: 150 },
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
                                                    {this.polyvalenceUnitList.map((unit) => (
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