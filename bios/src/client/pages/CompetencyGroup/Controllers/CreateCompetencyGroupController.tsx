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
import { Autocomplete, Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import CompetencyGrade from '../../../../server/hooks/competencyGrade/main';
import { Toast } from '../../../components/Toast';
import CompetencyGroup from '../../../../server/hooks/competencyGroup/main';
import Form from '../Views/Form';
import ICompetencyGroup from '../../../interfaces/ICompetencyGroup';
import { useGetMe } from '@realmocean/sdk';

export class CreateCompetencyGroupController extends UIFormController {

  public LoadView(): UIView {

    const navigate = useNavigate();

    const { createDocument } = CompetencyGroup.CreateCompetencyGroup();
    const { me } = useGetMe("console");

    const { grades, isLoading } = CompetencyGrade.GetCompetencyGrades(me?.prefs?.organization);

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
                  <Autocomplete
                    value={grades.find((grade) => grade.competency_grade_id === form.competency_grade_id) || null}
                    onChange={(event, newValue) => {
                      setForm({
                        ...form,
                        competency_grade_id: newValue ? newValue.competency_grade_id : '',
                        competency_grade_name: newValue ? newValue.competency_grade_name : ''
                      });
                    }}
                    options={grades}
                    getOptionLabel={(option) => option.competency_grade_name}
                    isOptionEqualToValue={(option, value) => option.competency_grade_id === value.competency_grade_id}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Yetkinlik Düzeyi"
                        size="small"
                        required
                        fullWidth
                      />
                    )}
                    fullWidth
                    size="small"
                  />
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
