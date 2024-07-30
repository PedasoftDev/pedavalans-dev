import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useNavigate, useState } from "@tuval/forms";
import React, { useEffect } from "react";
import { Views } from "../../../components/Views";
import { Box, Button, Grid, IconButton, Tooltip } from "@mui/material";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { BackgroundDiv, ListItem, PendingTasksDiv, TaskList, ToggleDiv, ToggleDivHeader, WelcomeText } from "../Views/Views";
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
import { useAppDispatch } from "../../../hooks";
import { setAssignEducation } from "../../../features/assignEducation";
import getPeriodFromCurrentDate from "../../../assets/Functions/getPeriodFromCurrentDate";
import { IOrganizationStructure } from "../../../interfaces/IOrganizationStructure";
import ICompetencyDepartment from "../../../interfaces/ICompetencyDepartment";
import { setPendingEvaluation } from "../../../features/pendingEvaluation";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import AssignedEducationEmployees from "../../../../server/hooks/assignedEducationEmployees/main";




export class PendingTaskListController extends UIController {

    public LoadView(): UIView {

        const { me, isLoading } = useGetMe("console");
        const { accountRelations, isLoadingResult } = AccountRelation.GetByAccountId(me?.$id);
        const navigate = useNavigate();

        // global state
        const dispatch = useAppDispatch();
        const setAssignEducationToHook = (value: IAssignedEducation.IBase) => dispatch(setAssignEducation(value));
        const setPendingEvaluationToHook = (value: { polyvalence_table_id: string; evaluation_period: string; }) => dispatch(setPendingEvaluation(value));
        const { assignedEducationEmpList, isLoadingAssignedEducationEmpList } = AssignedEducationEmployees.GetList(me?.prefs?.organization);
        return (
            isLoading || isLoadingResult || isLoadingAssignedEducationEmpList ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [isOpen, setIsOpen] = useState(-1);
                    const [isLoadingValues, setIsLoadingValues] = useState(true);
                    const welComeMessage = `Merhaba ${me?.name.split(" ")[0]}, iyi günler dileriz`;


                    const [pendingTasks, setPendingTasks] = useState<{
                        title: string,
                        value: number,
                        list: any[]
                    }[]>([]);

                    const columns: GridColDef[] = [
                        {
                            field: 'education_name',
                            headerName: 'Eğitim Adı',
                            flex: 1,
                            renderCell: (params) => {
                                return (
                                    <Button
                                        onClick={() => handleClickAssignedEducation(params.row as IAssignedEducation.IBase)}
                                        variant="text"
                                        style={{ textTransform: "none" }}
                                    >
                                        {params.value}
                                    </Button>
                                )
                            }
                        },
                        {
                            field: 'employee_name',
                            headerName: 'Çalışan Adı',
                            flex: 1,
                            valueGetter(params) {
                                return assignedEducationEmpList.filter((item) => item.main_assigned_education_id === params.row.$id).map((item) => item.employee_name).join(", ");
                            },
                            renderCell(params) {
                                const employeeNames = params.value.split(", ");
                                return (
                                    <Tooltip title={employeeNames.join(", ")}>
                                        <span>{employeeNames.slice(0, 1).join(", ")}{employeeNames.length > 1 && ', ...'}</span>
                                    </Tooltip>
                                )
                            },
                        },
                        {
                            field: 'start_date',
                            headerName: 'Başlangıç Tarihi',
                            flex: 1,
                            valueGetter: (params) => new Date(params.row.start_date).toLocaleDateString("tr-TR")
                        },
                        {
                            field: 'end_date',
                            headerName: 'Bitiş Tarihi',
                            flex: 1,
                            valueGetter: (params) => new Date(params.row.end_date).toLocaleDateString("tr-TR")
                        }
                    ]

                    const handleClickAssignedEducation = (assignedEducation: IAssignedEducation.IBase) => {
                        navigate("/app/education/assigned");
                        setAssignEducationToHook(assignedEducation);
                    }

                    useEffect(() => {
                        console.log(assignedEducationEmpList)

                        const getPendingTasks = async () => {
                            const queriesAssignedEducation = [Query.limit(10000), Query.equal("status", "open"), Query.equal("educator_id", me?.$id)]
                            const assignedEducationsOpen: IAssignedEducation.IBase[] = await Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation, queriesAssignedEducation).then(x => x.documents as any);
                            const education = {
                                title: "Bekleyen Eğitimlerim",
                                value: assignedEducationsOpen.length,
                                list: assignedEducationsOpen
                            }
                            const pendingTaskState = [...pendingTasks];
                            pendingTaskState[0] = education;
                            setPendingTasks(pendingTaskState);
                            setIsLoadingValues(false);
                        }
                        getPendingTasks();
                    }, [])

                    return (
                        isLoadingValues ? VStack(Spinner()) :
                            VStack({ spacing: 15, alignment: cTopLeading })(
                                HStack({ alignment: cLeading })(
                                    Views.Title("Bekleyen Görevler").paddingTop("10px")
                                ).height(70).shadow("rgb(0 0 0 / 5%) 0px 4px 2px -2px"),
                                HStack({ alignment: cTop })(
                                    ReactView(
                                        <BackgroundDiv>
                                            <WelcomeText>{welComeMessage}</WelcomeText>
                                            {pendingTasks.map((task, i) =>
                                                task.title === "Bekleyen Eğitimlerim" ?
                                                    <PendingTasksDiv>
                                                        <ToggleDiv isExpanded={isOpen == i}>
                                                            <ToggleDivHeader onClick={() => {
                                                                if (isOpen == i) {
                                                                    setIsOpen(-1);
                                                                } else {
                                                                    setIsOpen(i);
                                                                }
                                                            }}>
                                                                <div>{task.title}</div>
                                                                <div>{task.value}</div>
                                                            </ToggleDivHeader>
                                                            {isOpen === i &&
                                                                <StyledDataGrid
                                                                    rows={task.list}
                                                                    columns={columns}
                                                                    getRowId={(row) => row.$id}
                                                                    style={{ width: "100%" }}
                                                                />
                                                            }
                                                        </ToggleDiv>
                                                    </PendingTasksDiv>
                                                    :
                                                    <PendingTasksDiv>
                                                        <ToggleDiv isExpanded={isOpen == i}>
                                                            <ToggleDivHeader onClick={() => {
                                                                if (isOpen == i) {
                                                                    setIsOpen(-1);
                                                                } else {
                                                                    setIsOpen(i);
                                                                }
                                                            }}>
                                                                <div>{task.title}</div>
                                                                <div>{task.value}</div>
                                                            </ToggleDivHeader>
                                                        </ToggleDiv>
                                                    </PendingTasksDiv>
                                            )}

                                        </BackgroundDiv>
                                    )
                                )
                            ).padding("0 20px")
                    )
                })
        )

    }
}