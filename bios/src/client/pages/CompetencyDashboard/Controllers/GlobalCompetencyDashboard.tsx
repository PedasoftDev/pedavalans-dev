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
  Typography,
} from '@mui/material'
import { Views } from '../../../components/Views'
import AppInfo from '../../../../AppInfo';
import Collections from '../../../../server/core/Collections';
import CompetencyCard from '../Views/CompetencyCard';
import Competency from '../../../../server/hooks/competency/main';
import CompetencyDepartment from '../../../../server/hooks/competencyDepartment/main';
import OrganizationStructureEmployee from '../../../../server/hooks/organizationStructureEmployee/main';
import { BarChart } from '@mui/x-charts';
import { Bar } from 'recharts';
import { DataGrid, GridColDef } from '@mui/x-data-grid';




export class GlobalCompetencyDashboard extends UIController {
  public LoadView(): UIView {
    
    const { me, isLoading } = useGetMe('console')
    const { id} = useParams()

    const {competencyList,isLoadingCompetencyList} = Competency.GetList(me?.prefs?.organization)
    const {competencyDepartments,isLoadingCompetencyDepartments} = CompetencyDepartment.GetByCompetencyId(id)
    const {employees,isLoadingEmployees} = OrganizationStructureEmployee.GetList(me?.prefs?.organization)

    const [positionLength, setPositionLength] = useState(0)

    const [avarageCompetencyValue, setAvarageCompetencyValue] = useState("")

    const [departmentAverages, setDepartmentAverages]   = useState([
        { departmentId: "", average: 0 }
    
    ])

    const [departmens, setDepartmens] = useState([
        { employee_id: "", competency_department_id: "", failed_count: 0, department_name: "" }
    ])

    const columns: GridColDef[] = [
        {
          field: 'competency_department_name',
          headerName: 'Birim Adı',
          width: 150,
          editable: false, 
          flex: 2,
        
        },
        {
          field: 'failed_count',
          headerName: 'Geliştirilmesi Gereken Personel Sayısı',
          type: 'number',
          width: 150,
          editable: false,
          flex: 1,
        },
      ];

      function filterUnique(array) {
        const seen = {};
        return array.filter(item => {
            return seen.hasOwnProperty(item) ? false : (seen[item] = true);
        });
    }
   return isLoading || isLoadingCompetencyList || isLoadingCompetencyDepartments || isLoadingEmployees
      
      ? VStack(Spinner())
      : UIViewBuilder(() => {
        useEffect(() => {
            Services.Databases.listDocuments(
                AppInfo.Name,
                AppInfo.Database,
                Collections.EmployeeCompetencyValue,
                [
                    Query.limit(10000),
                    Query.equal("competency_id", id)
                ]
            ).then((response) => {
                let totalValue = 0
                response.documents.forEach((element) => {
                    totalValue += Number(element.competency_real_value)
                });
                setAvarageCompetencyValue((totalValue / response.documents.length).toLocaleString().slice(0, 3)) 
             }).then(() => {
                Services.Databases.listDocuments(
                    AppInfo.Name,
                    AppInfo.Database,
                    Collections.EmployeeCompetencyValue,
                    [
                        Query.limit(10000),
                        Query.equal("competency_id", id)
                    ]
                ).then((response) => { 
                    const departmentTotals = {};
                    const departmentCounts = {};

                    response.documents.forEach(doc => {
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
                        averages.push( { departmentId, average});
                    }
                    setDepartmentAverages(averages);
                    console.log(averages)
                    })
             }).then(() => {
                Services.Databases.listDocuments(
                    AppInfo.Name,
                    AppInfo.Database,
                    Collections.EmployeeCompetencyValue,
                    [
                        Query.limit(10000),
                        Query.equal("competency_id", id)
                    ]
                    ).then((response) => {
                        const departmentCounts = {};

                        response.documents.forEach(doc => {
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
                            const department_name = response.documents.find(doc => doc.competency_department_id === departmentId).competency_department_name;
                            departments.push({ departmentId, failed_count, department_name   });
                        }
                        setDepartmens(departments);
                        console.log(departments)

                    })
             }).then(() => {
                Services.Databases.listDocuments(
                    AppInfo.Name,
                    AppInfo.Database,
                    Collections.EmployeeCompetencyValue,
                    [
                        Query.limit(10000),
                        Query.equal("competency_id", id)
                    ]
                ).then((response) => {
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
        }, [])

          return VStack({ alignment: cTopLeading })(
            HStack({ alignment: cLeading })(
              Views.Title('Yetkinlik Bazlı Dashboard').paddingTop('10px')
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
                      competencyName={
                        competencyList.find((competency) => competency.competency_id === id)?.competency_name
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
                      employeeValue= {
                        employees.filter((employee) => competencyDepartments.map((competencyDepartment) => competencyDepartment.competency_department_id).includes(employee.department_id)).length
                        
                      }
                      positionValue={
                        positionLength
                    }
                      departmantValue={
                        competencyDepartments.length
                      }
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
                        <BarChart
                            series={[{ data: departmentAverages.sort(
                                (a, b) => a.average - b.average
                            ).map((x) => x.average),color: "#1D5291", layout: "horizontal"}]}
                            height={300}
                            yAxis={[{data: departmentAverages.map((x) => competencyDepartments.find((competencyDepartment) => competencyDepartment.competency_department_id === x.departmentId)?.competency_department_name),
                        scaleType: "band" }]}
                            margin={{ top: 10, bottom: 30, left: 120, right: 30 }}
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
                            Bu Yetkinlik Özelinde Gelişime İhtiyacı Olan Birimler
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
                                rows={
                                    departmens.sort((a, b) => b.failed_count - a.failed_count)              
                                    .map((department) => ({
                                        id: nanoid(),
                                        competency_department_name: department.department_name,
                                        failed_count: department.failed_count
                                    }))
                                    
                                }
                                columns={columns}
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
