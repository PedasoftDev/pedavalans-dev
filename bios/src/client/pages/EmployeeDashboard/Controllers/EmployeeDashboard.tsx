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
import EmployeeCard from '../Views/EmployeeCard'
import { IoMdPerson } from 'react-icons/io'
import AppInfo from '../../../../AppInfo'
import Collections from '../../../../server/core/Collections'
import OrganizationStructureDepartment from '../../../../server/hooks/organizationStructureDepartment/main'
import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main'
import CompetencyDepartment from '../../../../server/hooks/competencyDepartment/main'
import EmployeeCertificateCard from '../Views/EmployeeCertificateCard'
import EmployeeCompetencyValue from '../../../../server/hooks/EmployeeCompetencyValue/main'
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  IconButton,
  Paper,
  Switch,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material'
import LinearProgressWithLabel from '../../../components/LinearProgressWithLabel'
import { red } from '@mui/material/colors'
import { BarChart, Gauge, gaugeClasses } from '@mui/x-charts'
import AssignEducation from '../../../../server/hooks/assignEducation/main'
import { Views } from '../../../components/Views'
import PolyvalenceUnit from '../../../../server/hooks/polyvalenceUnit/main'
import CompetencyEvaluationPeriod from '../../../../server/hooks/competencyEvaluationPeriod/main'
import OrganizationStructureEmployee from '../../../../server/hooks/organizationStructureEmployee/main'
import OrganizationStructureEmployeeLog from '../../../../server/hooks/organizationStructureEmployeeLog/main'
import { AntTab, AntTabs, TabPanel, a11yProps } from '../../../components/Tabs'
import { SimpleTreeView, TreeItem } from '@mui/x-tree-view'
import Competency from '../../../../server/hooks/competency/main'
import OrganizationEmployeeDocument from '../../../../server/hooks/organizationEmployeeDocument/main'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { selectEmployeeDashboard, setEmployeeDashboardToNull } from '../../../features/employeeDashboard'
import IEmployeeDashboard from '../../../interfaces/IEmployeeDashboard'
import CompetencyGroup from '../../../../server/hooks/competencyGroup/main'
import { sortEvaluations } from '../../../assets/Functions/sortEmployeeCompetencyValueByPeriod'
import EChartsReact from 'echarts-for-react'
import { FaAngleLeft } from "react-icons/fa";


export class EmployeeDashboard extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate()
    const { me, isLoading } = useGetMe('console')



    const dispatch = useAppDispatch();
    const selector = useAppSelector;
    const setEmployeeDashboardNull = () => dispatch(setEmployeeDashboardToNull());

    /* GLOBAL STATE ASSIGN EDUCATION */
    const employeeDashboardState: IEmployeeDashboard.IBase = selector(selectEmployeeDashboard);



    const { document: department, isLoading: isLoadingDepartment } = OrganizationStructureDepartment.Get(employeeDashboardState.department_id)

    const { position, isLoadingPosition } = OrganizationStructurePosition.Get(employeeDashboardState.position_id)

    const { competencyDepartmentList, isLoadingCompetencyDepartmentList } = CompetencyDepartment.GetList(me?.prefs?.organization)

    const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization)

    const { listEmployeeCompetencyValue, isLoadingListEmployeeCompetencyValue, } = EmployeeCompetencyValue.ListByEmployeeAndTableId(employeeDashboardState.$id, employeeDashboardState.polyvalence_table_id)
    const { assignedEducationList, isLoadingAssignedEducationList } = AssignEducation.GetByEmployeeId(employeeDashboardState.$id)

    const { employeeLog, isLoadingEmployeeLog } = OrganizationStructureEmployeeLog.ListByEmployeeId(employeeDashboardState.$id)
    const { documentList, isLoadingDocument } = OrganizationEmployeeDocument.ListByEmployeeId(employeeDashboardState.$id)




    const EmployeeInfos = {
      name: '',
      avatar: '',
      position: '',
      department: '',
      experience: '',
      skills: '',
      startDate: '',
    }

    const EducationInfos = {
      educationName: '',
    }


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

    const [employee, setEmployee] = useState(EmployeeInfos)

    const [education, setEducation] = useState(EducationInfos)

    const [employeeGaugeValue, setEmployeeGaugeValue] = useState(0)

    const [employeeBarValue, setEmployeeBarValue] = useState(0)
    const [barMaxValue, setBarMaxValue] = useState(0)

    const [employeeGroups, setEmployeeGroups] = useState([])

    const [selectedCompetencyId, setSelectedCompetencyId] = useState('')

    const [switchState, setSwitchState] = useState(true)


    // tabs settings

    const [value, setValue] = useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };



    // treeview settings

    const SelectedCompetencyInfo = {
      competency_id: '',
      competency_name: '',
      competency_real_value: '',
      competency_target_value: '',
      competency_evaluation_period: '',
      competency_group_id: '',
      competency_group_name: '',
    }

    const [selectedCompetency, setSelectedCompetency] = useState(SelectedCompetencyInfo)

    const [selectedEvaluationPeriod, setSelectedEvaluationPeriod] = useState([])
    const [selectedRealValue, setSelectedRealValue] = useState([])
    const [selectedTargetValue, setSelectedTargetValue] = useState([])

    const [info, setInfo] = useState([])





    return isLoading || isLoadingDepartment || isLoadingPosition || isLoadingCompetencyDepartmentList || isLoadingListEmployeeCompetencyValue
      || isLoadingAssignedEducationList || isLoadingEmployeeLog || isLoadingCompetencyList || isLoadingDocument ? VStack(Spinner())
      :
      UIViewBuilder(() => {
        const employeeChartInfos = {
          employee_id: employeeDashboardState.$id,
          employee_name: employeeDashboardState.first_name + ' ' + employeeDashboardState.last_name,
          polyvalence_table_id: employeeDashboardState.polyvalence_table_id,
          competency_group: []
        }

        useEffect(() => {
          Services.Databases.getDocument(
            AppInfo.Name,
            AppInfo.Database,
            Collections.OrganizationStructureEmployee,
            employeeDashboardState.$id
          )
            .then((res) => {
              setEmployee({
                name: res.first_name + ' ' + res.last_name,
                avatar: null,
                position: res.position_id,
                department: res.department_id,
                experience: null,
                skills: null,
                startDate: null,
              })
            })
            .then(() => {
              Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.EmployeeCompetencyValue,
                //değiştirilecek
                [Query.limit(100), Query.equal('employee_id', employeeDashboardState.$id), Query.equal('competency_evaluation_period', employeeDashboardState.competency_evaluation_period), Query.notEqual("competency_target_value", "no-target"), Query.notEqual("competency_real_value", "")]
              ).then((res) => {
                let totalValue = 0
                let totalTargetValue = 0
                res.documents.forEach((element) => {
                  totalValue += Number(element.competency_real_value)
                  totalTargetValue += Number(element.competency_target_value)
                })
                const averagePercentage = (100 * totalValue) / totalTargetValue || 0
                setEmployeeGaugeValue(averagePercentage)
                let totalBarValue = 0
                let totalPiece = 0
                res.documents.forEach((element) => {
                  totalBarValue += Number(element.competency_real_value)
                  totalPiece = res.documents.length
                })
                const averageBarValue = totalBarValue / totalPiece || 0
                setEmployeeBarValue(averageBarValue)
                setBarMaxValue(Math.max(...res.documents.map((x) => x.competency_target_value)))
              })
            })
            .then(() => {
              Services.Databases.listDocuments(AppInfo.Name, AppInfo.Database, Collections.AssignedEducation,
                [
                  Query.limit(10000),
                  Query.equal('employee_id', employeeDashboardState.$id),
                  Query.equal('status', 'completed'),
                ]
              ).then((res) => {
                setEducation({
                  educationName: res.documents[0]?.education_name,
                })
              })
            })


          listEmployeeCompetencyValue.filter(x => x.employee_id === employeeDashboardState.$id).forEach((element, i) => {
            const competencyWithGroup = competencyList.find(x => x.competency_id === element.competency_id);
            if (competencyWithGroup) {
              const groupId = competencyWithGroup.competency_group_id;
              const groupName = competencyWithGroup.competency_group_name;
              const competencyId = competencyWithGroup.competency_id;

              if (!employeeChartInfos.competency_group.find(x => x.group_id === groupId)) {
                employeeChartInfos.competency_group.push({
                  group_id: groupId,
                  group_name: groupName,
                  competencies: []
                });
              }

              // Check if the competency already exists in the group's competencies array
              const group = employeeChartInfos.competency_group.find(x => x.group_id === groupId);
              const existingCompetency = group.competencies.find(c => c.competency_id === competencyId);

              if (existingCompetency) {
                // Merge or update the existing competency data as needed
                existingCompetency.details.push(element); // Adjust this line based on how you want to merge the details
              } else {
                group.competencies.push({
                  ...element,
                  group_name: groupName,
                  group_id: groupId,
                  details: [element] // Store original details in a sub-array
                });
              }
            }
            if (i === listEmployeeCompetencyValue.length - 1) {
              employeeChartInfos.competency_group.forEach((group) => {
                group.competencies.forEach(element => {
                  sortEvaluations(element.details, employeeDashboardState.frequency)
                });
              });
            }
          })
          setEmployeeGroups(employeeChartInfos.competency_group)
          setSelectedCompetencyId(employeeChartInfos.competency_group[0].competencies[0].competency_id)
          setSelectedCompetency(employeeChartInfos.competency_group[0].competencies[0])
          setSelectedEvaluationPeriod(employeeChartInfos.competency_group[0].competencies[0].details.map((x) => x.competency_evaluation_period))
          setSelectedRealValue(employeeChartInfos.competency_group[0].competencies[0].details.map((x) => x.competency_real_value))
          setSelectedTargetValue(employeeChartInfos.competency_group[0].competencies[0].details.map((x) => x.competency_target_value))

        }, [])

        //Çalışanın birimdeki toplam kidem süresini hesaplar
        const date = new Date(employeeDashboardState.job_start_date);

        const today = new Date();
        const differenceMilliSecond = today.getTime() - date.getTime();
        const differenceYear = Math.floor(differenceMilliSecond / (1000 * 60 * 60 * 24 * 365.25));
        const differenceMonth = Math.floor((differenceMilliSecond % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
        const differenceDay = Math.floor((differenceMilliSecond % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));

        return VStack({ alignment: cTopLeading })(
          HStack({ alignment: cLeading })(
            VStack(
              ReactView(
                <IconButton onClick={() => navigate(-1)}>
                  <FaAngleLeft size={18} />
                </IconButton>
              )
            ).height().width().paddingTop("10px"),
            Views.Title(
              `${employeeDashboardState.first_name} ${employeeDashboardState.last_name} - Personel Detay İzleme Paneli - ${employeeDashboardState.competency_evaluation_period}`,
            ).paddingTop('10px')
          ).height(70).shadow('rgb(0 0 0 / 5%) 0px 4px 2px -2px'),
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
                <AntTabs value={value} onChange={handleChange}>
                  <AntTab label="Özet Bilgiler" {...a11yProps(0)} />
                  <AntTab label="Çalışanın Yetkinlik Gelişimi" {...a11yProps(1)} />
                </AntTabs>
                <TabPanel value={value} index={0}>
                  <div
                    style={{
                      marginTop: '15px',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '30px',
                      padding: '5px 10px',
                    }}
                  >
                    <EmployeeCard
                      name={employee.name}
                      avatar={
                        //Eğer kullanıcı resmi varsa buraya gelecek yoksa icon gelecek simdilik sadece icon gelecek şekilde ayarlandı//
                        <IoMdPerson
                          style={{
                            color: `rgba(128,128,128,1)`,
                            width: '50px',
                            height: '50px',
                            alignSelf: 'flex-start',
                          }}
                        />
                      }
                      position={position ? position?.name : "Pozisyon Bulunamadı"}
                      department={department ? department?.name : "Birim Bulunamadı"}
                      skills={competencyDepartmentList.filter((x) => x.competency_department_id === employee.department).length}
                      yearOfSeniority={!employeeDashboardState.job_start_date ? "" : `${differenceYear} Yıl, ${differenceMonth} Ay, ${differenceDay} Gün`}
                      period={employeeDashboardState.competency_evaluation_period}
                      positionId={employee.position}
                    />
                    <EmployeeCertificateCard rows={documentList.map((x) => ({
                      certificateName: x.document_name,
                      certificateExpirationDate: x.end_date ? new Date(x.end_date).toLocaleDateString() : "Süresiz"
                    }))} />
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: '30px',
                      padding: '5px 10px',
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
                            Başarı Düzeyine Göre İlk 5 Yetkinlik (%)
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
                        {listEmployeeCompetencyValue.filter((x) => x.competency_evaluation_period === employeeDashboardState.competency_evaluation_period)
                          .filter((x) => x.competency_target_value !== "no-target" && x.competency_real_value !== "")
                          .slice()
                          .sort((a, b) => {
                            const percentageA = (100 * Number(a.competency_real_value)) / Number(a.competency_target_value)
                            const percentageB = (100 * Number(b.competency_real_value)) / Number(b.competency_target_value)
                            return percentageB - percentageA
                          })
                          .slice(0, 5)
                          .map((competencyValue) => (
                            <Typography
                              variant="body2"
                              color="InfoText"
                              style={{ fontSize: '1rem' }}
                            >
                              <span
                                style={{
                                  color: 'rgba(128, 128, 128,1)',
                                }}>
                                <a style={{ cursor: 'pointer', color: 'rgba(57, 90, 192,1)', }}
                                  onClick={() => navigate("/app/competency-dashboard/view/" + competencyValue.competency_id + "/" + employeeDashboardState.competency_evaluation_period)}
                                >{competencyValue.competency_name}</a>
                              </span>
                              :
                              <LinearProgressWithLabel
                                value={(100 * Number(competencyValue.competency_real_value)) / Number(competencyValue.competency_target_value)}
                              />
                            </Typography>
                          ))}
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
                            Başarı Düzeyine Göre Tüm Yetkinlik Ortalamaları (%)
                          </Typography>}
                        style={{ borderBottom: '1px solid rgba(128, 128, 128, 0.2)' }}
                      />
                      <CardContent
                        style={{
                          display: 'flex',
                          justifyContent: 'space-around',
                          alignItems: 'center',
                          flexDirection: 'row',
                        }}
                      >
                        <Gauge
                          value={Math.floor(employeeGaugeValue)}
                          startAngle={-110}
                          endAngle={110}
                          width={200}
                          height={200}
                          cornerRadius="50%"
                          sx={(theme) => ({
                            [`& .${gaugeClasses.valueText}`]: {
                              fontSize: 40,
                            },
                            [`& .${gaugeClasses.valueArc}`]: {
                              fill: getColor(Math.floor(employeeGaugeValue)),
                            },
                            [`& .${gaugeClasses.referenceArc}`]: {
                              fill: theme.palette.text.disabled,
                            },
                          })}
                          text={({ value }) => `%${value}`}
                        />
                        <BarChart
                          series={[{
                            data: [employeeBarValue],
                            layout: "vertical",
                            color: "#1D5291"
                          }]}
                          xAxis={[
                            {
                              data: ["Ortalama"],
                              scaleType: "band",
                              tickLabelStyle: { margin: "0", padding: "0" },
                            },
                          ]}
                          yAxis={[
                            //min ve max number değeri min 0 max 5 olacak şekilde ayarla
                            {
                              min: 0,
                              max: barMaxValue,
                              tickLabelStyle: { margin: "0", padding: "0" },
                            },
                          ]}
                          width={300}
                          height={300}
                        />
                      </CardContent>
                    </Card>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      gap: '13px',
                      padding: '5px 10px',
                    }}
                  >
                    <Card
                      sx={{
                        width: `100%`, // 680'di
                        border: '0px',
                        boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
                        borderRadius: '8px',
                        paddingBottom: '35px',
                      }}
                    >
                      <CardHeader
                        title={
                          <Typography variant="h6" style={{ fontSize: '1rem' }}>
                            Aldığı Eğitimler
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
                        {education?.educationName == '' ? (
                          <h3>Tamamlanmış Eğitim Bulunmamaktadır</h3>
                        ) : (
                          <TableContainer component={Paper}>
                            <Table
                              sx={{ width: `100%` }}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>Eğitim Adı</TableCell>
                                  <TableCell align="center">
                                    Eğitim Gerçekleşme Tarihi
                                  </TableCell>
                                  <TableCell align="center">
                                    Eğitimi Veren
                                  </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {assignedEducationList.sort(
                                  (a, b) =>
                                    new Date(b.start_date).getTime() -
                                    new Date(a.start_date).getTime()
                                )
                                  .slice(0, 5)
                                  .map((education) => (
                                    <TableRow
                                      sx={{
                                        '&:last-child td, &:last-child th': {
                                          border: 0,
                                        },
                                      }}
                                    >
                                      <TableCell component="th" scope="row">
                                        {education.education_name}
                                      </TableCell>
                                      <TableCell align="center">
                                        {
                                          new Date(education.start_date)
                                            .toLocaleDateString()
                                        }
                                      </TableCell>
                                      <TableCell align="center">
                                        {education.educator_name}
                                      </TableCell>
                                    </TableRow>
                                  ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        )}
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                        width: `100%`, // 680'di
                        border: '0px',
                        boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
                        borderRadius: '8px',
                        paddingBottom: '35px',
                      }}
                    >
                      <CardHeader
                        title={
                          <Typography variant="h6" style={{ fontSize: '1rem' }}>
                            Daha Önce Görev Yaptığı Birimler
                          </Typography>
                        }
                        style={{ borderBottom: '1px solid rgba(128, 128, 128, 0.2)' }}
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
                                <TableCell>
                                  Daha Önce Çalıştığı Birim Adı
                                </TableCell>
                                <TableCell align="center">
                                  Çalışma Süresi
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {employeeLog.filter(
                                (x) =>
                                  x.position_name !==
                                  position.name
                              ).map((log) => (
                                <TableRow
                                  sx={{
                                    '&:last-child td, &:last-child th': {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell component="th" scope="row">
                                    {log.department_name}
                                  </TableCell>
                                  <TableCell align="center">
                                    {log.job_start_date ? new Date(log.job_start_date).toLocaleDateString() : ""} - ???
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <div
                    style={{
                      width: '100%',
                      height: '100vh',
                      display: 'flex',
                      gap: '20px',
                    }}
                  >
                    <div
                      style={{
                        borderRight: '1px solid rgba(128, 128, 128, 0.2)',
                        width: '30%',

                      }}
                    >
                      <SimpleTreeView
                        defaultExpandedItems={[employeeGroups.map((group) => group.group_id)[0]]}
                        defaultSelectedItems={[selectedCompetencyId]
                        }
                      >
                        {
                          employeeGroups.map((group) => (
                            <TreeItem itemId={group.group_id} label={group.group_name}>
                              {
                                group.competencies.map((competency) => (
                                  <TreeItem itemId={competency.competency_id} label={competency.competency_name} onClick={() => {
                                    setSelectedCompetency(competency);
                                    setSelectedCompetencyId(competency.competency_id);
                                    setSelectedEvaluationPeriod(competency.details.map((x) => x.competency_evaluation_period));
                                    setSelectedRealValue(competency.details.map((x) => x.competency_real_value));
                                    setSelectedTargetValue(competency.details.map((x) => x.competency_target_value));
                                  }} />
                                ))
                              }
                            </TreeItem>
                          ))
                        }
                      </SimpleTreeView>


                    </div>
                    <div
                      style={{
                        width: '70%',
                      }}
                    >
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "50px"
                      }}>
                        <h1 style={{
                          fontSize: "16px",
                          borderBottom: "1px solid rgba(128, 128, 128, 0.2)",
                          width: "100%",
                          textAlign: "center",
                          padding: "10px",
                        }}>
                          {selectedCompetency.competency_name}
                        </h1>
                        <FormControlLabel
                          value="start"
                          control={<Switch color="primary" />}
                          label="Sütun Grafiği"
                          labelPlacement="start"
                          onChange={() => setSwitchState(!switchState)}
                          style={{
                            width: "100%",
                          }}
                        />
                        {
                          switchState ? (
                            <EChartsReact
                              option={{
                                xAxis: {
                                  type: 'category',
                                  data: selectedEvaluationPeriod,
                                },
                                yAxis: {
                                  type: 'value',
                                },
                                series: [
                                  {
                                    name: 'Gerçek Değer',
                                    data: selectedRealValue,
                                    type: 'line',
                                    color: '#1D5291',
                                    stack: 'Total',
                                    label: {
                                      show: true,
                                      position: 'top',
                                    },

                                  },
                                  {
                                    name: 'Hedef Değer',
                                    data: selectedTargetValue,
                                    type: 'line',
                                    color: '#03fc73',
                                    label: {
                                      show: true,
                                      position: 'top',
                                    },
                                  },
                                ],
                                legend: {
                                  data: ['Gerçek Değer', 'Hedef Değer'],
                                  textStyle: {
                                    color: 'rgba(128, 128, 128, 1)',
                                  }
                                },
                                tooltip: {
                                  trigger: 'axis',
                                  axisPointer: {
                                    type: 'cross',
                                    label: {
                                      backgroundColor: '#6a7985',
                                    },
                                  }
                                }
                              }}
                              style={{
                                width: "100%",
                                height: "400px",
                              }}
                            />
                          )
                            : (
                              <EChartsReact
                                option={{
                                  xAxis: {
                                    type: 'category',
                                    data: selectedEvaluationPeriod,
                                  },
                                  yAxis: {
                                    type: 'value',
                                  },
                                  series: [
                                    {
                                      name: 'Gerçek Değer',
                                      data: selectedRealValue,
                                      type: 'bar',
                                      color: '#1D5291',
                                      stack: 'Total',
                                      label: {
                                        show: true,
                                        position: 'top',
                                      },
                                    },
                                    {
                                      name: 'Hedef Değer',
                                      data: selectedTargetValue,
                                      type: 'bar',
                                      color: '#03fc73',
                                      label: {
                                        show: true,
                                        position: 'top',
                                      },
                                    },
                                  ],
                                  legend: {
                                    data: ['Gerçek Değer', 'Hedef Değer'],
                                    textStyle: {
                                      color: 'rgba(128, 128, 128, 1)',
                                    }
                                  },
                                  tooltip: {
                                    trigger: 'axis'
                                  }
                                }
                                }
                                style={{
                                  width: "100%",
                                  height: "400px",
                                }}
                              />
                            )
                        }

                      </div>
                    </div>
                  </div>

                </TabPanel>

              </div>


            )
          )
        ).padding('0 20px')
      })
  }
}


