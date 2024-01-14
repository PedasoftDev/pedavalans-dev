import {
  cTop,
  nanoid,
  ReactView,
  Spinner,
  UIFormController,
  UIView,
  useNavigate,
  VStack,
} from '@tuval/forms';
import React, { useState } from 'react';
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import CompetencyGrade from '../../../../server/hooks/competencyGrade/main';
import { Toast } from '../../../components/Toast';
import CompetencyGroup from '../../../../server/hooks/competencyGroup/main';
import Form from '../Views/Form';
import ICompetencyGroup from '../../../interfaces/ICompetencyGroup';
import { useGetMe } from '@realmocean/sdk';

export class CreateCompetencyGroupController extends UIFormController {

  public LoadView(): UIView {

    const navigate = useNavigate();

    const { grades, isLoading } = CompetencyGrade.GetCompetencyGrades();
    const { createDocument } = CompetencyGroup.CreateCompetencyGroup();
    const { me } = useGetMe("console");

    const [form, setForm] = useState<ICompetencyGroup.ICrateCompetencyGroup>({
      competency_group_id: "",
      competency_group_name: "",
      competency_grade_id: "",
      competency_grade_name: "",
      tenant_id: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSelectGrade = (e: SelectChangeEvent<string>) => {
      setForm({
        ...form,
        [e.target.name]: e.target.value,
        competency_grade_name: grades.find((grade) => grade.competency_grade_id === e.target.value)?.competency_grade_name
      })
    }
    // realm_id ve tenant_id eklenecek
    const onSubmit = (e: any) => {
      e.preventDefault();
      Toast.fire({
        icon: "info",
        title: "Yetkinlik Grubu Oluşturuluyor"
      })
      const createId: string = nanoid();
      form.competency_group_id = createId;
      form.tenant_id = me?.prefs?.organization
      createDocument({
        documentId: createId,
        data: { ...form }
      }, () => {
        Toast.fire({
          icon: "success",
          title: "Yetkinlik Grubu Oluşturuldu"
        })
        navigate("/app/competency-group/list")
      })
    }

    return (
      VStack({ alignment: cTop })(
        isLoading ? VStack(Spinner()) :
          ReactView(
            <Form
              title="Yeni Yetkinlik Grubu Ekleyin"
              form={
                <form
                  onSubmit={onSubmit}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                    width: "60%"
                  }}>
                  <TextField
                    name="competency_group_name"
                    label="Yetkinlik Grubu Adı"
                    variant="outlined"
                    fullWidth
                    size="small"
                    value={form.competency_group_name}
                    onChange={handleChange}
                    required
                  />
                  <FormControl fullWidth size="small" required>
                    <InputLabel>Yetkinlik Düzeyi</InputLabel>
                    <Select
                      name="competency_grade_id"
                      value={form.competency_grade_id}
                      label="Yetkinlik Düzeyi"
                      onChange={handleSelectGrade}
                      size="small"
                      required
                    >
                      {grades.map((grade) => (
                        <MenuItem value={grade.competency_grade_id} key={grade.competency_grade_id}>{grade.competency_grade_name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <div style={{
                    display: "flex", gap: "10px", flexDirection: "column", marginTop: "10px"
                  }}>
                    <Button type="submit" variant="contained" color="primary" size="small">Kaydet</Button>
                    <Button variant="contained" color="info" size="small" onClick={() => navigate("/app/competency-group/list")}>İptal</Button>
                  </div>
                </form>
              }
            />
          )
      ).padding("30px 20px")
    )
  }
}
