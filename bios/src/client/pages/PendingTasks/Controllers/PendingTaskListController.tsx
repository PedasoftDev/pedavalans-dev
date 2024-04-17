import { HStack, ReactView, Spinner, State, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useState } from "@tuval/forms";
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





export class PendingTaskListController extends UIController {

    @State()
    private polyvalenceTables;

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
                                this.polyvalenceTables = unitTables.documents;
                                this.isLoading = false;
                            })
                        } else if (accountRelationData.authorization_profile === "responsible") {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataResponsible, [Query.limit(10000), Query.equal("responsible_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                const responsibleTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                    this.polyvalenceTables = unitTables.documents.filter((x) => responsibleTableIds.includes(x.polyvalence_table_id));
                                    this.isLoading = false;
                                })
                            })
                        }
                        else {
                            Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTableDataViewer, [Query.limit(10000), Query.equal("viewer_employee_id", me.$id), Query.equal("is_deleted", false)]).then((polyvalenceUnitTables) => {
                                const viewerTableIds = polyvalenceUnitTables.documents.map((x) => x.polyvalence_table_id);
                                Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false), Query.equal("is_active_table", true)]).then((unitTables) => {
                                    this.polyvalenceTables = unitTables.documents.filter((x) => viewerTableIds.includes(x.polyvalence_table_id));
                                    this.isLoading = false;
                                })
                            })
                        }
                    })
                } else {
                    Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.PolyvalenceUnitTable, [Query.limit(10000), Query.equal("tenant_id", me?.prefs?.organization), Query.equal("is_deleted_table", false)]).then((unitTables) => {
                        this.polyvalenceTables = unitTables.documents;
                        this.isLoading = false;
                    })
                }
            })
        })
    }

    public LoadView(): UIView {

        const { me, isLoading } = useGetMe("console");
        const { assignedEducationList, isLoadingAssignedEducationList, totalAssignedEducation } = AssignEducation.GetOpenListByEducator(me?.$id);
        const { periods, isLoading: isLoadingPeriods } = CompetencyEvaluationPeriod.GetDefaultCompetencyEvaluationPeriodWithoutTenant();
        const { listEmployeeCompetencyValue, isLoadingListEmployeeCompetencyValue } = EmployeeCompetencyValue.ListByRealValueNotSubmitted();


        return (
            this.isLoading || !this.polyvalenceTables || isLoading || isLoadingAssignedEducationList || isLoadingPeriods || isLoadingListEmployeeCompetencyValue ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [isOpen, setIsOpen] = useState(-1);

                    useEffect(() => {
                        const waitingTargets = []
                        listEmployeeCompetencyValue.forEach((item) => {
                            if (this.polyvalenceTables.find((x) => x.polyvalence_table_id === item.polyvalence_table_id)
                                //   && item.competency_evaluation_period.includes(periods[0].evaluation_period_year)
                                && item.competency_target_value != null && item.competency_target_value != "no-target"
                            ) {
                                waitingTargets.push(item)
                            }
                        })
                        console.log(waitingTargets, "targets")
                        pendingTasks[0].value = waitingTargets.length,
                            pendingTasks[0].view =
                            <List>
                                {waitingTargets.map((task: any) => (
                                    <ListElement>{`${task.employee_name} - ${task.competency_name}`}</ListElement>
                                ))}
                            </List>
                        setPendingTasks([...pendingTasks])
                    }, [])

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
                                        <ListElement>{`${task.education_name} - ${task.employee_name}`}</ListElement>
                                    ))}
                                </List>
                        }
                    ]);

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
                                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                                    <TaskCard
                                                        onClick={() => {
                                                            if (isOpen == index) {
                                                                setIsOpen(-1);
                                                            } else {
                                                                setIsOpen(index);
                                                            }
                                                        }}
                                                        style={{ cursor: "pointer" }}
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