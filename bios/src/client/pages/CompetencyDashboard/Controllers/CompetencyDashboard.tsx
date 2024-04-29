// import { Query, Services, useGetMe } from '@realmocean/sdk'
// import {
//   HStack,
//   ReactView,
//   Spinner,
//   UIController,
//   UIView,
//   UIViewBuilder,
//   VStack,
//   cLeading,
//   cTop,
//   cTopLeading,
//   nanoid,
//   useNavigate,
//   useParams,
// } from '@tuval/forms'
// import React, { useState, useEffect } from 'react'
// import { IoSettings } from "react-icons/io5";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Typography,
// } from '@mui/material'
// import { Views } from '../../../components/Views'
// import PositionCard from '../Views/CompetencyCard'
// import AppInfo from '../../../../AppInfo';
// import Collections from '../../../../server/core/Collections';
// import OrganizationStructurePosition from '../../../../server/hooks/organizationStructrePosition/main';
// import OrganizationStructureEmployee from '../../../../server/hooks/organizationStructureEmployee/main';
// import OrganizationStructureEmployeeLog from '../../../../server/hooks/organizationStructureEmployeeLog/main';
// import LinearProgressWithLabel from '../../../components/LinearProgressWithLabel';
// import Competency from '../../../../server/hooks/competency/main';



// export class PositionDashboard extends UIController {
//   public LoadView(): UIView {
//     const navigate = useNavigate()
//     const { me, isLoading } = useGetMe('console')
//     const { id,period } = useParams()

//     const transformPeriodName = period.split("&").join(" ").split("C").join("Ç").split("i").join("ı").split("o").join("ö").split("Dönemı").join("Dönemi")


//     return isLoading
      
//       ? VStack(Spinner())
//       : UIViewBuilder(() => {

//           return VStack({ alignment: cTopLeading })(
//             HStack({ alignment: cLeading })(
//               Views.Title('Pozisyon Bazlı Dashboard').paddingTop('10px')
//             )
//               .height(70)
//               .shadow('rgb(0 0 0 / 5%) 0px 4px 2px -2px'),
//             HStack({ alignment: cTop })(
//               ReactView(
//                 <div
//                   style={{
//                     width: `100%`,
//                     height: '100vh',
//                     overflow: 'auto',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     gap: '20px',
//                     padding: '10px',
//                   }}
//                 >
//                   <div
//                     style={{
//                       marginTop: '15px',
//                       display: 'flex',
//                       flexDirection: 'row',
//                       gap: '30px',
//                     }}
//                   >
//                     <PositionCard
//                       positionName={
//                         positions.find((position) => position.id === id).name
//                       }
//                       avatar={
//                         //Eğer kullanıcı resmi varsa buraya gelecek yoksa icon gelecek simdilik sadece icon gelecek şekilde ayarlandı//
//                         <IoSettings
//                           style={{
//                             color: `rgba(128,128,128,1)`,
//                             width: '40px',
//                             height: '40px',
//                             alignSelf: 'flex-start',
//                           }}
//                         />
//                       }
//                       employeeValue= {
//                         employees.filter((employee) => employee.position_id === id).length
//                       }
//                       abilityCount={competencyLength}
//                       averageAbilityScore={competencyAverageValue.toString().slice(0, 3)}
//                     />

//                     <Card
//                       sx={{
//                         width: `50%`, // 680'di
//                         border: '0px',
//                         boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
//                         borderRadius: '8px',
//                         paddingBottom: '35px',
//                       }}
//                     >
//                       <CardHeader
//                         title={
//                           <Typography variant="h6" style={{ fontSize: '1rem' }}>
//                             Yetkinlik Düzeyi En Yüksek Pozisyon Sahipleri
//                           </Typography>
//                         }
//                         style={{
//                           borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
//                         }}
//                       />
//                       <CardContent
//                         style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           gap: '5px',
//                         }}
//                       >
//                           <TableContainer component={Paper}>
//                             <Table
//                               sx={{ width: `100%` }}
//                               aria-label="simple table"
//                             >
//                               <TableHead>
//                                 <TableRow>
//                                   <TableCell>Adı-Soyadı</TableCell>
//                                   <TableCell align="center">
//                                     Ortalama Yetkinlik Skoru
//                                   </TableCell>
//                                 </TableRow>
//                               </TableHead>
//                               <TableBody>
//                                 {
//                                   employeesList
//                                   .sort((a, b) => competencyAverageValues[b] - competencyAverageValues[a])
//                                   .slice(0,5)
//                                   .map((employeeId) => {
//                                     return (
//                                       <TableRow key={employeeId}>
//                                         <TableCell component="th" scope="row">
//                                           {
//                                             employees.find(employee => employee.$id === employeeId)?.first_name + ' ' + employees.find(employee => employee.$id === employeeId)?.last_name
//                                           }
//                                         </TableCell>
//                                         <TableCell align="center">
//                                         {competencyAverageValues[employeeId]?.toString().slice(0, 3) || 'N/A'} {/* Ortalama değeri kontrol et ve görüntüle veya 'N/A' (Not Available) yazdır */}
//                                         </TableCell>
//                                       </TableRow>
//                                     )
//                                   })
//                                 }
//                               </TableBody>
//                             </Table>
//                           </TableContainer>
//                       </CardContent>
//                     </Card>
//                   </div>

//                   <div
//                     style={{
//                       display: 'flex',
//                       flexDirection: 'row',
//                       gap: '30px',
//                     }}
//                   >
//                     <Card
//                       sx={{
//                         width: `50%`,
//                         border: '0px',
//                         boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
//                         borderRadius: '8px',
//                       }}
//                     >
//                       <CardHeader
//                         title={
//                           <Typography variant="h6" style={{ fontSize: '1rem' }}>
//                             Pozisyon Sahiplerinin En Çok Başarılı Olduğu Yetkinlikler
//                           </Typography>
//                         }
//                         style={{
//                           borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
//                         }}
//                       />
//                       <CardContent
//                         style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           gap: '5px',
//                         }}
//                       >
//                        {
//                           competencyData
//                           .sort((a, b) => b.average - a.average)
//                           .slice(0,5)
//                           .map((competency) => (
//                             <Typography
//                             variant="body2"
//                             color="InfoText"
//                             style={{ fontSize: '1rem' }}
//                           >
//                             <span
//                               style={{
//                                 color: 'rgba(128, 128, 128,1)',
//                               }}
//                             >
//                               {
//                                 competencyList.find((comp) => comp.competency_id === competency.competencyId).competency_name
//                               }
//                             </span>
//                             :
//                             <LinearProgressWithLabel
//                               value={
//                                 competency.average
//                               }
//                             />
//                           </Typography>
//                           ))

//                         }
//                       </CardContent>
//                     </Card>

//                     <Card
//                       sx={{
//                         width: `50%`,
//                         border: '0px',
//                         boxShadow: `-1px 0px 6px 0px rgba(0,0,0,0.2)`,
//                         borderRadius: '8px',
//                       }}
//                     >
//                       <CardHeader
//                         title={
//                           <Typography variant="h6" style={{ fontSize: '1rem' }}>
//                             Pozisyon Sahiplerinin En Az Başarılı Olduğu Yetkinlikler
//                           </Typography>
//                         }
//                         style={{
//                           borderBottom: '1px solid rgba(128, 128, 128, 0.2)',
//                         }}
//                       />
//                       <CardContent
//                         style={{
//                           display: 'flex',
//                           flexDirection: 'column',
//                           gap: '5px',
//                         }}
//                       >
//                         {
//                           competencyData
//                           .sort((a, b) => a.average - b.average)
//                           .slice(0,5)
//                           .map((competency) => (
//                             <Typography
//                             variant="body2"
//                             color="InfoText"
//                             style={{ fontSize: '1rem' }}
//                           >
//                             <span
//                               style={{
//                                 color: 'rgba(128, 128, 128,1)',
//                               }}
//                             >
//                               {
//                                 competencyList.find((comp) => comp.competency_id === competency.competencyId).competency_name
//                               }
//                             </span>
//                             :
//                             <LinearProgressWithLabel
//                               value={
//                                 competency.average
//                               }
//                             />
//                           </Typography>
//                           ))

//                         }

                        
//                       </CardContent>
//                     </Card>
//                   </div>
//                 </div>
//               )
//             )
//           ).padding('0 20px')
//         })
//   }
// }
