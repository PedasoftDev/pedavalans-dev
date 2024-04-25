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
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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


export class EmployeeDashboard extends UIController {
  public LoadView(): UIView {
    const navigate = useNavigate()
    const { me, isLoading } = useGetMe('console')
    const { id, period } = useParams()

    const { departments, isLoadingDepartments } =
      OrganizationStructureDepartment.GetList(me?.prefs?.organization)

    const { positions, isLoadingPositions } =
      OrganizationStructurePosition.GetList(me?.prefs?.organization)

    const { competencyDepartmentList, isLoadingCompetencyDepartmentList } =
      CompetencyDepartment.GetList(me?.prefs?.organization)

    const {
      listEmployeeCompetencyValue,
      isLoadingListEmployeeCompetencyValue,
    } = EmployeeCompetencyValue.List()

    const { assignedEducationList, isLoadingAssignedEducationList } =
      AssignEducation.GetList(me?.prefs?.organization)

    const { employees, isLoadingEmployees } =
      OrganizationStructureEmployee.GetList(me?.prefs?.organization)

    const {employeeLog,isLoadingEmployeeLog} = OrganizationStructureEmployeeLog.List(me?.prefs?.organization)



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




    const transformPeriodName = period.split("&").join(" ").split("C").join("Ç").split("i").join("ı").split("o").join("ö").split("Dönemı").join("Dönemi")

    return isLoading ||
      isLoadingDepartments ||
      isLoadingPositions ||
      isLoadingCompetencyDepartmentList ||
      isLoadingListEmployeeCompetencyValue ||
      isLoadingAssignedEducationList ||
      isLoadingEmployees || isLoadingEmployeeLog
      
      ? VStack(Spinner())
      : UIViewBuilder(() => {
          useEffect(() => {
            Services.Databases.listDocuments(
              AppInfo.Name,
              AppInfo.Database,
              Collections.OrganizationStructureEmployee,
              [Query.limit(10000), Query.equal('$id', id)]
            )
              .then((res) => {
                setEmployee({
                  name:
                    res.documents[0].first_name +
                    ' ' +
                    res.documents[0].last_name,
                  avatar: null,
                  position: res.documents[0].position_id,
                  department: res.documents[0].department_id,
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
                  [Query.limit(10000), Query.equal('employee_id', id), Query.equal('competency_evaluation_period', transformPeriodName)]
                ).then((res) => {
                  let totalValue = 0
                  let totalTargetValue = 0
                  res.documents.forEach((element) => {
                    totalValue += Number(element.competency_real_value)
                    totalTargetValue += Number(element.competency_target_value)
                  })
                  const averagePercentage =
                    (100 * totalValue) / totalTargetValue || 0
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
                Services.Databases.listDocuments(
                  AppInfo.Name,
                  AppInfo.Database,
                  Collections.AssignedEducation,
                  [
                    Query.limit(10000),
                    Query.equal('employee_id', id),
                    Query.equal('status', 'completed'),
                  ]
                ).then((res) => {
                  setEducation({
                    educationName: res.documents[0].education_name,
                  })
                })
              })

          }, [])

          //Çalışanın birimdeki toplam kidem süresini hesaplar
          const employeeDateStr = employees.find((x) => x.$id === id)?.job_start_date;
          const date = new Date(employeeDateStr);
          const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

          const today = new Date();
          const differenceMilliSecond = today.getTime() - date.getTime();
          const differenceYear = Math.floor(differenceMilliSecond / (1000 * 60 * 60 * 24 * 365.25));
          const differenceMonth = Math.floor((differenceMilliSecond % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
          const differenceDay = Math.floor((differenceMilliSecond % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));

          //Çalışanın birimdeki toplam kidem süresini hesaplar

          //Çalışanın birimdeki çalısma süresini hesaplar
          // const employeePozitionWorkDate = employeeLog.filter((x) => x.employee_id === id).filter((x) => x.position_name === positions.find((x) => x.id === employee.position)?.name).log_date
          // const employeeDate = new Date(employeePozitionWorkDate).toLocaleDateString();
          // const formattedEmployeeDate = `${employeeDate.getDate()}/${employeeDate.getMonth() + 1}/${employeeDate.getFullYear()}`;

          // const todayDay = new Date();
          // const differenceEmployeeMilliSecond = todayDay.getTime() - employeeDate.getTime();
          // const differenceEmployeeYear = Math.floor(differenceEmployeeMilliSecond / (1000 * 60 * 60 * 24 * 365.25));
          // const differenceEmployeeMonth = Math.floor((differenceEmployeeMilliSecond % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.4375));
          // const differenceEmployeeDay = Math.floor((differenceEmployeeMilliSecond % (1000 * 60 * 60 * 24 * 30.4375)) / (1000 * 60 * 60 * 24));

          //Çalışanın toplam kıdem süresini hesaplar


          return VStack({ alignment: cTopLeading })(
            HStack({ alignment: cLeading })(
              Views.Title('Özet Bilgiler').paddingTop('10px')
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
                      position={
                        positions.find((x) => x.id === employee.position)?.name
                      }
                      department={
                        departments.find((x) => x.id === employee.department)
                          ?.name
                      }
                      skills={
                        competencyDepartmentList.filter(
                          (x) =>
                            x.competency_department_id === employee.department
                        ).length
                      }
                      startDate={
                        new Date(employees.find((x) => x.$id === id)?.job_start_date).toLocaleDateString()
                           }
                      experience={`${differenceYear} Yıl, ${differenceMonth} Ay, ${differenceDay} Gün`}
                      yearOfSeniority={`${differenceYear} Yıl, ${differenceMonth} Ay, ${differenceDay} Gün`}
                    />
                    <EmployeeCertificateCard />
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
                        width: 650,
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
                        {listEmployeeCompetencyValue
                          .filter((x) => x.employee_id === id)
                          .filter((x) => x.competency_evaluation_period === transformPeriodName)
                          .slice()
                          .sort((a, b) => {
                            const percentageA =
                              (100 * Number(a.competency_real_value)) /
                              Number(a.competency_target_value)
                            const percentageB =
                              (100 * Number(b.competency_real_value)) /
                              Number(b.competency_target_value)
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
                                }}
                              >
                                {competencyValue.competency_name}
                              </span>
                              :
                              <LinearProgressWithLabel
                                value={
                                  (100 *
                                    Number(
                                      competencyValue.competency_real_value
                                    )) /
                                  Number(
                                    competencyValue.competency_target_value
                                  )
                                }
                              />
                            </Typography>
                          ))}
                      </CardContent>
                    </Card>

                    <Card
                      sx={{
                        width: 380,
                        border: '0px',
                        boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
                        borderRadius: '8px',
                      }}
                    >
                      <CardHeader
                        title={
                          <Typography variant="h6" style={{ fontSize: '1rem' }}>
                            Başarı Düzeyine Göre Tüm Yetkinlik Ortalamaları (%)
                          </Typography>
                        }
                        style={{
                          borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
                        }}
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
                        {education.educationName == '' ? (
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
                                {assignedEducationList
                                  .filter((x) => x.employee_id === id)
                                  .filter((x) => x.status === 'completed')
                                  .sort(
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
                                        {education.start_date}
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
                                <TableCell>
                                  Daha Önce Çalıştığı Birim Adı
                                </TableCell>
                                <TableCell align="center">
                                  Çalışma Süresi
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {employeeLog
                                .filter((x) => x.employee_id === id)
                                .filter(
                                  (x) =>
                                    x.position_name !==
                                    positions.find(
                                      (x) => x.id === employee.position
                                    )?.name
                                )
                                .map((log) => (
                                  <TableRow
                                    sx={{
                                      '&:last-child td, &:last-child th': {
                                        border: 0,
                                      },
                                    }}
                                  >
                                    <TableCell component="th" scope="row">
                                      {log.position_name}
                                    </TableCell>
                                    <TableCell align="center">
                                      {log.job_start_date} - ???
                                    </TableCell>
                                  </TableRow>
                                ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
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
