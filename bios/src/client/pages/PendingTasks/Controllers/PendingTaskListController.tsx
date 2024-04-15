import { HStack, ReactView, Spinner, UIController, UIView, UIViewBuilder, VStack, cLeading, cTop, cTopLeading, useState } from "@tuval/forms";
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





export class PendingTaskListController extends UIController {

    public LoadView(): UIView {

        const { me, isLoading } = useGetMe("console");
        const { assignedEducationList, isLoadingAssignedEducationList, totalAssignedEducation } = AssignEducation.GetOpenListByEducator(me?.$id);


        return (
            isLoading || isLoadingAssignedEducationList ? VStack(Spinner()) :
                UIViewBuilder(() => {
                    const [isOpen, setIsOpen] = useState(-1);

                    const [pendingTasks, setPendingTasks] = useState([
                        {
                            title: "Bekleyen Değerlendirmeler",
                            value: 0,
                            list: []
                        },
                        {
                            title: "Bekleyen Eğitimler",
                            value: totalAssignedEducation,
                            list: assignedEducationList
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
                                                            <List>
                                                                {item.list.map((task: IAssignedEducation.IBase) => (
                                                                    <ListElement>{`${task.education_name} - ${task.employee_name}`}</ListElement>
                                                                ))}
                                                            </List>
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