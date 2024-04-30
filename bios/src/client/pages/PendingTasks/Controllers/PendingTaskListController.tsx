import { HStack, ReactView, Spinner, State, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate, useState } from "@tuval/forms";
import React, { useEffect } from "react";
import { Views } from "../../../components/Views";
import { Box, Grid } from "@mui/material";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { ExpandIconRight, List, ListElement, TaskCard, TaskCardHeader, TaskCardSubHeader } from "../Views/Views";
import { Query, Services, useGetMe } from "@realmocean/sdk";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import IAssignedEducation from "../../../interfaces/IAssignedEducation";
import AssignEducation from "../../../../server/hooks/assignEducation/main";
import IAccountRelation from "../../../interfaces/IAccountRelation";
import { Resources } from "../../../assets/Resources";
import IPolyvalenceUnit from "../../../interfaces/IPolyvalenceUnit";
import CompetencyEvaluationPeriod from "../../../../server/hooks/competencyEvaluationPeriod/main";
import EmployeeCompetencyValue from "../../../../server/hooks/EmployeeCompetencyValue/main";
import AccountRelation from "../../../../server/hooks/accountRelation/main";
import { MdOutlineFindInPage } from "react-icons/md";

import { useAppSelector, useAppDispatch } from "../../../hooks";
import { setAssignEducation } from "../../../features/assignEducation";
import getPeriodFromCurrentDate from "../../../assets/Functions/getPeriodFromCurrentDate";
import { IOrganizationStructure } from "../../../interfaces/IOrganizationStructure";
import ICompetency from "../../../interfaces/ICompetency";
import ICompetencyDepartment from "../../../interfaces/ICompetencyDepartment";
import PolyvalenceUnit from "../../../../server/hooks/polyvalenceUnit/main";




export class PendingTaskListController extends UIController {

    @State()
    private polyvalenceTables: IPolyvalenceUnit.IPolyvalenceUnit[];

    @State()
    private isLoading: boolean;


    protected BindRouterParams(): void {
        this.isLoading = true;
        Services.Accounts.get().then((me) => {
            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.Parameter, [Query.limit(10000), Query.equal("name", Resources.ParameterLocalStr.polyvalence_unit_table_auth), Query.equal("tenant_id", me?.prefs?.organization)]).then((parameter) => {
                if (parameter && parameter.documents[0] && parameter.documents[0]?.is_active) {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AccountRelation, [Query.limit(10000), Query.equal("account_id", me.$id)]).then((accountRelation: any) => {

                        const accountRelationData: IAccountRelation.IBase = accountRelation.documents[0];
                        if (accountRelationData.is_admin || accountRelationData.authorization_profile === "admin") {
                            // burası
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                this.polyvalenceTables = unitTables.documents as any;
                                this.isLoading = false;
                            })
                        } else if (accountRelationData.authorization_profile === "responsible") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible, [Query.limit(10000), Query.equal("responsible_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                const responsibleTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                    this.polyvalenceTables = unitTables.documents.filter((x) => responsibleTableIds.includes(x.polyvalence_table_id)) as any;
                                    this.isLoading = false;
                                })
                            })
                        }
                    })
                } else {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
                        this.polyvalenceTables = unitTables.documents as any;
                        this.isLoading = false;
                    })
                }
            })
        })
    }

    public LoadView(): UIView {

        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const navigate = useNavigate();

        // global state
        const dispatch = useAppDispatch();
        const setAssignEducationToHook = (value: IAssignedEducation.IBase) => dispatch(setAssignEducation(value));

        const { assignedEducationList, isLoadingAssignedEducationList, totalAssignedEducation } = AssignEducation.GetOpenListByEducator(me?.$id);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriodWithoutTenant();
        const { listEmployeeCompetencyValue, isLoadingListEmployeeCompetencyValue } = EmployeeCompetencyValue.List();


        return (
            this.isLoading || !this.polyvalenceTables || isLoading || isLoadingAssignedEducationList || isLoadingPeriods || isLoadingListEmployeeCompetencyValue || isLoadingResult ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [isOpen, setIsOpen] = useState(-1);

                    const [pendingTasks, setPendingTasks] = useState([
                        {
                            title: "Bekleyen Değerlendirmeler",
                            value: 0,
                            view:
                                <List>

                                </List>
                        },
                        {
                            title: "Bekleyen Eğitimler",
                            value: totalAssignedEducation,
                            view:
                                <List>
                                    {assignedEducationList.map((task: IAssignedEducation.IBase) => (
                                        <ListElement>
                                            <p>{`${task.education_name} - ${task.employee_name}`}</p>
                                        </ListElement>
                                    ))}
                                </List>
                        }
                    ]);

                    const handleClickAssignedEducation = (assignedEducation: IAssignedEducation.IBase) => {
                        navigate("/app/education/assigned");
                        setAssignEducationToHook(assignedEducation);
                    }

                    useEffect(() => {
                        const pendingDataEntry = async () => {

                            const anyValueNotEnteredPolyvalenceTables: {
                                polyvalence_table_name: string,
                                polyvalence_table_id: string,
                                number_of_employee_x_competency: number,
                                evaluation_period: string
                            }[] = [];

                            const onlyEnteredTargetValues: {
                                polyvalence_table_name: string,
                                polyvalence_table_id: string,
                                number_of_employee_x_competency: number,
                                evaluation_period: string
                            }[] = [];

                            this.polyvalenceTables.forEach(async (polyTable: IPolyvalenceUnit.IPolyvalenceUnit, index) => {
                                const query = [Query.limit(10000), Query.equal("is_deleted", false), Query.equal("is_active", true)];
                                const employees: IOrganizationStructure.IEmployees.IEmployee[] = await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.OrganizationStructureEmployee,
                                    [...query, Query.equal("department_id", polyTable.polyvalence_department_id)]).then(x => x.documents as any);
                                const competencyDepartmentRelation: ICompetencyDepartment.ICompetencyDepartment[] = await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.CompetencyDepartment,
                                    [...query, Query.equal("competency_department_id", polyTable.polyvalence_department_id)]).then(x => x.documents as any);
                                const evaluationFrequency = getPeriodFromCurrentDate(periods[0].evaluation_period_year, polyTable.polyvalence_evaluation_frequency);

                                const periodEnteredValues = listEmployeeCompetencyValue.filter((x) =>
                                    x.polyvalence_table_id === polyTable.polyvalence_table_id && x.competency_evaluation_period === evaluationFrequency
                                );

                                let enteredOnlyTargetValues: number = 0;
                                periodEnteredValues.forEach((item) => {
                                    if (item.competency_target_value != null && item.competency_target_value != "no-target" && item.competency_real_value === "") {
                                        enteredOnlyTargetValues++;
                                    }
                                })

                                if (enteredOnlyTargetValues != 0) {
                                    onlyEnteredTargetValues.push({
                                        polyvalence_table_name: polyTable.polyvalence_table_name,
                                        polyvalence_table_id: polyTable.polyvalence_table_id,
                                        number_of_employee_x_competency: enteredOnlyTargetValues,
                                        evaluation_period: evaluationFrequency
                                    })
                                }

                                if (employees.length * competencyDepartmentRelation.length - periodEnteredValues.length != 0) {
                                    anyValueNotEnteredPolyvalenceTables.push({
                                        polyvalence_table_name: polyTable.polyvalence_table_name,
                                        polyvalence_table_id: polyTable.polyvalence_table_id,
                                        number_of_employee_x_competency: employees.length * competencyDepartmentRelation.length - periodEnteredValues.length,
                                        evaluation_period: evaluationFrequency
                                    })
                                }

                                if (this.polyvalenceTables.length - 1 === index) {

                                    let totalValue = 0
                                    anyValueNotEnteredPolyvalenceTables.forEach((item) => {
                                        totalValue += item.number_of_employee_x_competency
                                    })
                                    onlyEnteredTargetValues.forEach((item) => {
                                        totalValue += item.number_of_employee_x_competency
                                    })
                                    // need to configure
                                    setPendingTasks((prev) => {
                                        prev[0].value = totalValue
                                        prev[0].view =
                                            <div>
                                                <List>
                                                    {anyValueNotEnteredPolyvalenceTables.map((task: any) => (
                                                        <ListElement>
                                                            <p>{`${task.polyvalence_table_name} - ${task.evaluation_period}`}</p>
                                                        </ListElement>
                                                    ))}
                                                </List>
                                                <List>
                                                    {onlyEnteredTargetValues.map((task: any) => (
                                                        <ListElement>
                                                            <p>{`${task.polyvalence_table_name} - ${task.evaluation_period}`}</p>
                                                        </ListElement>
                                                    ))}
                                                </List>
                                            </div>
                                        return [...prev];
                                    })
                                }

                            })
                        }

                        const getPendingTasks = async () => {
                            const queriesAssignedEducation = [Query.limit(10000), Query.equal("status", "open")]
                            if (!accountRelations[0].is_admin && accountRelations[0].authorization_profile !== "admin") {
                                queriesAssignedEducation.push(Query.equal("educator_id", me?.$id))
                            }
                            const assignedEducationsOpen: IAssignedEducation.IBase[] = await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation, queriesAssignedEducation).then(x => x.documents as any);
                            setPendingTasks((prev) => {
                                prev[1].value = assignedEducationsOpen.length;
                                prev[1].view =
                                    <List>
                                        {assignedEducationList.map((task: IAssignedEducation.IBase, i) => (
                                            <ListElement onClick={() => handleClickAssignedEducation(task)} key={i}>
                                                <MdOutlineFindInPage size={20} />
                                                <p>{`${task.education_name} - ${task.employee_name}`}</p>
                                            </ListElement>
                                        ))}
                                    </List>
                                return [...prev];
                            });
                        }

                        getPendingTasks();
                        pendingDataEntry();


                        // const waitingTargets = []
                        // listEmployeeCompetencyValue.forEach((item) => {
                        //     if (this.polyvalenceTables.find((x) => x.polyvalence_table_id === item.polyvalence_table_id)
                        //         //   && item.competency_evaluation_period.includes(periods[0].evaluation_period_year)
                        //         && item.competency_target_value != null && item.competency_target_value != "no-target"
                        //     ) {
                        //         waitingTargets.push(item)
                        //     }
                        // })

                        // pendingTasks[0].value = waitingTargets.length,
                        //     pendingTasks[0].view =
                        //     <List>
                        //         {waitingTargets.map((task: any) => (
                        //             <ListElement>
                        //                 <p>{`${task.employee_name} - ${task.competency_name}`}</p>
                        //             </ListElement>
                        //         ))}
                        //     </List>
                        // setPendingTasks([...pendingTasks])
                    }, [])



                    return (
                        VStack({ spacing: 15, alignment: cTopLeading })(
                            HStack({ alignment: cLeading })(
                                Views.Title("Bekleyen Görevler").paddingTop("10px")
                            ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                            HStack({ alignment: cTop })(
                                ReactView(
                                    <Box sx={{ flexGrow: 1, padding: "16px" }}>
                                        <Grid container spacing={2}>
                                            {pendingTasks.map((item, index) => (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                                                    <TaskCard
                                                        onClick={() => {
                                                            if (isOpen == index) {
                                                                setIsOpen(-1);
                                                            } else {
                                                                setIsOpen(index);
                                                            }
                                                        }}
                                                    >
                                                        <TaskCardHeader>{item.title}</TaskCardHeader>
                                                        <TaskCardSubHeader>{item.value}</TaskCardSubHeader>
                                                        {isOpen != index && <ExpandIconRight><CgArrowsExpandLeft /></ExpandIconRight>}
                                                        {isOpen == index && (
                                                            item.view
                                                        )}
                                                    </TaskCard>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )
                            )
                        ).padding("0 20px")
                    )
                })
        )

    }
}