import { ReactView, Spinner, UIFormController, UIView, UIViewBuilder, VStack, cTop, nanoid, useNavigate, useParams } from "@tuval/forms";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { useGetMe } from "@realmocean/sdk";
import Competency from "../../../../server/hooks/competency/main";
import { Resources } from "../../../assets/Resources";
import Form from "../../Competency/Views/Form";
import StyledDataGrid from "../../../components/StyledDataGrid";
import { GridColDef, trTR } from "@mui/x-data-grid";
import IEducation from "../../../interfaces/IEducation";
import Education from "../../../../server/hooks/education/main";
import EducationCompetencyRelation from "../../../../server/hooks/educationCompetencyRelation/main";
import { Toast } from "../../../components/Toast";
import IEducationCompetencyRelation from "../../../interfaces/IEducationCompetencyRelation";
import AppInfo from "../../../../AppInfo";
import Collections from "../../../../server/core/Collections";
import removeDollarProperties from "../../../assets/Functions/removeDollarProperties";

const resetForm: IEducation.IBase = {
  code: "",
  name: "",
  type: "",
  tenant_id: "",
  is_active: true,
  is_deleted: false,
};

export class UpdateEducationController extends UIFormController {

  public LoadView(): UIView {

    const navigate = useNavigate();
    const { id } = useParams();

    const { me, isLoading } = useGetMe("console")

    const { competencyList, isLoadingCompetencyList } = Competency.GetList(me?.prefs?.organization)
    const { updateEducation } = Education.Update()
    const { education, isLoading: isLoadingGetEducation } = Education.Get(id)
    const { educationCompetencyRelationList, isLoading: isLoadingEducationCompetencyRelationList } = EducationCompetencyRelation.ListByEducation(id)

    const { createEducationCompetencyRelation } = EducationCompetencyRelation.Create()
    const { updateEducationCompetencyRelation } = EducationCompetencyRelation.Update()
    const { educationList, isLoading: isLoadingEducation } = Education.GetList(me?.prefs?.organization)

    return (
      VStack({ alignment: cTop })(
        isLoading || isLoadingCompetencyList || isLoadingEducation || isLoadingGetEducation || isLoadingEducationCompetencyRelationList ? VStack(Spinner()) :
          UIViewBuilder(() => {

            const [form, setForm] = useState<IEducation.IBase>(resetForm);
            const [educationCompetencyRelation, setEducationCompetencyRelation] = useState<string[]>([]);

            const navigateToList = () => navigate("/app/education/list");

            const handleChangeText = (e: any) => {
              setForm({ ...form, [e.target.name]: e.target.value });
            };

            const handleChangeSelect = (event: SelectChangeEvent<any>) => {
              setForm({ ...form, [event.target.name]: event.target.value });
            };

            const handleSubmit = (e: React.FormEvent) => {
              e.preventDefault();


              if (educationList.some((education) => education.$id != form.$id && education.code === form.code)) {
                Toast.fire({
                  icon: "error",
                  title: "Bu eğitim katalog kodu zaten mevcut!"
                });
                return;
              }

              updateEducation({
                databaseId: AppInfo.Database,
                collectionId: Collections.Education,
                documentId: id,
                data: removeDollarProperties(form)
              }, () => {
                educationCompetencyRelationList.forEach((relation) => {
                  updateEducationCompetencyRelation({
                    databaseId: AppInfo.Database,
                    collectionId: Collections.EducationCompetencyRelation,
                    documentId: relation.$id,
                    data: {
                      is_deleted: true,
                      is_active: false
                    }
                  })
                })
                educationCompetencyRelation.forEach((competency_id, i) => {
                  const nanoId = nanoid();
                  createEducationCompetencyRelation({
                    documentId: nanoId,
                    data: {
                      education_id: id,
                      competency_id: competency_id,
                      competency_name: competencyList.find((c) => c.$id === competency_id)?.competency_name,
                      tenant_id: me?.prefs?.organization,
                    }
                  }, () => {
                    if (i === educationCompetencyRelation.length - 1) {
                      Toast.fire({
                        icon: "success",
                        title: "Eğitim başarıyla güncellendi!"
                      });
                      navigateToList();
                    }
                  })
                })
              })


            };

            const columns: GridColDef[] = [
              {
                field: "competency_name",
                headerName: "Yetkinlik Adı",
                flex: 1
              }
            ];

            useEffect(() => {
              setForm(education);
              setEducationCompetencyRelation(educationCompetencyRelationList.map((relation) => relation.competency_id))
            }, [])

            return (
              ReactView(
                <Form
                  title="Eğitimi Düzenle"
                  form={
                    <form
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px",
                        width: "60%",
                      }}
                      onSubmit={handleSubmit}
                    >
                      <TextField
                        size="small"
                        fullWidth
                        onChange={handleChangeText}
                        value={form.code}
                        name="code"
                        inputProps={{ maxLength: 50 }}
                        label="Eğitim Katalog Kodu"
                        required
                      />
                      <TextField
                        fullWidth
                        onChange={handleChangeText}
                        value={form.name}
                        name="name"
                        multiline={true}
                        rows={4}
                        label="Eğitim Tanımı"
                        required
                      />
                      <div style={{
                        height: "280px",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                      }}>
                        <Typography variant="button" sx={{ marginLeft: "10px" }}>İlişkili Yetkinlikler</Typography>
                        <StyledDataGrid
                          rows={competencyList}
                          columns={columns}
                          getRowId={(row) => row.$id}
                          localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                          isCellEditable={() => false}
                          disableRowSelectionOnClick
                          checkboxSelection
                          onRowSelectionModelChange={(newRowSelectionModel: any) => {
                            setEducationCompetencyRelation(newRowSelectionModel);
                          }}
                          rowSelectionModel={educationCompetencyRelation}
                          rowHeight={30}
                          columnHeaderHeight={30}
                        />
                      </div>
                      <FormControl fullWidth size="small" required>
                        <InputLabel>Eğitim Türü</InputLabel>
                        <Select
                          name="type"
                          value={form.type}
                          label="Eğitim Türü"
                          onChange={handleChangeSelect}
                          size="small"
                          required
                        >
                          {Resources.EducationTypes.map((education_type) => (
                            <MenuItem
                              value={education_type.id}
                              key={education_type.id}
                            >
                              {education_type.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          flexDirection: "column",
                          marginTop: "10px",
                        }}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          size="small"
                        >
                          Kaydet
                        </Button>
                        <Button
                          variant="contained"
                          color="info"
                          size="small"
                          onClick={navigateToList}
                        >
                          İptal
                        </Button>
                      </div>
                    </form>
                  }
                />
              )
            )
          })

      ).padding("30px 20px")
    )
  }
}