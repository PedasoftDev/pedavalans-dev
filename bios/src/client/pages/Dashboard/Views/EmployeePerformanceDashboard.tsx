import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Card, CardHeader } from "../Views/Card";

export interface EmployeePerformanceData {
    id: number;
    name: string;
    performance: number;
}

export const EmployeePerformanceDashboard: React.FC<{
    employeesByTitle: { titleName: string, employeeCount: number }[];
    employeesByDepartment: { departmentName: string, employeeCount: number }[];
    employeesByPosition: { positionName: string, employeeCount: number }[];
    employeePerformanceData: { label: string, value: number }[];
    successfullFiveDepartments: { departmentName: string, percentage: number }[];
    competencyNeedsToBeImproved: { competencyName: string, percentage: number }[];
}> = (props) => {

    return (
        <Box sx={{ flexGrow: 1, padding: "10px 16px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">
                                Çalışanların Unvan Bazlı Dağılım Grafiği
                            </Typography>
                        </CardHeader>
                        <BarChart
                            title="Çalışanların Ünvan Bazlı Grafiği"
                            series={[{
                                data: props.employeesByTitle.map((x) => x.employeeCount),
                                layout: "horizontal",
                                color: "#1D5291"
                            }]}
                            height={300}
                            yAxis={[
                                {
                                    data: props.employeesByTitle.map((x) => x.titleName),
                                    scaleType: "band",
                                    tickLabelStyle: { margin: "0", padding: "0" },
                                },
                            ]}
                            margin={{ top: 10, bottom: 30, left: 120, right: 30 }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">
                                Çalışanların Departman Bazlı Dağılım Grafiği
                            </Typography>
                        </CardHeader>
                        <BarChart
                            title="Çalışanların Departman Bazlı Dağılım Grafiği"
                            series={[{ data: props.employeesByDepartment.map((x) => x.employeeCount) }]}
                            height={300}
                            xAxis={[{ data: props.employeesByDepartment.map((x) => x.departmentName), scaleType: "band" }]}
                            margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">
                                Çalışanların Pozisyon Bazlı Dağılım Grafiği
                            </Typography>
                        </CardHeader>
                        <BarChart
                            title="Çalışanların Pozisyon Bazlı Dağılım Grafiği"
                            series={[{
                                data: props.employeesByPosition.map((x) => x.employeeCount),
                                layout: "horizontal",
                                color: "#1D5291"
                            }]}
                            height={300}
                            yAxis={[
                                {
                                    data: props.employeesByPosition.map((x) => x.positionName),
                                    scaleType: "band",
                                    tickLabelStyle: { margin: "0", padding: "0" },
                                },
                            ]}
                            margin={{ top: 10, bottom: 30, left: 120, right: 30 }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">
                                Çalışanların Yetkinlik Performansları Dağılımı
                            </Typography>
                        </CardHeader>

                        <PieChart
                            series={[
                                {
                                    data: props.employeePerformanceData,
                                    highlightScope: { faded: "global", highlighted: "item" },
                                    faded: {
                                        innerRadius: 30,
                                        additionalRadius: -30,
                                        color: "gray",
                                    },
                                },
                            ]}
                            height={300}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">
                                En Başarılı 5 Departman
                            </Typography>
                        </CardHeader>
                        <BarChart
                            title="En Başarılı 5 Departman"
                            series={[{
                                data: props.successfullFiveDepartments.map((x) => x.percentage),
                                valueFormatter(value) {
                                    return `${value.toFixed(2)}%`;
                                },
                                layout: "horizontal",
                                color: "#1D5291"
                            }]}
                            height={300}
                            yAxis={[
                                {
                                    data: props.successfullFiveDepartments.map((x) => x.departmentName),
                                    scaleType: "band",
                                    tickLabelStyle: { margin: "0", padding: "0" },
                                },
                            ]}
                            margin={{ top: 10, bottom: 30, left: 120, right: 30 }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card>
                        <CardHeader>
                            <Typography variant="h6">
                                Geliştirilmesi Gereken Yetkinlikler
                            </Typography>
                        </CardHeader>
                        <BarChart
                            title="Geliştirilmesi Gereken Yetkinlikler"
                            series={[{
                                data: props.competencyNeedsToBeImproved.map((x) => x.percentage),
                                valueFormatter(value) {
                                    return `${value.toFixed(2)}%`;
                                },
                                layout: "horizontal",
                                color: "#1D5291"
                            }]}
                            height={300}
                            yAxis={[
                                {
                                    data: props.competencyNeedsToBeImproved.map((x) => x.competencyName),
                                    scaleType: "band",
                                    tickLabelStyle: { margin: "0", padding: "0" },
                                },
                            ]}
                            margin={{ top: 10, bottom: 30, left: 120, right: 30 }}
                        />
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};
