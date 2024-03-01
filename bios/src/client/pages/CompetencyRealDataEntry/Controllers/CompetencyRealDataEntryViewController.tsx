import { HStack, ReactView, Spinner, State, UIController, UIView, UIViewBuilder, VStack, cLeading, nanoid, useNavigate } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import { Container, LeftContainer, LeftContainerContent, LeftContainerContentItem, LeftContainerHeader, RightContainer, RightContainerHeader } from "../../CompetencyTargetDataEntry/Views/View";
import { Views } from "../../../components/Views";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import { Toast } from "../../../components/Toast";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
import { TbPencilPlus } from "react-icons/tb";
import Collections from "../../../../server/core/Collections";
import { Resources } from "../../../assets/Resources";
import IAccountRelation from "../../../interfaces/IAccountRelation";

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

export class CompetencyRealDataEntryViewController extends UIController {

    @State()
    private polyvalenceUnitList: IPolyvalenceUnit.IPolyvalenceUnit[] = [];

    protected BindRouterParams(): void {
        Services.Accounts.get().then((me) => {
            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.equal("name", Resources.ParameterLocalStr.polyvalence_unit_table_auth), Query.equal("tenant_id", me?.prefs?.organization)]).then((parameter) => {
                if (parameter && parameter.documents[0] && parameter.documents[0]?.is_active) {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, [Query.equal("account_id", me.$id)]).then((accountRelation: any) => {

                        const accountRelationData: IAccountRelation.IBase = accountRelation.documents[0];
                        if (accountRelationData.is_admin || accountRelationData.authorization_profile === "admin") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                this.polyvalenceUnitList = unitTables.documents as any
                            })
                        } else if (accountRelationData.authorization_profile === "responsible") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible, [Query.equal("responsible_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                const responsibleTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                    this.polyvalenceUnitList = unitTables.documents.filter((x) => responsibleTableIds.includes(x.polyvalence_table_id)) as any
                                })
                            })
                        }
                        else if (accountRelationData.authorization_profile === "viewer") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer, [Query.equal("viewer_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                const viewerTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
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
        const { competencyGradeValueList, isLoadingCompetencyGradeValueList } = CompetencyGradeValue.GetList(me?.prefs?.organization);
        const { competencyDepartments } = CompetencyDepartment.GetByDepartmentId(selectedTable.polyvalence_department_id);
        const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization);
        const { createEmployeeCompetencyValue } = EmployeeCompetencyValue.Create();
        const { updateEmployeeCompetencyValue } = EmployeeCompetencyValue.Update();


        return (
            isLoading || this.polyvalenceUnitList == null || isLoadingPeriods || isLoadingEmployees || isLoadingGroups || isLoadingCompetencyGradeValueList || isLoadingCompetencyList ? VStack(Spinner()) :
                UIViewBuilder(() => {

                    const [dataYear, setDataYear] = useState<{ name: string }[]>([]);
                    const [selectedGroupId, setSelectedGroupId] = useState<string>("");
                    const [selectedCompetencyList, setSelectedCompetencyList] = useState<ICompetency.ICompetency[]>([]);
                    const [employeeCompetencyValue, setEmployeeCompetencyValue] = useState<IEmployeeCompetencyValue.IEmployeeCompetencyValue[]>([]);

                    // MUI Dialog
                    const [openDialog, setOpenDialog] = useState(false);
                    const [description, setDescription] = useState("");
                    const [selectedCompetencyId, setSelectedCompetencyId] = useState("");

                    const handleClickOpenDialog = (description: string, competency_id: string) => {
                        const alreadyExist = employeeCompetencyValue.find((value) => value.competency_id === competency_id);
                        if (alreadyExist && alreadyExist?.competency_real_value) {
                            setDescription(description);
                            setSelectedCompetencyId(competency_id)
                            setOpenDialog(true);
                        } else {
                            Toast.fire({
                                icon: "warning",
                                text: "Bu yetkinlik için bir gerçekleşme değeri girilmemiştir.",
                                titleText: "Lütfen önce değer giriniz."
                            })
                            return;
                        }
                    };

                    const handleCloseDialog = () => {
                        setOpenDialog(false);
                        setDescription("");
                        setSelectedCompetencyId("");
                    };

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

                    const handleSubmitDialog = (e) => {
                        e.preventDefault();

                        if (description === "") {
                            Toast.fire({
                                icon: "warning",
                                title: "Açıklama boş bırakılamaz."
                            })
                            return;
                        }
                        const alreadyExist = employeeCompetencyValue.find((value) => value.competency_id === selectedCompetencyId);
                        updateEmployeeCompetencyValue({
                            databaseId: AppInfo.Database,
                            collectionId: "employee_competency_value",
                            documentId: alreadyExist?.employee_competency_value_id,
                            data: {
                                ...removeDollarProperties(alreadyExist),
                                competency_value_desc: description,
                            }
                        }, () => {
                            Toast.fire({
                                icon: "success",
                                title: "Açıklama güncellendi.",
                                timer: 1000
                            })
                            setSelectedCompetencyList(selectedCompetencyList.map((competency) => {
                                if (competency.competency_id === selectedCompetencyId) {
                                    return {
                                        ...competency,
                                        competency_value_desc: description,
                                    }
                                }
                                return competency;
                            }));
                            setEmployeeCompetencyValue(employeeCompetencyValue.map((value) => {
                                if (value.competency_id === selectedCompetencyId) {
                                    return {
                                        ...value,
                                        competency_value_desc: description,
                                    }
                                }
                                return value;
                            }));
                        })

                        handleCloseDialog();
                    }

                    const columns: GridColDef[] = [
                        { field: "competency_name", headerName: "Yetkinlik Adı", flex: 1 },
                        { field: "competency_target_value", headerName: "Hedef Değer", align: "center", width: 100, minWidth: 100 },
                        {
                            field: "competency_real_value", headerName: "Gerçekleşme Değeri", width: 150, minWidth: 150,
                            renderCell: (params) => (
                                <FormControl fullWidth size="small">
                                    <Select
                                        name="competency_real_value"
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
                                                        competency_real_value: e.target.value,
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
                                                                competency_real_value: e.target.value,
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
                                                    competency_target_value: "",
                                                    competency_real_value: e.target.value,
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
                                                        competency_real_value: e.target.value,
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
                        {
                            field: "competency_value_desc", headerName: "Açıklama", width: 100, minWidth: 100,
                            renderCell: (params) => (
                                <Button variant="text" fullWidth onClick={() => {
                                    handleClickOpenDialog(params.row.competency_value_desc, params.row.competency_id)
                                }}>
                                    <TbPencilPlus size={20} color="#3BA2EE" />
                                </Button>
                            )
                        }
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
                                Views.Title("Yetkinlik Değerlendirme Girişi").paddingTop("10px")
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
                                    <Dialog
                                        open={openDialog}
                                        onClose={handleCloseDialog}>
                                        <form onSubmit={handleSubmitDialog} style={{ width: "400px" }}>
                                            <DialogTitle>Açıklama Giriniz</DialogTitle>
                                            <DialogContent>
                                                <TextField
                                                    rows={4}
                                                    multiline
                                                    fullWidth
                                                    variant="outlined"
                                                    required
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </DialogContent>
                                            <DialogActions>
                                                <Button onClick={handleCloseDialog}>İptal</Button>
                                                <Button type="submit">Açıklamayı Kaydet</Button>
                                            </DialogActions>
                                        </form>
                                    </Dialog>
                                </Container>
                            )
                        ).padding("0 20px")
                    )
                })
        )
    }
}