import { BarChart } from "@mui/x-charts/BarChart";
import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { Card, CardHeader } from "../Views/Card";
import ReactECharts from "echarts-for-react";
export interface EmployeePerformanceData {
    id: number;
    name: string;
    performance: number;
}

export const EmployeePerformanceDashboard: React.FC<{
    employeesByTitle: { titleName: string, employeeCount: number }[];
    employeesByDepartment: { departmentName: string, employeeCount: number }[];
    employeesByPosition: { positionName: string, employeeCount: number }[];
    employeePerformanceData: { name: string, value: number }[];
    successfulFiveDepartments: { departmentName: string, percentage: number }[];
    unsuccessfulFiveDepartments: { departmentName: string, percentage: number }[];
}> = (props) => {

    return (
        <Box sx={{ flexGrow: 1, padding: "10px 16px" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6} lg={6}>
                    <Card style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                        <ReactECharts
                            option={{
                                title: {
                                    text: 'Çalışanların Pozisyon Bazlı Dağılım Grafiği'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                },
                                yAxis: {
                                    type: 'value',
                                    axisLabel: {
                                        formatter: '{value}'
                                    },
                                    minInterval: 1,
                                },
                                xAxis: {
                                    type: 'category',
                                    data: props.employeesByPosition.map((x) => x.positionName),
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 30,
                                        formatter: function (value) {
                                            return value.length > 10 ? value.substr(0, 10) + '...' : value;
                                        }
                                    },
                                },
                                series: [
                                    {
                                        name: 'Çalışan Sayısı',
                                        type: 'bar',
                                        data: props.employeesByPosition.map((x) => x.employeeCount),
                                        itemStyle: {
                                            color: '#EE7D20'
                                        }
                                    }
                                ]
                            }}
                            style={{ height: '300px', width: '100%' }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                    <Card style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                        <ReactECharts
                            option={{
                                title: {
                                    text: 'Çalışanların Departman Bazlı Dağılım Grafiği'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                xAxis: {
                                    type: 'category',
                                    data: props.employeesByDepartment.map((x) => x.departmentName),
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 30,
                                        formatter: function (value) {
                                            return value.length > 10 ? value.substr(0, 10) + '...' : value;
                                        }
                                    },
                                },
                                series: [
                                    {
                                        name: 'Çalışan Sayısı',
                                        type: 'bar',
                                        data: props.employeesByDepartment.map((x) => x.employeeCount)
                                    }
                                ]
                            }}
                            style={{ height: '300px', width: '100%' }}
                        />
                    </Card>
                </Grid>

                <Grid item xs={12} md={6} lg={4}>
                    <Card style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                        <ReactECharts
                            option={{
                                title: {
                                    text: 'Çalışanların Yetkinlik Performansları Dağılımı',
                                },
                                tooltip: {
                                    trigger: 'item'
                                },
                                series: [
                                    {
                                        name: 'Çalışanların Performans Dağılımı',
                                        type: 'pie',
                                        radius: '50%',
                                        data: props.employeePerformanceData,
                                        emphasis: {
                                            itemStyle: {
                                                shadowBlur: 10,
                                                shadowOffsetX: 0,
                                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                                            }
                                        }
                                    }
                                ]
                            }}
                            style={{ height: '350px' }}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                        <ReactECharts
                            option={{
                                title: {
                                    text: 'Başarı Oranı En Yüksek 5 Departman'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                xAxis: {
                                    type: 'category',
                                    data: props.successfulFiveDepartments.map((x) => x.departmentName),
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 30,
                                        formatter: function (value) {
                                            return value.length > 10 ? value.substr(0, 10) + '...' : value;
                                        }
                                    },
                                },
                                series: [
                                    {
                                        name: 'Başarı Oranı %',
                                        type: 'bar',
                                        data: props.successfulFiveDepartments.map((x) => x.percentage),
                                        itemStyle: {
                                            color: '#2f9e33'
                                        }
                                    }
                                ]
                            }}
                        />

                    </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={4}>
                    <Card style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                        <ReactECharts
                            option={{
                                title: {
                                    text: 'Başarı Oranı En Düşük 5 Departman'
                                },
                                tooltip: {
                                    trigger: 'axis',
                                    axisPointer: {
                                        type: 'shadow'
                                    }
                                },
                                yAxis: {
                                    type: 'value'
                                },
                                xAxis: {
                                    type: 'category',
                                    data: props.unsuccessfulFiveDepartments.map((x) => x.departmentName),
                                    axisLabel: {
                                        interval: 0,
                                        rotate: 30,
                                        formatter: function (value) {
                                            return value.length > 10 ? value.substr(0, 10) + '...' : value;
                                        }
                                    },
                                },
                                series: [
                                    {
                                        name: 'Başarı Oranı %',
                                        type: 'bar',
                                        data: props.unsuccessfulFiveDepartments.map((x) => x.percentage),
                                        itemStyle: {
                                            color: '#c93636'
                                        }
                                    }
                                ]
                            }}
                        />
                    </Card>

                </Grid>
            </Grid>
        </Box>
    );
};
