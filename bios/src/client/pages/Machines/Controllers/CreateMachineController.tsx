import React from "react";
import Select from 'react-select'
import { Button, HStack, ReactView, RequiredRule, Spinner, State, Text, UIFormController, UIView, VStack, cCenter, cLeading, cTop, useEffect, useNavigate, useState, MaskTypes } from "@tuval/forms";
import { TextField } from "@mui/material";
import OrganizationStructureDepartment from "../../../../server/hooks/organizationStructureDepartment/main";
import { useGetMe } from "@realmocean/sdk";


// export class CreateMachineController extends UIFormController {


//     public LoadView(): UIView {

//         const navigate = useNavigate();

//         const { me, isLoading } = useGetMe("console");
//         const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization)

//         const [isMachineBased, setMachineBased] = useState(false)

//         const [competencies, setCompetencies] = useState([])

//         const [selectLoading, setSelectLoading] = useState(false)

//         const [loadingCounter, setLoadingCounter] = useState<string>("")

//         const maxValue = 1
//         const minValue = 0.1

//         const getCompetencies = () => {
//             if (loadingCounter != this.GetValue("departmentId")) {
//                 setSelectLoading(true)
//                 PolivalansBrokerClient.GetCompetencyByIdIfNotSelectedForMachine(this.GetValue("departmentId")).then((res) => {
//                     let value = res.map((item) => {
//                         return { value: item.competency_id, label: item.competency_name }
//                     })
//                     setCompetencies(value)
//                     setSelectLoading(false)
//                 })
//                 setLoadingCounter(this.GetValue("departmentId"))
//             }
//         }

//         const createMachine = () => {
//             let stateObj = {
//                 department_id: this.GetValue("departmentId"),
//                 code: this.GetValue("code"),
//                 name: this.GetValue("name"),
//                 difficulty_coefficient: this.GetValue("difficulty_coefficient"),
//                 competencies: this.GetValue("selectedCompetencies")

//             }
//             PolivalansBrokerClient.GetMachineByCodeAndTenantId(stateObj.code).then((res) => {
//                 if (res) {
//                     Views.Toast.fire({
//                         icon: 'error',
//                         title: 'Bu makine kodu daha önce kullanılmıştır.'
//                     })
//                 }
//                 else {
//                     PolivalansBrokerClient.CreateMachineWithCompetencies(stateObj).then((res) => {
//                         if (res) {
//                             navigate("/app/com.pedasoft.app.pedavalans/machines/list")
//                         }
//                     })
//                 }
//             })
//         }

//         useEffect(() => {
//             setMachineBased(localStorage.getItem("pedavalans_machine_based") == "true" ? true : false)
//         }, [])

//         return (
//             VStack({ alignment: cTop })(
//                 isMachineBased ?
//                     VStack({ alignment: cTop, spacing: 20 })(
//                         HStack({ alignment: cTop })(
//                             Views.PedaText("Makine Ekle").fontSize(28).paddingTop("40px")
//                         ).paddingBottom("50px"),
//                         VStack({ alignment: cLeading })(
//                             UITextBoxView()
//                                 .floatlabel(false)
//                                 .width('100%')
//                                 .placeholder('Makine Kodu')
//                                 .formField('code', [new RequiredRule('Makine Kodu zorunludur.')]),
//                         ).width(400),
//                         VStack({ alignment: cLeading })(
//                             UITextBoxView()
//                                 .floatlabel(false)
//                                 .width('100%')
//                                 .placeholder('Makine Adı')
//                                 .formField('name', [new RequiredRule('Makine Adı zorunludur.')]),
//                         ).width(400),
//                         VStack({ alignment: cLeading })(
//                             Text("Makine Zorluk Katsayısı").fontSize("12px").fontWeight("500").foregroundColor("#343a40"),
//                             ReactView(
//                                 <div style={{ width: "100%" }}>
//                                     <TextField
//                                         type="number"
//                                         style={{ width: "100%", height: "32px", background: "white" }}
//                                         size="small"
//                                         InputProps={{
//                                             inputProps: {
//                                                 step: 0.1,
//                                             },
//                                         }}
//                                         onChange={(e) => {
//                                             setTimeout(() => {
//                                                 if (Number(e.target.value) > maxValue) {
//                                                     e.target.value = maxValue.toString()
//                                                     this.SetValue("difficulty_coefficient", maxValue.toString())
//                                                 }
//                                                 else if (Number(e.target.value) < minValue) {
//                                                     e.target.value = minValue.toString()
//                                                     this.SetValue("difficulty_coefficient", minValue.toString())
//                                                 }
//                                                 else {
//                                                     this.SetValue("difficulty_coefficient", e.target.value)
//                                                 }
//                                             }, 800)
//                                         }}
//                                     />
//                                 </div>
//                             )
//                         ).width(400),
//                         VStack({ alignment: cLeading })(
//                             Text("Departman").fontSize("12px").fontWeight("500").foregroundColor("#343a40"),
//                             UIDropdownListView()
//                                 .placeHolder('Departman Seçiniz')
//                                 .formField('departmentId', [new RequiredRule('Departman zorunludur.')])
//                                 .fields({ text: "Name", value: "Id" })
//                                 .dataSource(this.departments)
//                                 .width("100%")
//                         ).width(400).paddingBottom("20px"),
//                         VStack({ alignment: cLeading })(
//                             Text("Yetkinlikler").fontSize("12px").fontWeight("500").foregroundColor("#343a40"),
//                             ReactView(
//                                 <div style={{ width: "100%" }}>
//                                     <Select options={competencies}
//                                         onMenuOpen={() => { getCompetencies() }}
//                                         isMulti
//                                         closeMenuOnSelect={false}
//                                         placeholder="Yetkinlik Seçiniz"
//                                         isLoading={selectLoading}
//                                         onChange={(e) => {
//                                             this.SetValue("selectedCompetencies", e.map(function (obj) {
//                                                 return obj.value;
//                                             }))
//                                         }}
//                                     />
//                                 </div>
//                             )
//                         ).width(400),
//                         HStack({ alignment: cTop, spacing: 20 })(
//                             Button(Text("Kaydet")).width(100).onClick(() => {
//                                 createMachine()
//                             }),
//                             Button(Text("Vazgeç")).width(100).onClick(() => {
//                                 navigate("/app/machines/list")
//                             }).background({ default: "#d83a52", hover: "#b63546" })
//                         ).paddingTop("50px")
//                     ).height().marginTop("20px")
//                     :
//                     VStack({ spacing: 20, alignment: cCenter })(
//                         Spinner()
//                     )
//             )
//         )
//     }
// }