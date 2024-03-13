import React from "react";
import { RequiredRule, UIFormController, UIView, cLeading, cTop, Text, HStack, VStack, ReactView, State, useState, useEffect, useNavigate, Spinner, nanoid, } from "@tuval/forms";
import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField, Typography } from "@mui/material";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { trTR } from "@mui/x-data-grid";
import Form from "../../Competency/Views/Form";
import { Toast } from "../../../components/Toast";
import AppInfo from "../../../../AppInfo";
import Swal from "sweetalert2";


export class UpdateMachineController extends UIFormController {

    @State()
    private departments: any[];

    @State()
    private selectedCompetencies: any[];

    @State()
    private competencies: any[];

    @State()
    private id: string;

    // protected BindRouterParams({ machine_id }): void {
    //     const orgService = useOrgProvider();
    //     Promise.all([
    //         PolivalansBrokerClient.GetMachineById(machine_id),
    //         orgService.getDepartments(),
    //     ]).then((results) => {
    //         const [machine, departments] = results;
    //         this.SetValue("code", machine.code)
    //         this.SetValue("name", machine.name)
    //         this.SetValue("difficulty_coefficient", machine.difficulty_coefficient)
    //         this.SetValue("departmentId", machine.department_id)
    //         this.id = machine.id;
    //         this.SetValue("is_active_machine", machine.is_active_machine)
    //         // Set selected competencies to machine competencies like this { value: item.competency_id, label: item.competency_name }
    //         machine.competencies != null && machine.competencies.length > 0 ? this.selectedCompetencies = machine.competencies.map((item) => {
    //             return item.competency_id
    //         })
    //             : this.selectedCompetencies = [];
    //         this.departments = departments;
    //         PolivalansBrokerClient.GetCompetencyByIdIfNotSelectedForEditMachine(machine.department_id, machine.id).then((res) => {
    //             this.competencies = res.map((item) => {
    //                 return { id: item.competency_id, label: item.competency_name }
    //             })
    //         })
    //     })
    // }

    public LoadView(): UIView {
        return (VStack())

        // const navigate = useNavigate();
        // const { id } = useParams();

        // const { me, isLoading } = useGetMe("console");
        // const { competency, isLoadingCompetency } = Competency.Get(id)
        // const { updateCompetency } = Competency.Update();

        // const { departments, isLoadingDepartments } = OrganizationStructureDepartment.GetList(me?.prefs?.organization);
        // const { groups, isLoadingGroups } = CompetencyGroup.GetList(me?.prefs?.organization);

        // const { parameters: lineBased, isLoading: isLoadingParameter } = Parameters.GetParameterByName(Resources.ParameterLocalStr.line_based_competency_relationship, me?.prefs?.organization)
        // const { createCompetencyLineRelation, error, isError, isLoading: isLoadingCreateLineRelation, isSuccess } = CompetencyLineRelation.Create();
        // const { competencyLineRelation, isLoading: isLoadingCompetencyLineRelation } = CompetencyLineRelation.GetByCompetencyId(id, me?.prefs?.organization);
        // const { updateCompetencyLineRelation } = CompetencyLineRelation.Update();

        // // lines
        // const { lines, isLoadingLines } = OrganizationStructureLine.GetList(me?.prefs?.organization);

        // const { competencyDepartments, isLoadingCompetencyDepartments } = CompetencyDepartment.GetByCompetencyId(competency?.competency_id);
        // const { updateCompetencyDepartment } = CompetencyDepartment.Update();
        // const { createCompetencyDepartment } = CompetencyDepartment.CreateCompetencyDepartment();



        // return (
        //     isLoading || isLoadingCompetency || isLoadingDepartments ||
        //         isLoadingGroups || isLoadingCompetencyDepartments || isLoadingCompetencyLineRelation ||
        //         isLoadingLines || isLoadingParameter ? VStack(Spinner()) :
        //         UIViewBuilder(() => {

        //             const [form, setForm] = useState<ICompetency.ICompetency>(formReset)
        //             const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
        //             const [isActive, setIsActive] = useState<boolean>(true);

        //             const [selectedLines, setSelectedLines] = useState<string[]>([]);

        //             const lineColumns: GridColDef[] = [
        //                 {
        //                     field: "name",
        //                     headerName: "Hat Adı",
        //                     flex: 1,
        //                 },
        //                 {
        //                     field: "department_name",
        //                     headerName: "Bağlı Olduğu Departman",
        //                     flex: 1,
        //                 }
        //             ]


        //             const departmentColumns: GridColDef[] = [
        //                 {
        //                     field: "name",
        //                     headerName: "Departman Adı",
        //                     flex: 1,
        //                 }
        //             ];

        //             useEffect(() => {
        //                 setForm(removeDollarProperties(competency))
        //                 setSelectedDepartments(competencyDepartments.map((department) => department.competency_department_id))
        //                 if (lineBased[0]?.is_active) {
        //                     setSelectedLines(competencyLineRelation.map((line) => line.line_id))
        //                 }
        //                 setIsActive(competency.is_active_competency)
        //             }, [])

        //             const handleChangeGroup = (e: SelectChangeEvent<string>) => {
        //                 const group = groups.find((group) => group.competency_group_id === e.target.value)
        //                 setForm({
        //                     ...form,
        //                     [e.target.name as string]: e.target.value,
        //                     competency_group_name: group?.competency_group_name
        //                 })
        //             }

        //             const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        //                 setForm({
        //                     ...form,
        //                     [e.target.name as string]: e.target.value
        //                 })
        //             }

        //             const onSubmit = (e) => {
        //                 e.preventDefault();
        //                 Toast.fire({
        //                     icon: "info",
        //                     title: "Yetkinlik düzenleniyor...",
        //                     timer: 5000,
        //                 })
        //                 competencyDepartments.map((department) => {
        //                     if (!selectedDepartments.includes(department.competency_department_id)) {
        //                         updateCompetencyDepartment({
        //                             databaseId: AppInfo.Database,
        //                             collectionId: "competency_department",
        //                             documentId: department.$id,
        //                             data: {
        //                                 ...removeDollarProperties(department),
        //                                 is_deleted: true
        //                             }
        //                         })
        //                     }
        //                 })

        //                 if (lineBased[0]?.is_active) {
        //                     competencyLineRelation.map((line) => {
        //                         if (!selectedLines.includes(line.line_id)) {
        //                             updateCompetencyLineRelation({
        //                                 databaseId: AppInfo.Database,
        //                                 collectionId: "competency_line_relation",
        //                                 documentId: line.$id,
        //                                 data: {
        //                                     ...removeDollarProperties(line),
        //                                     is_deleted: true
        //                                 }
        //                             })
        //                         }
        //                     })
        //                 }

        //                 selectedDepartments.map((department) => {
        //                     if (!competencyDepartments.map((department) => department.competency_department_id).includes(department)) {
        //                         const createDepId = nanoid();
        //                         createCompetencyDepartment({
        //                             documentId: createDepId,
        //                             data: {
        //                                 competency_department_table_id: createDepId,
        //                                 competency_department_id: department,
        //                                 competency_department_name: departments.find((dep) => dep.id === department).name,
        //                                 competency_id: id,
        //                                 tenant_id: me?.prefs?.organization
        //                             }
        //                         })
        //                     }
        //                 })

        //                 if (lineBased[0]?.is_active) {
        //                     selectedLines.map((line) => {
        //                         if (!competencyLineRelation.map((line) => line.line_id).includes(line)) {
        //                             const createLineId = nanoid();
        //                             createCompetencyLineRelation({
        //                                 documentId: createLineId,
        //                                 data: {
        //                                     id: createLineId,
        //                                     competency_id: id,
        //                                     competency_target_value: "",
        //                                     line_id: line,
        //                                     tenant_id: me?.prefs?.organization
        //                                 }
        //                             })
        //                         }
        //                     })
        //                 }

        //                 updateCompetency({
        //                     databaseId: AppInfo.Database,
        //                     collectionId: "competency",
        //                     documentId: id,
        //                     data: form
        //                 }, () => {
        //                     Toast.fire({
        //                         icon: "success",
        //                         title: "Yetkinlik başarıyla düzenlendi."
        //                     });
        //                     navigate("/app/competency/list");
        //                 })
        //             }

        //             const onCancel = () => {
        //                 navigate("/app/competency/list");
        //             }

        //             const onDelete = () => {
        //                 Swal.fire({
        //                     title: "Yetkinlik Silme",
        //                     text: "Yetkinliği silmek istediğinize emin misiniz?",
        //                     icon: "warning",
        //                     showCancelButton: true,
        //                     confirmButtonText: "Sil",
        //                     cancelButtonText: "İptal",
        //                     confirmButtonColor: "#d33",
        //                     cancelButtonColor: "#3085d6"
        //                 }).then((result) => {
        //                     if (result.isConfirmed) {
        //                         Toast.fire({
        //                             icon: "info",
        //                             title: "Yetkinlik siliniyor...",
        //                             timer: 5000,
        //                         })
        //                         updateCompetency({
        //                             databaseId: AppInfo.Database,
        //                             collectionId: "competency",
        //                             documentId: id,
        //                             data: {
        //                                 ...form,
        //                                 is_deleted_competency: true
        //                             }
        //                         }, () => {
        //                             Toast.fire({
        //                                 icon: "success",
        //                                 title: "Yetkinlik başarıyla silindi."
        //                             });
        //                             navigate("/app/competency/list");
        //                         })
        //                     }
        //                 })
        //             }

        //             return (
        //                 VStack({ alignment: cTop })(
        //                     ReactView(
        //                         <Form
        //                             title="Tanımlı Yetkinliği Düzenleyin"
        //                             form={
        //                                 <form
        //                                     onSubmit={onSubmit}
        //                                     style={{
        //                                         display: "flex",
        //                                         flexDirection: "column",
        //                                         gap: "10px",
        //                                         width: "60%",
        //                                         height: "calc(100vh - 200px)",
        //                                     }}>
        //                                     <TextField name="competency_name" label="Yetkinlik Adı" variant="outlined" fullWidth size="small" value={form.competency_name} onChange={handleChange} required />
        //                                     <FormControl fullWidth size="small" required>
        //                                         <InputLabel>Yetkinlik Grubu</InputLabel>
        //                                         <Select
        //                                             name="competency_group_id"
        //                                             value={form.competency_group_id}
        //                                             label="Yetkinlik Grubu"
        //                                             onChange={handleChangeGroup}
        //                                             size="small"
        //                                         >
        //                                             {groups.map((group) => (
        //                                                 <MenuItem value={group.competency_group_id} key={group.competency_group_id}>{group.competency_group_name}</MenuItem>
        //                                             ))}
        //                                         </Select>
        //                                     </FormControl>
        //                                     <div style={{
        //                                         height: "280px",
        //                                         width: "100%",
        //                                         display: "flex",
        //                                         flexDirection: "column",
        //                                         gap: "5px",
        //                                     }}>
        //                                         <Typography variant="button" sx={{ marginLeft: "10px" }}>Yetkinlik Departmanları</Typography>
        //                                         <StyledDataGrid
        //                                             rows={departments}
        //                                             columns={departmentColumns}
        //                                             localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        //                                             isCellEditable={() => false}
        //                                             disableRowSelectionOnClick
        //                                             checkboxSelection
        //                                             rowSelectionModel={selectedDepartments}
        //                                             onRowSelectionModelChange={(newRowSelectionModel: any) => {
        //                                                 setSelectedDepartments(newRowSelectionModel)
        //                                             }}
        //                                             rowHeight={30}
        //                                             columnHeaderHeight={30}
        //                                         />
        //                                     </div>
        //                                     {
        //                                         lineBased[0]?.is_active &&
        //                                         <div style={{
        //                                             height: "280px",
        //                                             width: "100%",
        //                                             display: "flex",
        //                                             flexDirection: "column",
        //                                             gap: "5px",
        //                                         }}>
        //                                             <Typography variant="button" sx={{ marginLeft: "10px" }}>Yetkinlik Hatları</Typography>
        //                                             <StyledDataGrid
        //                                                 // çoklu id ye göre filtreleme yapılacak
        //                                                 rows={lines.filter((line) => selectedDepartments.indexOf(line.department_id) > -1)}
        //                                                 columns={lineColumns}
        //                                                 localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
        //                                                 isCellEditable={() => false}
        //                                                 disableRowSelectionOnClick
        //                                                 checkboxSelection
        //                                                 onRowSelectionModelChange={(newRowSelectionModel: any) => {
        //                                                     setSelectedLines(newRowSelectionModel)
        //                                                 }}
        //                                                 rowSelectionModel={selectedLines}
        //                                                 rowHeight={30}
        //                                                 columnHeaderHeight={30}
        //                                             />
        //                                         </div>
        //                                     }
        //                                     <FormControlLabel
        //                                         sx={{ width: "100%", alignContent: "end", padding: "0 5px 0 0" }}
        //                                         onChange={(e: any) => setForm({ ...form, is_active_competency: e.target.checked })}
        //                                         control={<Switch color="primary" checked={form.is_active_competency} />}
        //                                         label="Aktif mi?"
        //                                         labelPlacement="start"
        //                                     />
        //                                     <div style={{
        //                                         display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
        //                                     }}>
        //                                         <Button type="submit" variant="contained" color="primary" size="small">Kaydet</Button>
        //                                         {
        //                                             !isActive &&
        //                                             <Button variant="contained" color="error" size="small" onClick={onDelete}>Sil</Button>

        //                                         }
        //                                         <Button variant="contained" color="info" size="small" onClick={onCancel}>İptal</Button>
        //                                     </div>
        //                                 </form>
        //                             }
        //                         />
        //                     )
        //                 ).padding("30px 20px")
        //             )
        //         })
        // )
    }

}