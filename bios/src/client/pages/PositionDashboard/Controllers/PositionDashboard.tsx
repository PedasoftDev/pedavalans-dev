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
  Button,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Views } from '../../../components/Views'
import PositionCard from '../Views/PositionCard'
import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
import OrganizationStructureEmployee from '../../../../server/hooks/organizationStructureEmployee/main';
import OrganizationStructureEmployeeLog from '../../../../server/hooks/organizationStructureEmployeeLog/main';
import LinearProgressWithLabel from '../../../components/LinearProgressWithLabel';
import Competency from '../../../../server/hooks/competency/main';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import IEmployeeDashboard from '../../../interfaces/IEmployeeDashboard';
import { selectEmployeeDashboard, setEmployeeDashboard, setEmployeeDashboardToNull } from '../../../features/employeeDashboard';
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main';
import { FaAngleLeft } from 'react-icons/fa';



export class PositionDashboard extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate()
    const { me, isLoading } = useGetMe('console')
    const { id, period } = useParams()

    const dispatch = useAppDispatch();
    const selector = useAppSelector;
    const setEmployeeDashboardToHook = (value: IEmployeeDashboard.IBase) => dispatch(setEmployeeDashboard(value));
    const setEmployeeDashboardNull = () => dispatch(setEmployeeDashboardToNull());
    const employeeDashboardState: IEmployeeDashboard.IBase = selector(selectEmployeeDashboard);

    const { positions, isLoadingPositions } = OrganizationStructurePosition.GetList(me?.prefs?.organization)
    const { employees, isLoadingEmployees } = OrganizationStructureEmployee.GetList(me?.prefs?.organization)
    const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization)
    const { employeeLog, isLoadingEmployeeLog } = OrganizationStructureEmployeeLog.List(me?.prefs?.organization)
    const { polyvalenceUnitList, isLoadingPolyvalenceUnit } = PolyvalenceUnit.GetActiveList(me?.prefs?.organization);

    const [competencyLength, setCompetencyLength] = useState(0)
    const [competencyAverageValue, setCompetencyAverageValue] = useState(0)
    const [employeesList, setEmployeesList] = useState([])
    const [competencyAverageValues, setCompetencyAverageValues] = useState({});
    const [competencyData, setCompetencyData] = useState([]);


    const transformPeriodName = period.split("&").join(" ").split("C").join("Ç").split("i").join("ı").split("o").join("ö").split("Dönemı").join("Dönemi")


    return isLoading || isLoadingPositions || isLoadingEmployees || isLoadingEmployeeLog || isLoadingPolyvalenceUnit || isLoadingCompetencyList

      ? VStack(Spinner())
      : UIViewBuilder(() => {
        useEffect(() => {
          Services.Databases.listDocuments(
            AppInfo.Name,
            AppInfo.Database,
            Collections.OrganizationStructureEmployee,
            [
              Query.limit(10000),
              Query.equal("position_id", id),
            ]
          ).then((res) => {
            const employees = res.documents.map((doc) => doc.first_name + ' ' + doc.last_name)
            setEmployeesList(employees)
            const departmen_id = res.documents.map((doc) => doc.department_id)
            Services.Databases.listDocuments(
              AppInfo.Name,
              AppInfo.Database,
              Collections.CompetencyDepartment,
              [
                Query.limit(10000),
                Query.equal("competency_department_id", departmen_id),
              ]
            ).then((res) => {
              const competency_id = res.documents.map((doc) => doc.competency_id)
              Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.Competency,
                [
                  Query.limit(10000),
                  Query.equal("competency_id", competency_id),
                ]
              ).then((res) => {
                setCompetencyLength(res.documents.length)
                Services.Databases.listDocuments(
                  AppInfo.Name,
                  AppInfo.Database,
                  Collections.EmployeeCompetencyValue,
                  [
                    Query.limit(10000),
                    Query.equal("competency_id", competency_id),
                    Query.equal('competency_evaluation_period', transformPeriodName),
                    Query.notEqual("competency_target_value", "no-target"), Query.notEqual("competency_real_value", "")
                  ]
                ).then((res) => {
                  let sumRealValue = 0
                  res.documents.forEach((doc) => {
                    sumRealValue += Number(doc.competency_real_value)
                  })
                  const finishValue = (sumRealValue / res.documents.length)
                  setCompetencyAverageValue(finishValue)
                })
              })
            })
          }).then(() => {
            Services.Databases.listDocuments(
              AppInfo.Name,
              AppInfo.Database,
              Collections.OrganizationStructureEmployee,
              [
                Query.limit(10000),
                Query.equal("position_id", id),
              ]
            ).then((res) => {
              const employeeIds = res.documents.map((doc) => doc.$id);
              const promises = employeeIds.map(employeeId => {
                return Services.Databases.listDocuments(
                  AppInfo.Name,
                  AppInfo.Database,
                  Collections.EmployeeCompetencyValue,
                  [
                    Query.limit(10000),
                    Query.equal("employee_id", employeeId),
                    Query.equal('competency_evaluation_period', transformPeriodName),
                    Query.notEqual("competency_target_value", "no-target"), Query.notEqual("competency_real_value", "")
                  ]
                ).then((res) => {
                  const competencyValues = res.documents.map(doc => parseInt(doc.competency_real_value));
                  const totalCompetencyValue = competencyValues.reduce((acc, val) => acc + val, 0);
                  const averageCompetencyValue = totalCompetencyValue / competencyValues.length;
                  setCompetencyAverageValues(prevState => ({
                    ...prevState,
                    [employeeId]: averageCompetencyValue,
                  }));

                })
              });
              Promise.all(promises).then(() => {
                setEmployeesList(employeeIds);
              });
            })
          }).then(() => {
            Services.Databases.listDocuments(
              AppInfo.Name,
              AppInfo.Database,
              Collections.OrganizationStructureEmployee,
              [
                Query.limit(10000),
                Query.equal("position_id", id),
              ]
            ).then((res) => {
              const employeeIds = res.documents.map((doc) => doc.$id);
              const competencySums = {};
              const competencyCounts = {};
              employeeIds.forEach(employeeId => {
                Services.Databases.listDocuments(
                  AppInfo.Name,
                  AppInfo.Database,
                  Collections.EmployeeCompetencyValue,
                  [
                    Query.limit(10000),
                    Query.equal("employee_id", employeeId),
                    Query.equal('competency_evaluation_period', transformPeriodName),
                    Query.notEqual("competency_target_value", "no-target"), Query.notEqual("competency_real_value", "")
                  ]
                ).then((competencyRes) => {
                  competencyRes.documents.forEach((competencyDoc) => {
                    const { competency_real_value, competency_target_value, competency_id } = competencyDoc;
                    const percentage = (competency_real_value * 100) / competency_target_value;

                    // Eğer bu competency_id zaten varsa, yüzdelik değeri topla
                    if (competencySums[competency_id]) {
                      competencySums[competency_id] += percentage;
                      competencyCounts[competency_id]++;
                    } else { // Yoksa, yeni bir nesne oluştur ve yüzdelik değerini ekle
                      competencySums[competency_id] = percentage;
                      competencyCounts[competency_id] = 1;
                    }
                  });
                });
              });
              Object.keys(competencySums).forEach(competencyId => {
                const totalPercentage = competencySums[competencyId];
                const count = competencyCounts[competencyId];
                const average = totalPercentage / count;
                console.log(`Competency ID: ${competencyId}, Total Percentage: ${totalPercentage.toFixed(2)}%, Count: ${count}, Average: ${average.toFixed(2)}%`);
              });
            })
          }).then(() => {
            Services.Databases.listDocuments(
              AppInfo.Name,
              AppInfo.Database,
              Collections.OrganizationStructureEmployee,
              [
                Query.limit(10000),
                Query.equal("position_id", id),
              ]
            ).then((res) => {
              const employeeIds = res.documents.map((doc) => doc.$id);

              // Objeleri tanımla
              const competencySums = {};
              const competencyCounts = {};

              const promises = [];

              employeeIds.forEach(employeeId => {
                promises.push(
                  Services.Databases.listDocuments(
                    AppInfo.Name,
                    AppInfo.Database,
                    Collections.EmployeeCompetencyValue,
                    [
                      Query.limit(10000),
                      Query.equal("employee_id", employeeId),
                      Query.equal('competency_evaluation_period', transformPeriodName),
                      Query.notEqual("competency_target_value", "no-target"), Query.notEqual("competency_real_value", "")
                    ]
                  ).then((competencyRes) => {
                    competencyRes.documents.forEach((competencyDoc) => {
                      const { competency_real_value, competency_target_value, competency_id } = competencyDoc;
                      const percentage = (competency_real_value * 100) / competency_target_value;
                      if (competencySums[competency_id]) {
                        competencySums[competency_id] += percentage;
                        competencyCounts[competency_id]++;
                      } else {
                        competencySums[competency_id] = percentage;
                        competencyCounts[competency_id] = 1;
                      }
                    })
                  })
                );
              });

              Promise.all(promises).then(() => {
                const competencyData = Object.keys(competencySums).map(competencyId => {
                  const totalPercentage = competencySums[competencyId];
                  const count = competencyCounts[competencyId];
                  const average = totalPercentage / count;
                  return { competencyId, totalPercentage, count, average };
                });
                setCompetencyData(competencyData);
              });
            });
          })
        }, [])

        return VStack({ alignment: cTopLeading })(
          HStack({ alignment: cLeading })(
            VStack(
              ReactView(
                <IconButton onClick={() => navigate(-1)}>
                  <FaAngleLeft size={18} />
                </IconButton>
              )
            ).height().width().paddingTop("10px"),
            Views.Title(`${positions.find((position) => position.id === id).name} - Pozisyon Detay İzleme Paneli - ${employeeDashboardState.competency_evaluation_period}`).paddingTop('10px')
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
                  <PositionCard
                    positionName={
                      positions.find((position) => position.id === id).name
                    }
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
                    employeeValue={
                      employees.filter((employee) => employee.position_id === id).length
                    }
                    abilityCount={competencyLength}
                    averageAbilityScore={competencyAverageValue.toString().slice(0, 3)}
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
                          Yetkinlik Düzeyi En Yüksek Pozisyon Sahipleri(Dönem Bazlı)
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
                      <TableContainer component={Paper}>
                        <Table
                          sx={{ width: `100%` }}
                          aria-label="simple table"
                        >
                          <TableHead>
                            <TableRow>
                              <TableCell>Adı-Soyadı</TableCell>
                              <TableCell align="center">
                                Ortalama Yetkinlik Skoru
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {

                              employeesList
                                .sort((a, b) => competencyAverageValues[b] - competencyAverageValues[a])
                                .slice(0, 5)
                                .map((employeeId) => {
                                  return (
                                    <TableRow key={employeeId}>
                                      <TableCell component="th" scope="row">
                                        <Button onClick={(e) => {
                                          setEmployeeDashboardNull()
                                          setEmployeeDashboardToHook({
                                            ...employees.find(employee => employee.$id === employeeId),
                                            competency_evaluation_period: employeeDashboardState.competency_evaluation_period,
                                            polyvalence_table_id: employeeDashboardState.polyvalence_table_id,
                                            frequency: employeeDashboardState.frequency,
                                          })
                                          navigate('/app/employee-dashboard/view')
                                        }}>
                                          {
                                            employees.find(employee => employee.$id === employeeId)?.first_name + ' ' + employees.find(employee => employee.$id === employeeId)?.last_name
                                          }
                                        </Button>
                                      </TableCell>
                                      <TableCell align="center">
                                        {competencyAverageValues[employeeId]?.toString().slice(0, 3) || 'N/A'} {/* Ortalama değeri kontrol et ve görüntüle veya 'N/A' (Not Available) yazdır */}
                                      </TableCell>
                                    </TableRow>
                                  )
                                })
                            }
                          </TableBody>
                        </Table>
                      </TableContainer>
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
                      width: `50%`,
                      border: '0px',
                      boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
                      borderRadius: '8px',
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography variant="h6" style={{ fontSize: '1rem' }}>
                          Pozisyon Sahiplerinin En Çok Başarılı Olduğu Yetkinlikler
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
                      {
                        competencyData
                          .sort((a, b) => b.average - a.average)
                          .slice(0, 5)
                          .map((competency) => (
                            <Typography
                              variant="body2"
                              color="InfoText"
                              style={{ fontSize: '1rem' }}
                            >
                              <span
                                style={{
                                  color: 'rgba(128, 128, 128,1)',
                                }}
                              >
                                {
                                  competencyList.find((comp) => comp.competency_id === competency.competencyId).competency_name
                                }
                              </span>
                              :
                              <LinearProgressWithLabel
                                value={
                                  competency.average
                                }
                              />
                            </Typography>
                          ))

                      }
                    </CardContent>
                  </Card>

                  <Card
                    sx={{
                      width: `50%`,
                      border: '0px',
                      boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
                      borderRadius: '8px',
                    }}
                  >
                    <CardHeader
                      title={
                        <Typography variant="h6" style={{ fontSize: '1rem' }}>
                          Pozisyon Sahiplerinin En Az Başarılı Olduğu Yetkinlikler
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
                      {
                        competencyData
                          .sort((a, b) => a.average - b.average)
                          .slice(0, 5)
                          .map((competency) => (
                            <Typography
                              variant="body2"
                              color="InfoText"
                              style={{ fontSize: '1rem' }}
                            >
                              <span
                                style={{
                                  color: 'rgba(128, 128, 128,1)',
                                }}
                              >
                                {
                                  competencyList.find((comp) => comp.competency_id === competency.competencyId).competency_name
                                }
                              </span>
                              :
                              <LinearProgressWithLabel
                                value={
                                  competency.average
                                }
                              />
                            </Typography>
                          ))

                      }


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

