import { Query, Services, useGetMe } from '@realmocean/sdk'
import {
  HStack,
  ReactView,
  Spinner,
  UIController,
  UIView,
  UIViewBuilder,
  VStack,
  cLeading,
  cTop,
  cTopLeading,
  nanoid,
  useNavigate,
  useParams,
} from '@tuval/forms'
import React, { useState, useEffect } from 'react'
import { IoSettings } from "react-icons/io5";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from '@mui/material'
import { Views } from '../../../components/Views'
import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';
import CompetencyCard from '../Views/CompetencyCard';
import Competency from '../../../../server/hooks/competency/main';
import CompetencyDepartment from '../../../../server/hooks/competencyDepartment/main';
import OrganizationStructureEmployee from '../../../../server/hooks/organizationStructureEmployee/main';
import { BarChart, Gauge, gaugeClasses } from '@mui/x-charts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaAngleLeft } from "react-icons/fa";
import EChartsReact from 'echarts-for-react';
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main';
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
import EmployeeCompetencyValue from '../../../../server/hooks/EmployeeCompetencyValue/main';
import { PedavalansServiceBroker } from '../../../../server/brokers/PedavalansServiceBroker';
import { RadialBarChart, RadialBar } from 'recharts';




export class GlobalCompetencyDashboard extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate()

    const { me, isLoading } = useGetMe('console')
    const { id } = useParams()

    const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization)
    const { competencyDepartments, isLoadingCompetencyDepartments } = CompetencyDepartment.GetByCompetencyId(id)
    const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization)
    const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)
    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)


    const [positionLength, setPositionLength] = useState(0)

    const [avarageCompetencyValue, setAvarageCompetencyValue] = useState("")
    const [globalArr, setGlobalArr] = useState([])

    const [departmentAverages, setDepartmentAverages] = useState([
      { departmentId: "", average: 0 }

    ])

    const [departmens, setDepartmens] = useState([
      { employee_id: "", competency_department_id: "", failed_count: 0, department_name: "" }
    ])
    //Gauge için ayarlar

    const getColor = (value) => {
      if (value >= 0 && value <= 39) {
        return '#f44336' // Kırmızı
      } else if (value >= 40 && value <= 69) {
        return '#ffc107' // Sarı
      } else if (value >= 70 && value <= 100) {
        return '#52b201' // Yeşil
      } else {
        return '#000' // Varsayılan olarak siyah (hata durumu)
      }
    }
    //

    const columns: GridColDef[] = [
      {
        field: 'employee_name',
        headerName: 'Personel Adı Soyadı',
        width: 150,
        editable: false,
        flex: 1,
      },
      {
        field: 'name',
        headerName: 'Departman',
        width: 150,
        editable: false,
        flex: 1,
        valueGetter: (params) => {
          const employee = employees.find((employee) => employee.$id === params.row.employee_id);
          if (!employee) return 'emp yok';  // employee bulunamazsa boş döndür
          const department = departments.find((department) => department.id === employee.department_id);
          return department ? department.name : 'dep yok';
        },
      },
      {
        field: 'position_name',
        headerName: 'Pozisyon',
        width: 150,
        editable: false,
        flex: 1,
        valueGetter: (params) => {
          const employee = employees.find((employee) => employee.$id === params.row.employee_id);
          if (!employee) return 'emp yok';  // employee bulunamazsa boş döndür
          const position = positions.find((position) => position.id === employee.position_id);
          return position ? position.name : 'poz yok';
        },
      },
      {
        field: 'job_start_date',
        headerName: 'Kıdem Süresi',
        width: 150,
        editable: false,
        flex: 1,
        valueGetter: (params) => {
          const employee = employees.find((employee) => employee.$id === params.row.employee_id);
          if (!employee || !employee.job_start_date) return '';  // employee veya job_start_date bulunamazsa boş döndür
          const date = new Date(employee.job_start_date);
          const today = new Date();
          const differenceMilliSecond = today.getTime() - date.getTime();
          const differenceYear = Math.floor(differenceMilliSecond / (1000 * 60 * 60 * 24 * 365.25));
          const differenceMonth = Math.floor((differenceMilliSecond % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
          const differenceDay = Math.floor((differenceMilliSecond % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));
          return `${differenceYear} Yıl ${differenceMonth} Ay ${differenceDay} Gün`;
        },
      },
      {
        field: 'average_competency_value',
        headerName: 'Ortalama Yetkinlik Skoru',
        type: 'number',
        width: 150,
        editable: false,
        flex: 1,
        renderCell: (params) => {
          const value = params.value;
          return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: 80, height: 80 }}>
                <Gauge
                  value={Math.floor(value)}
                  startAngle={-110}
                  endAngle={110}
                  width={80}
                  height={80}
                  cornerRadius="50%"
                  sx={(theme) => ({
                    [`& .${gaugeClasses.valueText}`]: {
                      fontSize: 18,
                    },
                    [`& .${gaugeClasses.valueArc}`]: {
                      fill: getColor(Math.floor(value)),
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                      fill: theme.palette.text.disabled,
                    },
                  })}
                  text={({ value }) => `%${value}`}
                />
              </div>
            </div>
          );
        },
      },
    ];

    function filterUnique(array) {
      const seen = {};
      return array.filter(item => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true);
      });
    }


    return isLoading || isLoadingCompetencyList || isLoadingCompetencyDepartments || isLoadingEmployees || isLoadingDepartments || isLoadingPositions

      ? VStack(Spinner())
      : UIViewBuilder(() => {
        useEffect(() => {
          PedavalansServiceBroker.Default.listEmployeeCompetencyValueGlobal(id).then((response) => {
            let totalValue = 0
            response.result.forEach((element) => {
              totalValue += Number(element.competency_real_value)
            });
            setAvarageCompetencyValue((totalValue / response.result.length).toLocaleString().slice(0, 3))
          }).then(() => {
            PedavalansServiceBroker.Default.listEmployeeCompetencyValueGlobal(id).then((response) => {
              const departmentTotals = {};
              const departmentCounts = {};

              response.result.forEach(doc => {
                const competency_department_id = doc.competency_department_id;
                const competency_real_value = Number(doc.competency_real_value);

                if (!departmentTotals[competency_department_id]) {
                  departmentTotals[competency_department_id] = 0;
                  departmentCounts[competency_department_id] = 0;
                }

                departmentTotals[competency_department_id] += competency_real_value;
                departmentCounts[competency_department_id]++;
              });

              const averages = [];
              for (const departmentId in departmentTotals) {
                const average = departmentTotals[departmentId] / departmentCounts[departmentId];
                averages.push({ departmentId, average });
              }
              setDepartmentAverages(averages);
              console.log(averages)
            })
          }).then(() => {
            PedavalansServiceBroker.Default.listEmployeeCompetencyValueGlobal(id).then((response) => {
              const departmentCounts = {};

              response.result.forEach(doc => {
                const departmentId = doc.competency_department_id;
                const department_name = doc.competency_department_name;

                if (!departmentCounts[departmentId]) {
                  departmentCounts[departmentId] = 0;
                }

                if (parseInt(doc.competency_real_value) < parseInt(doc.competency_target_value)) {
                  departmentCounts[departmentId]++;
                }

              });

              const departments = [];
              for (const departmentId in departmentCounts) {
                const failed_count = departmentCounts[departmentId];
                const department_name = response.result.find(doc => doc.competency_department_id === departmentId).competency_department_name;
                departments.push({ departmentId, failed_count, department_name });
              }
              setDepartmens(departments);
              console.log(departments)

            })
          }).then(() => {
            PedavalansServiceBroker.Default.listEmployeeCompetencyValueGlobal(id).then((response) => {
              Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.CompetencyDepartment,
                [
                  Query.limit(10000),
                  Query.equal("competency_id", id)
                ]
              ).then((response) => {
                const departmentIds = response.documents.map(doc => doc.competency_department_id);
                Services.Databases.listDocuments(
                  AppInfo.Name,
                  AppInfo.Database,
                  Collections.OrganizationStructureEmployee,
                  [
                    Query.limit(10000),
                    Query.equal("department_id", departmentIds)
                  ]
                ).then((response) => {
                  const positionIds = response.documents.map(doc => doc.position_id);
                  const uniquePositionIds = filterUnique(positionIds);
                  const uniquePositionCount = uniquePositionIds.length;
                  setPositionLength(uniquePositionCount);
                })
              })
            })
          })
          PedavalansServiceBroker.Default.listEmployeeCompetencyValueGlobal(id).then((response) => {
            setGlobalArr(response.result)
          })
        }, [])
        const getTopTenEmployeesByAverageCompetency = () => {
          // Her bir employee için ortalama yetkinlik skorunu hesaplayıp yeni bir liste oluşturuyoruz
          const employeesWithAverage = globalArr
            .map(item => {
              const competency_target_value = Number(item.competency_target_value);
              const competency_real_value = Number(item.competency_real_value);
              const average_competency_value = competency_target_value && competency_real_value
                ? (competency_real_value / competency_target_value * 100).toFixed(2)
                : '0'; // Ortalamayı string olarak tutuyoruz
              return {
                ...item,
                average_competency_value: parseFloat(average_competency_value)  // Float olarak saklıyoruz ki sıralama doğru yapılsın
              };
            });

          // Ortalama yetkinlik skoruna göre sıralayıp ilk 10 elemanı seçiyoruz
          return employeesWithAverage
            .sort((a, b) => b.average_competency_value - a.average_competency_value) // Ortalama yetkinlik skoruna göre azalan sırada sıralar
            .slice(0, 10); // İlk 10 elemanı seçer
        };

        return VStack({ alignment: cTopLeading })(
          HStack({ alignment: cLeading })(
            VStack(
              ReactView(
                <IconButton onClick={() => navigate("/app/competency/list")}>
                  <FaAngleLeft size={18} />
                </IconButton>
              )
            ).height().width().paddingTop("10px"),
            Views.Title(`${competencyList.find((competency) => competency.competency_id === id)?.competency_name} - Yetkinlik Detay İzleme Paneli`).paddingTop('10px')
          )
            .height(70)
            .shadow('rgb(0 0 0 / 5%) 0px 4px 2px -2px'),
          HStack({ alignment: cTop })(
            ReactView(
              <div
                style={{
                  width: `100%`,
                  height: '100vh',
                  overflow: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  padding: '10px',
                }}
              >
                <div
                  style={{
                    marginTop: '15px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '30px',
                  }}
                >
                  <CompetencyCard
                    competencyName={competencyList.find((competency) => competency.competency_id === id)?.competency_name}
                    avatar={
                      //Eğer kullanıcı resmi varsa buraya gelecek yoksa icon gelecek simdilik sadece icon gelecek şekilde ayarlandı//
                      <IoSettings
                        style={{
                          color: `rgba(128,128,128,1)`,
                          width: '40px',
                          height: '40px',
                          alignSelf: 'flex-start',
                        }}
                      />
                    }
                    employeeValue={employees.filter((employee) => competencyDepartments.map((competencyDepartment) => competencyDepartment.competency_department_id).includes(employee.department_id)).length}
                    positionValue={positionLength}
                    departmantValue={competencyDepartments.length}
                    averageAbilityScore={avarageCompetencyValue}
                  />

                  <Card
                    sx={{
                      width: `50%`, // 680'di
                      border: '0px',
                      boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
                      borderRadius: '8px',
                      paddingBottom: '35px',
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography variant="h6" style={{ fontSize: '1rem' }}>
                          Yetkinliğin Ait Olduğu Birimlerin Başarı Grafiği
                        </Typography>
                      }
                      style={{
                        borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
                      }}
                    />
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                      }}
                    >
                      <EChartsReact
                        option={{
                          tooltip: {
                            trigger: "axis"
                          },
                          grid: {
                            left: '20%',
                            right: '10%',
                          },
                          width: 300,
                          xAxis: {
                            type: 'value',
                          },
                          yAxis: {
                            type: 'category',
                            data: departmentAverages
                              .map((x) => competencyDepartments.find(
                                (competencyDepartment) => competencyDepartment.competency_department_id === x.departmentId
                              )?.competency_department_name),
                            axisLabel: {
                              rotate: 45, // Etiketleri 45 derece döndürme
                              formatter: (value) => value.length > 10 ? `${value.slice(0, 10)}...` : value, // Uzun etiketleri kırpma
                            },
                          },
                          series: [{
                            data: departmentAverages.sort(
                              (a, b) => a.average - b.average
                            ).map((x) => x.average),
                            color: "#1D5291",
                            type: 'bar',
                          }],
                        }}
                      />

                    </CardContent>
                  </Card>
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '30px',
                  }}
                >
                  <Card
                    sx={{
                      width: `100%`,
                      border: '0px',
                      boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
                      borderRadius: '8px',
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography variant="h6" style={{ fontSize: '1rem' }}>
                          En Yetkin 10 Personel
                        </Typography>
                      }
                      style={{
                        borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
                      }}
                    />
                    <CardContent
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '5px',
                      }}
                    >
                      <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                          rows={getTopTenEmployeesByAverageCompetency()}
                          columns={columns}
                          getRowId={(row) => row.employee_id}
                          initialState={{
                            pagination: {
                              paginationModel: {
                                pageSize: 5,
                              },
                            },
                          }}
                          pageSizeOptions={[5]}
                          disableRowSelectionOnClick
                        />
                      </Box>

                    </CardContent>
                  </Card>
                </div>
              </div>
            )
          )
        ).padding('0 20px')
      })
  }
}