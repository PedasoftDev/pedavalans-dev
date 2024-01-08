import {
    cLeading,
    cTop,
    HStack,
    ReactView,
    RequiredRule,
    Spinner,
    State,
    Text,
    Toggle,
    UIButton,
    UIFormController,
    UIRouteLink,
    UIView,
    useNavigate,
    VStack,
  } from '@tuval/forms';
  import React, { useState, useEffect } from 'react';
  import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
  
//   const formState: ICompetencyGroups.ICreateCompetencyGroup = {
//     competency_group_name: "",
//     competency_grade_id: "",
//     competency_grade_name: "",
//     is_active_group: "true",
//   }
  
  export class AddCompetencyGroupController extends UIFormController {
  
    @State()
    private isLoading: boolean;
  
    protected BindRouterParams(): void {
      this.isLoading = true;
    }
  
    public LoadView(): UIView {
  
      const navigate = useNavigate();
  
    //   const [form, setForm] = React.useState(formState);
  
    //   const [competencyGrades, setCompetencyGrades] = useState<IGetCompetencyGradeResponse[]>([]);
  
    //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setForm({ ...form, [e.target.name]: e.target.value })
    //   }
  
    //   const handleSelectGrade = (e: SelectChangeEvent<string>) => {
    //     setForm({
    //       ...form,
    //       [e.target.name]: e.target.value,
    //       competency_grade_name: competencyGrades.find((grade) => grade.competency_grade_id === e.target.value)?.competency_grade_name
    //     })
    //   }
  
  
    //   const onSubmit = (e: any) => {
    //     e.preventDefault();
    //     Views.Toast.fire({
    //       icon: "info",
    //       title: "Yetkinlik Grubu Oluşturuluyor"
    //     })
    //     PolivalansBrokerClient.CreateCompetencyGroup(form).then(() => {
    //       Views.Toast.fire({
    //         icon: "success",
    //         title: "Yetkinlik Grubu Oluşturuldu"
    //       })
    //       navigate(Resources.GetAppUrl("competencyGroup/list"))
    //     })
    //   }
  
    //   const onCancel = () => {
    //     navigate(Resources.GetAppUrl("competencyGroup/list"))
    //   }
  
    //   useEffect(() => {
    //     PolivalansBrokerClient.GetCompetencyGrade().then((response) => {
    //       setCompetencyGrades(response);
    //       this.isLoading = false;
    //     })
    //   }, [])
  
      return (
        VStack({ alignment: cTop })(
          this.isLoading ? VStack(Spinner()) :
            // ReactView(
            //   <Form
            //     title="Yeni Yetkinlik Grubu Ekleyin"
            //     form={
            //       <form
            //         onSubmit={onSubmit}
            //         style={{
            //           display: "flex",
            //           flexDirection: "column",
            //           gap: "10px",
            //           width: "60%"
            //         }}>
            //         <TextField
            //           name="competency_group_name"
            //           label="Yetkinlik Grubu Adı"
            //           variant="outlined"
            //           fullWidth
            //           size="small"
            //           value={form.competency_group_name}
            //           onChange={handleChange}
            //           required
            //         />
            //         <FormControl fullWidth size="small" required>
            //           <InputLabel>Yetkinlik Düzeyi</InputLabel>
            //           <Select
            //             name="competency_grade_id"
            //             value={form.competency_grade_id}
            //             label="Yetkinlik Düzeyi"
            //             onChange={handleSelectGrade}
            //             size="small"
            //             required
            //           >
            //             {competencyGrades.map((grade) => (
            //               <MenuItem value={grade.competency_grade_id} key={grade.competency_grade_id}>{grade.competency_grade_name}</MenuItem>
            //             ))}
            //           </Select>
            //         </FormControl>
            //         <div style={{
            //           display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
            //         }}>
            //           <Button type="submit" variant="contained" color="primary" size="small">Kaydet</Button>
            //           <Button variant="contained" color="info" size="small" onClick={onCancel}>İptal</Button>
            //         </div>
            //       </form>
            //     }
            //   />
            // )
            Text("Hello World")
        ).padding("30px 20px")
      )
    }
  }
  